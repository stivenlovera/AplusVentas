import { Autocomplete, Backdrop, Box, Button, Card, CircularProgress, Grid, IconButton, Table, TableBody, TableHead, TableRow, TextField } from '@mui/material'
import IconWrapper from 'components/IconWrapper'
import Scrollbar from 'components/ScrollBar'
import { H5, H6 } from 'components/Typography'
import FlexBox from 'components/flexbox/FlexBox'
import AppTextField from 'components/input-fields/AppTextField'
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup"; // component props interface
import Add from 'icons/Add'
import ShoppingBasket from 'icons/ShoppingBasket'
import { BodyTableCell, HeadTableCell } from 'page-sections/accounts/account/common/StyledComponents'
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CreateModalProcesar from '../procesar/procesar'
import Delete from 'icons/Delete'
import { UseCreateOrdenCompra } from './hooks/useCreateOrdenCompra'
import { useParams } from 'react-router-dom';
import { UseStoreOrdenCompra } from './hooks/useStoreOrderCompra'
import numeroALetras from 'convertir-numero-a-letras-mexico';
import { UsePreviewOrdenCompraPago } from '../procesar/hooks/usePreviewPago'
import RecibirProducto from '../recibir/recibir-producto'
import CreateModalPreguntar from '../pregunta/pregunta'
import { Request } from 'utils/http'
import moment from 'moment';
import CreateProveedorCompra from './components/create-proveedor/create-proveedor-compra'
import AutocompleteAsync from 'components/AutocompleteAsync'
import { useAutocompleteProveedor } from './hooks/useAutocompleteProveedor'
import { useAutocompleteMetodoPago } from './hooks/useAutocompleteMetodoPago'
import { useNavigate } from "react-router-dom";
import OrdenProducto from './components/orden-productos/ordenProducto'
import { initialStateProveedor } from './utils/initialState'

const CreateOrdenInicial = () => {
    const navigate = useNavigate();

    const [estado, setEstado] = useState({
        modificar: true,
        nombre: 'Editar orden compra'
    })
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const { t } = useTranslation();
    const [items, setItems] = useState([]);
    const [selectAsiento, setSelectAsiento] = useState(null);
    const [modalProcesar, setModalProcesar] = useState(false);
    const [modalRecibir, setModalRecibir] = useState(false);
    const [openModalProveedor, setOpenModalProveedor] = useState(false);
    const [modalPreguntar, setModalPreguntar] = useState(false);

    //proveedores
    const {
        LoadListaProveedores,
        getOptionLabelProveedor,
        isOptionEqualToValueProveedor,
        listaProveedores,
        loadingAutoCompleteProveedores,
        openAutoCompleteProveedores,
        refresListaProveedores
    } = useAutocompleteProveedor();

    const {
        LoadListaMetodoPago,
        getOptionLabelMetodoPago,
        isOptionEqualToValueMetodoPago,
        listaMetodoPago,
        loadingAutoCompleteMetodoPago,
        openAutoCompleteMetodoPago,
        refresListaMetodoPago,
    } = useAutocompleteMetodoPago();

    const [OrdenCompra, setOrderCompra] = useState(initialStateProveedor)

    const handleAddItem = () => {
        console.log(values)
        values.productos.push({
            productoId: 0,
            cantidad: 0,
            codigoProducto: '',
            nombreProducto: '',
            precioCompra: 0,
            precioTotal: 0,
        });
        setValues({ ...values })
    };
    const handleDeleteItem = (i) => {
        console.log(i)
        values.productos.splice(i, 1);
        console.log(values)
        setValues({ ...values })
    };

    const onCalculoTotal = (total, i) => {
        let resultado = 0;
        values.productos.map((item, index) => {
            if (index != i) {
                resultado += item.precioTotal;
            }
        })
        resultado += total;
        setFieldValue('total', resultado)
        setFieldValue('montoliteral', numeroALetras(resultado));
    }

    const onCantidad = (e, i) => {
        setFieldValue(`productos[${i}].cantidad`, e.target.value);
        const nuevo = parseInt(e.target.value == '' ? 0 : e.target.value) * parseFloat(values.productos[i].precioCompra);
        setFieldValue(`productos[${i}].precioTotal`, nuevo);
        onCalculoTotal(nuevo, i)
    }
    const onprecioCompra = (e, i) => {
        setFieldValue(`productos[${i}].precioCompra`, e.target.value);
        const nuevo = parseInt(e.target.value == '' ? 0 : e.target.value) * parseFloat(values.productos[i].cantidad);
        console.log(nuevo)
        setFieldValue(`productos[${i}].precioTotal`, nuevo);
        onCalculoTotal(nuevo, i)
    }
    const validationSchema = Yup.object().shape({
        id: Yup.number(),
        fecha: Yup.string().required(),
        descripcion: Yup.string().required('Descripcion es requerida'),
        codigoOrden: Yup.string().required('Codigo es requerido'),
        nombreUsuario: Yup.string(),
        nit: Yup.string().required('Nit es requerido'),
        telefono: Yup.string().required('Telefono es requerido'),
        proveedor: Yup.object().shape({
            id: Yup.number().min(1, 'Descripcion es requerida').required('Descripcion es requerida'),
            nit: Yup.string().nullable(),
            codigoProveedor: Yup.string().nullable(),
            nombreProveedor: Yup.string().required('Seleccione un proveedor'),
            contacto: Yup.string().nullable(),
            telefono: Yup.string().nullable()
        }),
        montoliteral: Yup.string().nullable(),
        stockActual: Yup.number(),
        estadoId: Yup.number(),
        total: Yup.number().required(),
        asiento: Yup.object().shape({
            tipoAsientoId: Yup.number(),
            asientoId: Yup.string(),
            nombreTipoAsiento: Yup.string().nullable(),
            nombreAsiento: Yup.string().nullable()
        }),
        usuario: Yup.object().shape({
            nombre: Yup.string(),
            apellido: Yup.string(),
            usuarioId: Yup.string()
        }),
        productos: Yup.array().of(
            Yup.object().shape({
                productoId: Yup.number(),
                cantidad: Yup.number(),
                stock: Yup.number(),
                codigoProducto: Yup.string().nullable(),
                nombreProducto: Yup.string().nullable(),
                precioCompra: Yup.number(),
                precioTotal: Yup.number(),
            })
        )
    });

    const formProducto = useFormik({
        initialValues: OrdenCompra,
        validationSchema,
        //enableReinitialize: true,
        onSubmit: async (valores) => {
            valores.fecha = moment().format('yyyy-MM-DD')
            StoreOrdenCompra(valores)
        }
    });

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        touched,
        isValid,
        setFieldValue,
        resetForm,
        setValues,
        onSubmit
    } = formProducto;

    const { ApiPreviewPago, previewPago } = UsePreviewOrdenCompraPago(1)

    const StoreOrdenCompra = async (valores) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra`,
            initialValues: [],
            method: 'post',
            showError: true,
            showSuccess: true,
            values: valores
        });
        console.log(status)
        if (!!status) {
            ApiPreviewPago(data)
            setModalPreguntar(true)
            //navigate('/dashboard/orden-compra-list')
        }
        setLoading(false)
    }
    const CreateOrdenCompra = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra/create`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        if (!!status) {
            console.log('DATA ENTRANTE', data)
            setValues({ ...data, nombreUsuario: data.usuario.nombre });
        }
        setLoading(false)
    }


    const EditarOrdenCompra = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra/editar/${id}`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: true
        });
        if (!!status) {
            const { asientos, proveedores, productos, ordenCompra } = data
            setValues({
                ...ordenCompra,
                nombreProveedor: 'demo provedor',
                codigoOrden: ordenCompra.codigoOrden,
                usuario: ordenCompra.usuario,
                fecha: moment().format('DD/MM/yyy')
            });
        }
        setLoading(false)
    }
    const Iniciar = () => {
        if (id == 'create') {
            CreateOrdenCompra();
            setEstado({
                modificar: false,
                nombre: 'Crear orden compra'
            })
        }
        else {
            EditarOrdenCompra()
        }
    }
    useEffect(() => {
        Iniciar()
    }, [])

    /*handler procesar */
    const onOpenRecibir = () => {
        setModalRecibir(true)
    }
    const onCloseRecibir = () => {
        setModalRecibir(false)
    }
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box pt={2} pb={4}>
                <FormikProvider value={formProducto}>
                    <Form onSubmit={(e) => { console.log(values); console.log(errors); handleSubmit(e) }}>
                        <HeadingWrapper justifyContent="space-between" alignItems="center">
                            <FlexBox gap={0.5} alignItems="center">
                                <IconWrapper>
                                    <ShoppingBasket sx={{
                                        color: "primary.main"
                                    }} />
                                </IconWrapper>
                                <H5>{estado.nombre}</H5>
                            </FlexBox>
                        </HeadingWrapper>
                        <Grid item md={8} xs={12}>
                            <Card sx={{
                                padding: 3
                            }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={3}>
                                        <H6 mb={1}>Codigo orden compra</H6>
                                        <AppTextField
                                            fullWidth
                                            size="small"
                                            name="codigoOrden"
                                            placeholder="Orden compra"
                                            value={values.codigoOrden}
                                            onChange={handleChange}
                                            error={Boolean(touched.codigoOrden && errors.codigoOrden)}
                                            helperText={touched.codigoOrden && errors.codigoOrden}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <H6 mb={1}>Fecha </H6>
                                        <AppTextField
                                            fullWidth
                                            size="small"
                                            name="fecha"
                                            placeholder="Fecha"
                                            value={values.fecha}
                                            onChange={handleChange}
                                            error={Boolean(touched.fecha && errors.fecha)}
                                            helperText={touched.fecha && errors.fecha}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>

                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <H6 mb={1}>Usuario</H6>
                                        <AppTextField
                                            fullWidth
                                            size="small"
                                            name="nombreUsuario"
                                            placeholder="Usuario"
                                            value={values.nombreUsuario}
                                            onChange={handleChange}
                                            error={Boolean(touched.nombreUsuario && errors.nombreUsuario)}
                                            helperText={touched.nombreUsuario && errors.nombreUsuario}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <H6 mb={1}>Descripcion</H6>
                                        <AppTextField
                                            fullWidth
                                            size="small"
                                            name="descripcion"
                                            placeholder="Descripcion"
                                            value={values.descripcion}
                                            onChange={handleChange}
                                            error={Boolean(touched.descripcion && errors.descripcion)}
                                            helperText={touched.descripcion && errors.descripcion}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <H6 mb={1}>Proveedor</H6>
                                        <AutocompleteAsync
                                            label={'Selecione un proveedor'}
                                            options={listaProveedores}
                                            loading={loadingAutoCompleteProveedores}
                                            open={openAutoCompleteProveedores}
                                            onOpen={LoadListaProveedores}
                                            onClose={refresListaProveedores}
                                            isOptionEqualToValue={isOptionEqualToValueProveedor}
                                            getOptionLabel={getOptionLabelProveedor}
                                            handleChange={handleChange}
                                            name={'values.proveedor.id'}
                                            value={values.proveedor}
                                            errors={Boolean(touched.proveedor?.nombreProveedor && errors.proveedor?.nombreProveedor)}
                                            helperText={touched.proveedor?.nombreProveedor && errors.proveedor?.nombreProveedor}
                                            onChange={(e, value) => {
                                                if (value != null) {
                                                    setFieldValue('proveedor', value);
                                                    console.log(value)
                                                    setFieldValue('telefono', value.telefono);
                                                    setFieldValue('nit', value.nit)
                                                } else {
                                                    setFieldValue('telefono', '');
                                                    setFieldValue('nit', '')
                                                    setFieldValue('proveedor', initialStateProveedor.proveedor);
                                                }
                                            }}
                                            defaultValue={() => {
                                                return {
                                                    id: values.proveedor.id,
                                                    nit: values.proveedor.nit,
                                                    codigoProveedor: values.proveedor.codigoProveedor,
                                                    nombreProveedor: values.proveedor.nombreProveedor,
                                                    contacto: values.proveedor.contacto,
                                                    telefono: values.proveedor.telefono,
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <H6 mb={1}>Nit CI</H6>
                                        <AppTextField
                                            fullWidth
                                            size="small"
                                            name="nit"
                                            placeholder="Nit CI"
                                            value={values.nit}
                                            onChange={handleChange}
                                            error={Boolean(touched.nit && errors.nit)}
                                            helperText={touched.nit && errors.nit}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <H6 mb={1}>Telefono</H6>
                                        <AppTextField
                                            fullWidth
                                            size="small"
                                            name="telefono"
                                            placeholder="Telefono"
                                            value={values.telefono}
                                            onChange={handleChange}
                                            error={Boolean(touched.telefono && errors.telefono)}
                                            helperText={touched.telefono && errors.telefono}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <H6 mb={1}>Metodo Pago</H6>
                                        <AutocompleteAsync
                                            label={'Selecione Metodo de pago'}
                                            options={listaMetodoPago}
                                            loading={loadingAutoCompleteMetodoPago}
                                            open={openAutoCompleteMetodoPago}
                                            onOpen={LoadListaMetodoPago}
                                            onClose={refresListaMetodoPago}
                                            isOptionEqualToValue={isOptionEqualToValueMetodoPago}
                                            getOptionLabel={getOptionLabelMetodoPago}
                                            handleChange={handleChange}
                                            name={'asientoId'}
                                            value={values.asientoId}
                                            onChange={(e, value) => {
                                                if (value != null) {
                                                    setFieldValue('asiento', value)
                                                } else {
                                                    setFieldValue('asiento', initialStateProveedor.asiento)
                                                }
                                            }}
                                            defaultValue={() => {
                                                return {
                                                    asientoId: values.asiento.asientoId,
                                                    nombreAsiento: values.asiento.nombreAsiento
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <H6 mb={1}>Cree un producto</H6>
                                        <Button fullWidth variant="contained" endIcon={<Add />} onClick={() => { }}>
                                            {t("Crea un producto")}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <H6 mb={1}>Cree un proveedor</H6>
                                        <Button fullWidth variant="contained" endIcon={<Add />} onClick={() => { setOpenModalProveedor(true); }}>
                                            {t("Crea un proveedor")}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>

                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Box pt={2} pb={4}>
                            <Grid item md={8} xs={12}>
                                <Card sx={{
                                    padding: 3
                                }}>
                                    <H5>Lista de Productos </H5>
                                    <Grid container spacing={3}>
                                        <Grid item sm={12} xs={12}>
                                            <Box my={3}>
                                                <Scrollbar autoHide={false}>
                                                    <Button
                                                        variant="contained"
                                                        endIcon={<Add />}
                                                        color='success'
                                                        onClick={handleAddItem}
                                                    >
                                                        {t("Añadir item")}
                                                    </Button>
                                                    <Table sx={{
                                                        minWidth: 700
                                                    }}>
                                                        <TableHead>
                                                            <TableRow>
                                                                <HeadTableCell width={150}>Codigo producto</HeadTableCell>
                                                                <HeadTableCell width={350}>Nombre producto</HeadTableCell>
                                                                <HeadTableCell>Stock</HeadTableCell>
                                                                <HeadTableCell>Cantidad</HeadTableCell>
                                                                <HeadTableCell>precio compra</HeadTableCell>
                                                                <HeadTableCell>Precio total</HeadTableCell>
                                                                <HeadTableCell>Acciones</HeadTableCell>
                                                            </TableRow>
                                                        </TableHead>

                                                        <FieldArray name="productos" render={(arrayProducto) => {
                                                            return (
                                                                <TableBody >
                                                                    {
                                                                        values.productos && values.productos.length > 0 ? (
                                                                            values.productos.map((producto, index) => {
                                                                                return (
                                                                                    <OrdenProducto key={index}
                                                                                        dataAcction={{
                                                                                            delete: () => {
                                                                                                arrayProducto.remove(index)
                                                                                            }
                                                                                        }}
                                                                                        dataCantidad={{
                                                                                            name: `productos[${index}].cantidad`,
                                                                                            value: values.productos[index].cantidad,
                                                                                            label: "Cantidad",
                                                                                            handleChange: (e) => {
                                                                                                onCantidad(e, index);
                                                                                            }

                                                                                        }}
                                                                                        dataCodigoProducto={
                                                                                            {
                                                                                                name: `productos[${index}].codigoProducto`,
                                                                                                value: values.productos[index].codigoProducto,
                                                                                                label: "codigoProducto"
                                                                                            }
                                                                                        }
                                                                                        dataPrecioCompra={
                                                                                            {
                                                                                                name: `productos[${index}].precioCompra`,
                                                                                                value: values.productos[index].precioCompra,
                                                                                                label: "Precio compra",
                                                                                                handleChange: (e) => {
                                                                                                    onprecioCompra(e, index);
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        dataProducto={
                                                                                            {
                                                                                                name: `productos[${index}].productoId`,
                                                                                                value: values.productos[index].productoId,
                                                                                                label: "Selecione un producto",
                                                                                                handleChange: (e, value) => {
                                                                                                    if (value != null) {
                                                                                                        console.log(value)
                                                                                                        setFieldValue(`productos[${index}].productoId`, value.productoId)
                                                                                                        setFieldValue(`productos[${index}].codigoProducto`, value.codigoProducto)
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        dataStock={
                                                                                            {
                                                                                                name: `productos[${index}].stock`,
                                                                                                value: values.productos[index].stock,
                                                                                                label: "Stock"
                                                                                            }
                                                                                        }
                                                                                        dataPrecioTotal={
                                                                                            {
                                                                                                name: `productos[${index}].precioTotal`,
                                                                                                value: values.productos[index].precioTotal,
                                                                                                label: "Precio total",
                                                                                            }
                                                                                        }
                                                                                    />
                                                                                )
                                                                            })) : null
                                                                    }
                                                                </TableBody >
                                                            )
                                                        }} />
                                                    </Table>
                                                </Scrollbar>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>

                                        </Grid>
                                        <Grid item xs={12} sm={3}>

                                        </Grid>
                                        <Grid item xs={12} sm={3}>

                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <H6 mb={1}>Total</H6>
                                            <AppTextField
                                                fullWidth size="small"
                                                placeholder="Total"
                                                name="total"
                                                value={values.total}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} style={{ m: 0, p: 0 }}>
                                            <H6 mb={1}>Precio total</H6>
                                            <AppTextField
                                                fullWidth size="small"
                                                name="montoliteral"
                                                placeholder="total literal"
                                                value={values.montoliteral}
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Box>
                        <Grid item md={8} xs={12}>
                            <Card sx={{
                                padding: 3
                            }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <FlexBox justifyContent="flex-start" gap={2} marginTop={2}>
                                            {/*   <Button
                                                variant="contained"
                                                color='success'
                                                fullWidth
                                                endIcon={<Add />}
                                                disabled={buttonProcesar}
                                                onClick={() => { setModalProcesar(true) }}
                                            >
                                                {t("Procesar pago")}
                                            </Button> */}
                                            {/* <Button
                                                fullWidth
                                                variant="contained"
                                                endIcon={<Add />}
                                                onClick={onOpenRecibir}
                                                disabled
                                            >
                                                {t("Recibir")}
                                            </Button> */}
                                            <Button
                                                variant="contained"
                                                /*  endIcon={<Add />} */
                                                type='submit'
                                            >
                                                {t("Guardar")}
                                            </Button>
                                        </FlexBox>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Form>
                </FormikProvider>
                <CreateModalProcesar open={modalProcesar} data={previewPago} ></CreateModalProcesar>
                <CreateModalPreguntar onPago={() => { setModalPreguntar(true); setModalProcesar(true); }} open={modalPreguntar} />
                <RecibirProducto data={previewPago} onClose={onCloseRecibir} open={modalRecibir} />
                <CreateProveedorCompra
                    openModal={openModalProveedor}
                    onClose={() => { setOpenModalProveedor(false) }}
                    onSummit={() => { console.log('proveedor registrado') }}
                />
            </Box >
        </>
    )
}

export default CreateOrdenInicial
