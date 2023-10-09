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
import { useParams } from 'react-router-dom';
import numeroALetras from 'convertir-numero-a-letras-mexico';
import CreateModalPreguntar from '../pregunta/pregunta'
import { Request } from 'utils/http'
import moment from 'moment';
import CreateProveedorCompra from './components/create-proveedor/create-proveedor-compra'
import AutocompleteAsync from 'components/AutocompleteAsync'
import { useAutocompleteProveedor } from './hooks/useAutocompleteProveedor'
import { useAutocompleteMetodoPago } from './hooks/useAutocompleteMetodoPago'
import { useNavigate } from "react-router-dom";
import OrdenProducto from './components/orden-productos/ordenProducto'
import { initialStateOrdenCompra } from './utils/initialState'
import { UseOrdenCompra } from './hooks/useOrdenCompra'
import { UseProveedor } from 'pages/proveedores/proveedores-list/hooks/useProveedor'

const CreateOrdenInicial = () => {
    const navigate = useNavigate();
    const [estado, setEstado] = useState({
        modificar: true,
        estadoId: 0,
        nombre: 'Editar orden compra'
    })
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const { t } = useTranslation();
    const [modalProcesar, setModalProcesar] = useState(false);
    const [modalRecibir, setModalRecibir] = useState(false);
    const [openModalProveedor, setOpenModalProveedor] = useState(false);
    const [modalPreguntar, setModalPreguntar] = useState(false);
    const [compraId, setcompraId] = useState(0)
    const [OrdenCompra, setOrderCompra] = useState(initialStateOrdenCompra)
    const [previewPago, setPreviewPago] = useState(initialStateOrdenCompra)
    //proveedores
    const { List } = UseProveedor()
    const {
        LoadListaProveedores,
        getOptionLabelProveedor,
        isOptionEqualToValueProveedor,
        listaProveedores,
        loadingAutoCompleteProveedores,
        openAutoCompleteProveedores,
        refresListaProveedores
    } = useAutocompleteProveedor('nombreProveedor',List);

    const {
        LoadListaMetodoPago,
        getOptionLabelMetodoPago,
        isOptionEqualToValueMetodoPago,
        listaMetodoPago,
        loadingAutoCompleteMetodoPago,
        openAutoCompleteMetodoPago,
        refresListaMetodoPago,
    } = useAutocompleteMetodoPago();

    const handleAddItem = () => {
        values.productos.push({
            productoId: 0,
            cantidad: 0,
            stock: 0,
            codigoProducto: '',
            nombreProducto: '',
            precioCompra: 0,
            precioTotal: 0,
        });
        setValues({ ...values })
    };

    const { Create, Store, Editar, Update, CreateAlmacen, StoreAlmacen, PreviewPago, ProcesarPago } = UseOrdenCompra();

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
            nombreAsiento: Yup.string().required('Metodo de pago es requerido'),
        }),
        usuario: Yup.object().shape({
            nombre: Yup.string(),
            apellido: Yup.string(),
            usuarioId: Yup.string()
        }),
        productos: Yup.array().of(
            Yup.object().shape({
                productoId: Yup.number(),
                cantidad: Yup.number().min(1, 'Debe ser mayor a 0').required('Cantidad es requerida'),
                stock: Yup.number(),
                codigoProducto: Yup.string().nullable(),
                nombreProducto: Yup.string().required('Nombre producto es requerido'),
                precioCompra: Yup.number().min(1, 'Debe ser mayor a 0').required('Precio compra es requerida'),
                precioTotal: Yup.number(),
            })
        )
    });

    const formProducto = useFormik({
        initialValues: OrdenCompra,
        validationSchema,
        //enableReinitialize: true,
        onSubmit: async (valores) => {
            console.log('ESTADO ACTUAL', valores)
            if (estado.modificar) {
                valores.fecha = moment().format('yyyy-MM-DD')
                await UpdateOrdenCompra(valores);
            }
            else {
                valores.fecha = moment().format('yyyy-MM-DD')
                await StoreOrdenCompra(valores)
            }
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

    const onPreviewPago = async (compraId) => {
        const { status, venta } = await PreviewPago(compraId)
        if (!!status) {
            console.log('View procesar pago', venta)
            setPreviewPago(venta)
        }
    }
    const onStorePreviewPago = async (compraId) => {
        const { status, resultado } = await ProcesarPago(compraId, moment())
        if (!!status) {
            setModalPreguntar(false);
        }
    }
    const StoreOrdenCompra = async (valores) => {
        const { store, status } = await Store(valores);
        if (!!status) {
            console.log(store);
            setcompraId(store)
            setModalPreguntar(true)
        }
        setLoading(false)
    }
    const UpdateOrdenCompra = async (valores) => {
        const { update, status } = await Update(valores);
        if (!!status) {
            console.log(update);
            setcompraId(update)
            setModalPreguntar(true)
        }
        setLoading(false)
    }
    const CreateOrdenCompra = async () => {
        const { data, status } = await Create();
        if (!!status) {
            console.log('DATA ENTRANTE', data)
            setValues({ ...data, nombreUsuario: data.usuario.nombre, fecha: moment(data.fecha).format('DD/MM/yyyy') });
        }
        setLoading(false)
    }

    const EditarOrdenCompra = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra/editar/${id}`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        if (!!status) {
            setEstado({ ...estado, estadoId: data.estadoId })
            setValues({
                ...data,
                fecha: moment(data.fecha).format("DD/MM/yyyy")
            });
        }
        setLoading(false)
    }
    const Iniciar = () => {
        if (id == 'create') {
            CreateOrdenCompra();
            setEstado({
                modificar: false,
                estadoId: 0,
                nombre: 'Crear orden compra'
            })
        }
        else {
            EditarOrdenCompra();
        }
    }
    useEffect(() => {
        Iniciar()
    }, [compraId, previewPago, estado.estado])

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
                                            disabled={estado.estadoId == 2 ? true : false}
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
                                                    setFieldValue('proveedor', initialStateOrdenCompra.proveedor);
                                                }
                                            }}
                                            defaultValue={
                                                () => {
                                                    return {
                                                        id: 0,
                                                        nit: values.proveedor.nit,
                                                        codigoProveedor: values.proveedor.codigoProveedor,
                                                        nombreProveedor: values.proveedor.nombreProveedor,
                                                        contacto: values.proveedor.contacto,
                                                        telefono: values.proveedor.telefono,
                                                    }
                                                }
                                            }
                                            disabled={estado.estadoId == 2 ? true : false}
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
                                            disabled={estado.estadoId == 2 ? true : false}
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
                                            disabled={estado.estadoId == 2 ? true : false}
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
                                            name={'asiento'}
                                            value={values.asiento}
                                            errors={Boolean(touched.asiento?.nombreAsiento && errors.asiento?.nombreAsiento)}
                                            helperText={touched.asiento?.nombreAsiento && errors.asiento?.nombreAsiento}
                                            onChange={(e, value) => {
                                                console.log(value)
                                                if (value != null) {
                                                    setFieldValue('asiento', value)
                                                } else {
                                                    setFieldValue('asiento', initialStateOrdenCompra.asiento)
                                                }
                                            }}
                                            defaultValue={() => {
                                                return {
                                                    asientoId: values.asiento.asientoId,
                                                    nombreAsiento: values.asiento.nombreAsiento,
                                                    nombreTipoAsiento: values.asiento.nombreAsiento,
                                                    tipoAsientoId: values.asiento.tipoAsientoId
                                                }
                                            }}
                                            disabled={estado.estadoId == 2 ? true : false}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <H6 mb={1}>Cree un producto</H6>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            endIcon={<Add />}
                                            onClick={() => { }}
                                            disabled={estado.estadoId == 2 ? true : false}
                                        >
                                            {t("Crea un producto")}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <H6 mb={1}>Cree un proveedor</H6>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            endIcon={<Add />}
                                            onClick={() => { setOpenModalProveedor(true); }}
                                            disabled={estado.estadoId == 2 ? true : false}

                                        >
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
                                                        disabled={estado.estadoId == 2 ? true : false}
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
                                                                                            },
                                                                                            error: Boolean(touched.productos?.[index]?.cantidad && errors.productos?.[index]?.cantidad),
                                                                                            helperText: touched.productos?.[index]?.cantidad && errors.productos?.[index]?.cantidad,
                                                                                            disabled: estado.estadoId == 2 ? true : false
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
                                                                                                },
                                                                                                error: Boolean(touched.productos?.[index]?.precioCompra && errors.productos?.[index]?.precioCompra),
                                                                                                helperText: touched.productos?.[index]?.precioCompra && errors.productos?.[index]?.precioCompra,
                                                                                                disabled: estado.estadoId == 2 ? true : false
                                                                                            }
                                                                                        }
                                                                                        dataProducto={
                                                                                            {
                                                                                                name: `productos[${index}]`,
                                                                                                value: values.productos[index],
                                                                                                label: "Selecione un producto",
                                                                                                handleChange: (e, value) => {
                                                                                                    console.log('selected producto', value)
                                                                                                    if (value != null) {
                                                                                                        setFieldValue(`productos[${index}]`, value)
                                                                                                    }
                                                                                                },
                                                                                                error: Boolean(touched.productos?.[index]?.nombreProducto && errors.productos?.[index]?.nombreProducto),
                                                                                                helperText: touched.productos?.[index]?.nombreProducto && errors.productos?.[index]?.nombreProducto,
                                                                                                defaultValues: {
                                                                                                    productoId: 0,
                                                                                                    cantidad: 0,
                                                                                                    stock: 0,
                                                                                                    codigoProducto: '',
                                                                                                    nombreProducto: 'demo',
                                                                                                    precioCompra: 0,
                                                                                                    precioTotal: 0,
                                                                                                },
                                                                                                disabled: estado.estadoId == 2 ? true : false
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
                                            <Grid item xs={12} sm={4}>
                                                <Button
                                                    fullWidth
                                                    variant="contained"
                                                    type='submit'
                                                    disabled={estado.estadoId == 2 ? true : false}
                                                >
                                                    {t("Guardar")}
                                                </Button>
                                            </Grid>
                                        </FlexBox>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Form>
                </FormikProvider>
                <CreateModalProcesar open={modalProcesar} data={previewPago} onSubmit={onStorePreviewPago} ></CreateModalProcesar>
                <CreateModalPreguntar onPago={() => { setModalPreguntar(true); setModalProcesar(true); onPreviewPago(compraId) }} open={modalPreguntar} />
                {/* <RecibirProducto data={previewPago} onClose={onCloseRecibir} open={modalRecibir} /> */}
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
