import { Autocomplete, Backdrop, Box, Button, Card, CircularProgress, Grid, IconButton, Table, TableBody, TableHead, TableRow, TextField } from '@mui/material'
import IconWrapper from 'components/IconWrapper'
import Scrollbar from 'components/ScrollBar'
import { H5, H6 } from 'components/Typography'
import FlexBox from 'components/flexbox/FlexBox'
import AppTextField from 'components/input-fields/AppTextField'
import { FormikProvider, useFormik, Form, FieldArray } from "formik";
import * as Yup from "yup"; // component props interface
import Add from 'icons/Add'
import ShoppingBasket from 'icons/ShoppingBasket'
import { BodyTableCell, HeadTableCell } from 'page-sections/accounts/account/common/StyledComponents'
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';
import numeroALetras from 'convertir-numero-a-letras-mexico';
import ModalPreguntarPagoVenta from './components/pregunta-pago-venta/preguntar-pago-venta'
import ProcesarPagoVentaModal from './components/ProcesarPagoModal/ProcesarPagoModal'
import CreateClienteVenta from './components/create-cliente/CreateClienteVenta'
import { useAutocompleteCliente } from './hooks/useAutocompleteCliente'
import AutocompleteAsync from 'components/AutocompleteAsync'
import { UseCotizacion } from './hooks/useCotizacion'
import { initialCotizacion } from './utils/fakeVenta'
import { initialStateCliente } from 'pages/clientes/clientes-list/components/cliente-fake'
import { useAutocompleteMetodoPagoVenta } from 'pages/orden-compra/create-orden-inicial/hooks/useAutocompleteMetodoPago'
import CotizacionProducto from './components/CotizacionProducto/cotizacion-producto'
import { useSnackbar } from "notistack";
import moment from 'moment';

const CreateVenta = () => {
    const [estado, setEstado] = useState({
        modificar: true,
        nombre: 'Editar cotizacion'
    })
    const [loading, setLoading] = useState(true)
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    const { t } = useTranslation();
    const [modalProcesar, setModalProcesar] = useState(false);
    const [opencliente, setOpencliente] = useState(false)
    const [ventaId, setVentaId] = useState(0)
    const [viewPreviewPago, setViewPreviewPago] = useState(initialCotizacion)

    const [modalPreguntar, setModalPreguntar] = useState(false)
    //clientes
    const { Create, Store, PreviewPago, ProcesarPago, Editar, Update } = UseCotizacion()
    //auto complete
    const {
        LoadListaCliente,
        getOptionLabelCliente,
        isOptionEqualToValueCliente,
        listaCliente,
        loadingAutoCompleteCliente,
        openAutoCompleteCliente,
        refreshListaCliente,
    } = useAutocompleteCliente();

    const {
        LoadListaMetodoPago,
        getOptionLabelMetodoPago,
        isOptionEqualToValueMetodoPago,
        listaMetodoPago,
        loadingAutoCompleteMetodoPago,
        openAutoCompleteMetodoPago,
        refresListaMetodoPago,
    } = useAutocompleteMetodoPagoVenta();

    const handleAddItem = () => {
        values.productos.push({
            productoId: 0,
            cantidad: 0,
            stock: 0,
            codigoProducto: '',
            nombreProducto: '',
            precioUnitario: 0,
            precioTotal: 0,
        });

        setValues({ ...values })
    };

    const validationSchema = Yup.object().shape({
        id: Yup.number().required(),
        fechaCreacion: Yup.string().required(),
        descripcion: Yup.string().required('Descripcion es requerida'),
        codigoVenta: Yup.string().required('Codigo es requerido'),
        vCliente: Yup.object().shape({
            id: Yup.number(),
            codigoCliente: Yup.string(),
            nombreCompletoCliente: Yup.string().required('Nombre cliente es requerido'),
            numeroDocumento: Yup.string(),
            dirrecion: Yup.string(),
            telefono: Yup.string(),
            correoElectronico: Yup.string(),
            codigoTipoDocumentoIdentidad: Yup.number(),
            complemento: Yup.string(),
            tipoDocumentoIdentidad: Yup.object().shape({
                id: Yup.number(),
                codigoClasificador: Yup.string(),
                codigoTipoParametro: Yup.string(),
                descripcion: Yup.string(),
            }),
        }),
        fechaCreacion: Yup.string().nullable(),
        montoliteral: Yup.string().nullable(),
        telefono: Yup.string().required('Telefono es requerido'),
        total: Yup.number().required(),
        asiento: Yup.object().shape({
            tipoAsientoId: Yup.number(),
            asientoId: Yup.string(),
            nombreTipoAsiento: Yup.string().nullable(),
            nombreAsiento: Yup.string().required('Tipo de pago requerido'),
        }),
        estado: Yup.object().shape({
            id: Yup.number().nullable(),
            nombreEstadoVenta: Yup.string().nullable(),
        }),
        usuario: Yup.string().required(),
        nit: Yup.string().required('Nit es requerido!'),
        productos: Yup.array().of(
            Yup.object().shape({
                productoId: Yup.number(),
                cantidad: Yup.number().min(1, 'Debe ser mayor a 0').required('Cantidad es requerida'),
                stock: Yup.number(),
                codigoProducto: Yup.string().nullable(),
                nombreProducto: Yup.string().required('Selecione producto'),
                precioUnitario: Yup.number().required('Precio unitario es requerido'),
                precioTotal: Yup.number(),
            })
        ).min(1, 'Debe haber almenos 1 producto')
    });

    const formCotizacion = useFormik({
        initialValues: initialCotizacion,
        validationSchema,
        //enableReinitialize: true,
        onSubmit: async (values) => {
            setLoading(true);
            if (id == 'create') {
                values.fechaCreacion = moment().format('yyyy-MM-DD');
                setValues(values)
                const { status, store } = await Store(values);
                if (status) {
                    setVentaId(store);
                    setModalPreguntar(true);
                }
            }
            setLoading(false);
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
    } = formCotizacion;
    //////////////////////////////
    const onCantidad = (e, i) => {
        setFieldValue(`productos[${i}].cantidad`, e.target.value);
        const nuevo = parseInt(e.target.value == '' ? 0 : e.target.value) * parseFloat(values.productos[i].precioUnitario);
        setFieldValue(`productos[${i}].precioTotal`, nuevo);
        onCalculoTotal(nuevo, i)
    }
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
    const Iniciar = async () => {
        if (id == 'create') {
            const { create, status } = await Create();
            setValues({ ...create, fechaCreacion: moment().format('DD/MM/yyyy') });
            setLoading(false)
            setEstado({
                modificar: false,
                nombre: 'Crear orden compra'
            })
        }
        else {
            console.log('COTIZACION EDITAR')
        }
    }
    useEffect(() => {
        Iniciar()
    }, [])

    //handler procesar  preview pago
    const onEmitirPago = async () => {
        setModalPreguntar(false)
        setLoading(true);
        const { venta, status } = await PreviewPago(ventaId);
        if (status) {
            setLoading(false);
            setViewPreviewPago(venta);
            setModalProcesar(true);
        }
        else {
            setModalPreguntar(false)
            setLoading(false);
        }
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
                <FormikProvider value={formCotizacion}>
                    <Form onSubmit={(e) => {
                        if (errors.productos) {
                            enqueueSnackbar('Debe haber almenos 1 producto', { variant: 'error' })
                        }
                        console.log(values); console.log('errores', errors);
                        handleSubmit(e)
                    }}>
                        <HeadingWrapper justifyContent="space-between" alignItems="center">
                            <FlexBox gap={0.5} alignItems="center">
                                <IconWrapper>
                                    <ShoppingBasket sx={{
                                        color: "primary.main"
                                    }} />
                                </IconWrapper>
                                <H5>Nueva cotizacion</H5>
                            </FlexBox>
                        </HeadingWrapper>
                        <Grid item md={8} xs={12}>
                            <Card sx={{
                                padding: 3
                            }}>
                                <Grid container spacing={3}>

                                    <Grid item xs={12} sm={3}>
                                        <H6 mb={1}>Codigo venta</H6>
                                        <AppTextField
                                            fullWidth
                                            size="small"
                                            name="codigoVenta"
                                            placeholder="Codigo venta"
                                            value={values.codigoVenta}
                                            onChange={handleChange}
                                            error={Boolean(touched.codigoVenta && errors.codigoVenta)}
                                            helperText={touched.codigoVenta && errors.codigoVenta}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <H6 mb={1}>Fecha </H6>
                                        <AppTextField
                                            fullWidth
                                            size="small"
                                            name="fechaCreacion"
                                            placeholder="Fecha"
                                            value={values.fechaCreacion}
                                            onChange={handleChange}
                                            error={Boolean(touched.fechaCreacion && errors.fechaCreacion)}
                                            helperText={touched.fechaCreacion && errors.fechaCreacion}
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
                                            name="usuario"
                                            placeholder="Usuario"
                                            value={values.usuario}
                                            onChange={handleChange}
                                            error={Boolean(touched.usuario && errors.usuario)}
                                            helperText={touched.usuario && errors.usuario}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} >
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
                                    <Grid item xs={12} sm={6} >
                                        <H6 mb={1}>Cliente</H6>
                                        <AutocompleteAsync
                                            label={'Selecione un un cliente'}
                                            options={listaCliente}
                                            loading={loadingAutoCompleteCliente}
                                            open={openAutoCompleteCliente}
                                            onOpen={LoadListaCliente}
                                            onClose={refreshListaCliente}
                                            isOptionEqualToValue={isOptionEqualToValueCliente}
                                            getOptionLabel={getOptionLabelCliente}
                                            handleChange={handleChange}
                                            name={'VClienteId'}
                                            value={values.vCliente}
                                            errors={Boolean(touched.vCliente?.nombreCompletoCliente && errors.vCliente?.nombreCompletoCliente)}
                                            helperText={touched.vCliente?.nombreCompletoCliente && errors.vCliente?.nombreCompletoCliente}
                                            onChange={(e, value) => {
                                                if (value != null) {
                                                    setFieldValue('vCliente', value)
                                                    setFieldValue('telefono', value.telefono);
                                                    setFieldValue('nit', value.numeroDocumento)

                                                } else {
                                                    setFieldValue('telefono', '');
                                                    setFieldValue('nit', '')
                                                    setFieldValue('vCliente', initialCotizacion.vCliente);
                                                }
                                            }}
                                            defaultValue={() => {
                                                return initialStateCliente;
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
                                            name={'asiento'}
                                            value={values.asiento}
                                            errors={Boolean(touched.asiento?.nombreAsiento && errors.asiento?.nombreAsiento)}
                                            helperText={touched.asiento?.nombreAsiento && errors.asiento?.nombreAsiento}
                                            onChange={(e, value) => {
                                                if (value != null) {
                                                    setFieldValue('asiento', value)
                                                } else {
                                                    setFieldValue('asiento', initialCotizacion.asiento)
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
                                    <Grid item xxs={12} sm={6}>
                                        <H6 mb={1}>Cree un cliente</H6>
                                        <Button
                                            variant="contained"
                                            endIcon={<Add />}
                                            onClick={() => setOpencliente(true)}
                                        >
                                            {t("Añadir un cliente")}
                                        </Button>
                                    </Grid>

                                </Grid>
                            </Card>
                        </Grid>
                        <Box pt={2} pb={4}>
                            <Grid item md={8} xs={12}>
                                <Card sx={{
                                    padding: 3
                                }}>
                                    <H5>Lista de items </H5>
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
                                                                <HeadTableCell>Cantidad</HeadTableCell>
                                                                <HeadTableCell>precio unitario</HeadTableCell>
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
                                                                                    <CotizacionProducto key={index}
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
                                                                                            helperText: touched.productos?.[index]?.cantidad && errors.productos?.[index]?.cantidad
                                                                                        }}
                                                                                        dataCodigoProducto={
                                                                                            {
                                                                                                name: `productos[${index}].codigoProducto`,
                                                                                                value: values.productos[index].codigoProducto,
                                                                                                label: "codigo Producto",
                                                                                                error: Boolean(touched.productos?.[index]?.codigoProducto && errors.productos?.[index]?.codigoProducto),
                                                                                                helperText: touched.productos?.[index]?.codigoProducto && errors.productos?.[index]?.codigoProducto,
                                                                                            }
                                                                                        }
                                                                                        dataprecioUnitario={
                                                                                            {
                                                                                                name: `productos[${index}].precioUnitario`,
                                                                                                value: values.productos[index].precioUnitario,
                                                                                                label: "Precio compra",
                                                                                                handleChange: (e) => {
                                                                                                    //onprecioUnitario(e, index);
                                                                                                },
                                                                                                error: Boolean(touched.productos?.[index]?.precioUnitario && errors.productos?.[index]?.precioUnitario),
                                                                                                helperText: touched.productos?.[index]?.precioUnitario && errors.productos?.[index]?.precioUnitario
                                                                                            }
                                                                                        }
                                                                                        dataProducto={
                                                                                            {
                                                                                                name: `productos[${index}]`,
                                                                                                value: values.productos[index],
                                                                                                label: "Selecione un producto",
                                                                                                helperText: touched.productos?.[index]?.nombreProducto && errors.productos?.[index]?.nombreProducto,
                                                                                                error: Boolean(touched.productos?.[index]?.nombreProducto && errors.productos?.[index]?.nombreProducto),
                                                                                                handleChange: (e, value) => {
                                                                                                    console.log(value)
                                                                                                    if (value != null) {
                                                                                                        setFieldValue(`productos[${index}].productoId`, value.productoId)
                                                                                                        setFieldValue(`productos[${index}].codigoProducto`, value.codigoProducto)
                                                                                                        setFieldValue(`productos[${index}].nombreProducto`, value.nombreProducto)
                                                                                                        setFieldValue(`productos[${index}].precioUnitario`, value.precioVentaMax)
                                                                                                        setFieldValue(`productos[${index}].stock`, 0)
                                                                                                    } else {
                                                                                                        setFieldValue(`productos[${index}].productoId`, 0)
                                                                                                        setFieldValue(`productos[${index}].cantidad`, 0)
                                                                                                        setFieldValue(`productos[${index}].codigoProducto`, '')
                                                                                                        setFieldValue(`productos[${index}].nombreProducto`, '')
                                                                                                        setFieldValue(`productos[${index}].precioUnitario`, '')
                                                                                                        setFieldValue(`productos[${index}].precioTotal`, 0)
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                        dataPrecioTotal={
                                                                                            {
                                                                                                name: `productos[${index}].precioTotal`,
                                                                                                value: values.productos[index].precioTotal,
                                                                                                label: "Precio total",
                                                                                                error: Boolean(touched.productos?.[index]?.precioTotal && errors.productos?.[index]?.precioTotal),
                                                                                                helperText: touched.productos?.[index]?.precioTotal && errors.productos?.[index]?.precioTotal
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
                                        <Grid item xs={3}>

                                        </Grid>
                                        <Grid item xs={3}>

                                        </Grid>
                                        <Grid item xs={3}>

                                        </Grid>
                                        <Grid item xs={3}>
                                            <H6 mb={1}>Total</H6>
                                            <AppTextField
                                                fullWidth size="small"
                                                placeholder="Total"
                                                name="total"
                                                value={values.total}
                                            />
                                        </Grid>
                                        <Grid item xs={12} style={{ m: 0, p: 0 }}>
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
                        <Grid item sm={12} xs={12}>
                            <Card sx={{
                                padding: 3
                            }}>
                                <Grid container spacing={3}>
                                    <Grid item sm={4} xs={12}>
                                        <Button
                                            variant="contained"
                                            endIcon={<Add />}
                                            type='submit'
                                        >
                                            {t("Guardar")}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Form>
                </FormikProvider>
                <ProcesarPagoVentaModal
                    open={modalProcesar}
                    data={viewPreviewPago}
                    onSubmit={(data) => { }}
                />
                <ModalPreguntarPagoVenta
                    onPago={() => { onEmitirPago() }}
                    data={ventaId}
                    open={modalPreguntar}
                />
                <CreateClienteVenta
                    openModal={opencliente}
                    onClose={() => { setOpencliente(false) }}
                    onSummit={(data) => { console.log(data) }}
                />
            </Box>
        </>
    )
}

export default CreateVenta
