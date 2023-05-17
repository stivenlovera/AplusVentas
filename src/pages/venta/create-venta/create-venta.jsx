import { Autocomplete, Box, Button, Card, Grid, IconButton, Table, TableBody, TableHead, TableRow, TextField } from '@mui/material'
import IconWrapper from 'components/IconWrapper'
import Scrollbar from 'components/ScrollBar'
import { H5, H6 } from 'components/Typography'
import FlexBox from 'components/flexbox/FlexBox'
import AppTextField from 'components/input-fields/AppTextField'
import { useFormik } from "formik";
import * as Yup from "yup"; // component props interface
import Add from 'icons/Add'
import ShoppingBasket from 'icons/ShoppingBasket'
import { BodyTableCell, HeadTableCell } from 'page-sections/accounts/account/common/StyledComponents'
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Delete from 'icons/Delete'
import { useParams } from 'react-router-dom';
import numeroALetras from 'convertir-numero-a-letras-mexico';
import { UseCreateVenta } from './hooks/UseCreateVenta'
import { UseStoreVenta } from './hooks/UseStoreVenta'
import ModalPreguntarPagoVenta from './components/pregunta-pago-venta/preguntar-pago-venta'
import { UsePreviewPagoVenta } from './hooks/UsePreviewPagoVenta'
import ProcesarPagoVentaModal from './components/ProcesarPagoModal/ProcesarPagoModal'

const CreateVenta = () => {
    const [actualizarTable, setActualizarTableContext] = useState(false);

    const { id } = useParams();
    const { t } = useTranslation();
    const [items, setItems] = useState([]);
    const [selectAsiento, setSelectAsiento] = useState(null);
    const [modalProcesar, setModalProcesar] = useState(false);
    const [modalRecibir, setModalRecibir] = useState(false);
    const [buttonProcesar, setButtonProcesar] = useState(true);

    const [ventaId, setVentaId] = useState(0)

    const [modalPreguntar, setModalPreguntar] = useState(false)
    const handleAddItem = () => {
        items.push({
            id: 0,
            codigoProducto: 0,
            nombreProducto: '',
            precioUnitario: 0,
            precioTotal: 0

        });
        setItems([...items]);
        values.productos = items;
    };
    const handleDeleteItem = id => {
        setItems(items => items.filter(item => item.id !== id));
    };

    const onCalculoTotal = () => {
        let resultado = 0;
        items.map((item) => {
            resultado += item.precioTotal;
        })
        setFieldValue('total', resultado)
        setFieldValue('montoliteral', numeroALetras(resultado));
        console.log(resultado, numeroALetras(resultado))
    }

    const validationSchema = Yup.object().shape({
        id: Yup.number().required(),
        fecha: Yup.string().required(),
        descripcion: Yup.string().required('Descripcion es requerida'),
        codigoVenta: Yup.string().required('Codigo es requerido'),
        VClienteId: Yup.number().required('Selecione un proveedor'),
        montoliteral: Yup.string().nullable(),
        total: Yup.number().required(),
        asientoId: Yup.number().required('Selecione forma pago'),
        usuario: Yup.string().required(),
        nit: Yup.string().required('Nit es requerido!'),
        nombreAsiento: Yup.string().required(),
        telefono: Yup.string().nullable(),
        productos: Yup.array()
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
        setValues
    } = useFormik({
        initialValues: {
            id: 0,
            descripcion: '',
            fecha: 0,
            codigoVenta: '',
            VClienteId: '',
            montoliteral: '',
            total: 0,
            telefono: '',
            asientoId: '',
            usuario: '',
            nit: '',
            productos: []
        },
        validationSchema,
        //enableReinitialize: true,
        onSubmit: async (values) => {
            if (id == 'create') {
                let ventaId = await ApiStore();
                if (ventaId > 0) {
                    console.log(ventaId)
                    setVentaId(ventaId);
                    await ApiPreviewPago(ventaId)
                    setActualizarTableContext(true)
                    setButtonProcesar(false);
                    setModalPreguntar(true);
                }
            }
        }
    });

    const { ApiCrearVenta, asientos, create, clientes, productos } = UseCreateVenta();
    const { ApiStore } = UseStoreVenta(values)

    const { ApiPreviewPago, previewPago } = UsePreviewPagoVenta(ventaId)

    const load = async () => {

        await ApiCrearVenta();
        setValues(create);
        console.log('ejecuacion exitosa', create)
    }

    useEffect(() => {
        console.log(values.codigoVenta)
        if (values.codigoVenta == '') {
            load()
        }
        setActualizarTableContext(false);

    }, [values, ventaId, actualizarTable])

    /*handler procesar */
    const handlerButtonProcesar = () => {
        if (id == 'true') {

        }
    }

    const onOpenRecibir = () => {
        setModalRecibir(true)
    }
    const onCloseRecibir = () => {
        setModalRecibir(false)
    }
    return (
        <Box pt={2} pb={4}>
            <form onSubmit={(e) => {
                console.log(errors)
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
                                <Autocomplete
                                    fullWidth
                                    getOptionLabel={(options) => options.nombreCompletoCliente}
                                    //defaultValue={optionPlanCuenta[0]}
                                    options={clientes}
                                    size="small"
                                    onChange={(event, newValue) => {
                                        if (newValue != null) {
                                            console.log(newValue)
                                            setFieldValue('VClienteId', newValue.id)
                                            setItems([...items]);
                                        } else {
                                            setItems([...items]);
                                        }
                                    }}
                                    renderInput={
                                        (params) => <TextField
                                            {...params}
                                            label="Selecione un cliente"
                                            error={Boolean(touched.VProveedoreId && errors.VProveedoreId)}
                                            helperText={touched.VProveedoreId && errors.VProveedoreId}
                                        />
                                    }
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
                                <Autocomplete
                                    fullWidth
                                    getOptionLabel={(options) => options.nombreAsiento}
                                    //defaultValue={optionPlanCuenta[0]}
                                    options={asientos}
                                    //autoSelect={true}
                                    //inputValue={inputValue}
                                    value={selectAsiento}
                                    size="small"
                                    isOptionEqualToValue={(option, value) => {
                                        if (value) {
                                            return (option.value === value.value)
                                        } else {
                                            return false;
                                        }
                                    }}
                                    onChange={(event, newValue) => {
                                        if (newValue != null) {
                                            setSelectAsiento(newValue);
                                            setValues({
                                                ...values,
                                                asientoId: newValue.id,
                                                nombreAsiento: newValue.nombreAsiento
                                            });
                                        } else {
                                            setItems([...items]);
                                        }
                                    }}

                                    renderInput={
                                        (params) => <TextField
                                            {...params}
                                            label="Selecione Metodo pago"
                                            error={Boolean(touched.asientoId && errors.asientoId)}
                                            helperText={touched.asientoId && errors.asientoId}
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xxs={12} sm={6}>
                                <H6 mb={1}>Cree un cliente</H6>
                                <Button variant="contained" endIcon={<Add />} onClick={() => { }}>
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

                                                <TableBody>
                                                    {items.map((item, i) => <TableRow key={i}>
                                                        <BodyTableCell>
                                                            <AppTextField
                                                                fullWidth
                                                                size="small"
                                                                name="codigoProducto"
                                                                label="Codigo"
                                                                value={items[i].codigoProducto}
                                                            />
                                                        </BodyTableCell>

                                                        <BodyTableCell>
                                                            <Autocomplete
                                                                fullWidth
                                                                getOptionLabel={(options) => options.nombreProducto}
                                                                options={productos}
                                                                value={items[i] ? items[i] : null}
                                                                size="small"
                                                                isOptionEqualToValue={(option, value) => {
                                                                    if (value) {
                                                                        return (option.value === value.value)
                                                                    } else {
                                                                        return false;
                                                                    }
                                                                }}
                                                                onChange={(event, newValue) => {
                                                                    if (newValue != null) {
                                                                        console.log(newValue)
                                                                        items[i].codigoProducto = newValue.codigoProducto;
                                                                        items[i].precioUnitario = newValue.precioVentaMax;
                                                                        items[i].id = newValue.id;
                                                                        items[i].nombreProducto = newValue.nombreProducto;
                                                                        setItems([...items]);
                                                                        console.log(items)
                                                                    } else {

                                                                    }
                                                                }}
                                                                renderInput={
                                                                    (params) => <TextField
                                                                        {...params}
                                                                        label="Selecione producto"
                                                                    />
                                                                }
                                                            />
                                                        </BodyTableCell>
                                                        <BodyTableCell>
                                                            <AppTextField
                                                                fullWidth
                                                                size="small"
                                                                id="cantidad"
                                                                name="cantidad"
                                                                value={items[i].cantidad}
                                                                label="Cantidad"
                                                                onChange={(e) => {
                                                                    console.log('on change', e.target.value);
                                                                    items[i].cantidad = (e.target.value);
                                                                    items[i].precioTotal = parseInt(items[i].cantidad == '' ? 0 : items[i].cantidad) * parseFloat(items[i].precioUnitario);
                                                                    setItems([...items]);
                                                                    onCalculoTotal()
                                                                }}
                                                                type={'number'}
                                                            />
                                                        </BodyTableCell>
                                                        <BodyTableCell>
                                                            <AppTextField
                                                                fullWidth
                                                                size="small"
                                                                id="precioUnitario"
                                                                name="precioUnitario"
                                                                label="Precio unitario"
                                                                value={items[i].precioUnitario}
                                                                onChange={(e) => {
                                                                    console.log('on change', e.target.value);
                                                                    items[i].precioUnitario = (e.target.value);
                                                                    items[i].precioTotal = parseInt(items[i].cantidad == '' ? 0 : items[i].cantidad) * parseFloat(items[i].precioUnitario == '' ? 0 : items[i].precioUnitario);
                                                                    setItems([...items]);
                                                                    onCalculoTotal()
                                                                }}
                                                                type={'number'}
                                                            />
                                                        </BodyTableCell>
                                                        <BodyTableCell>
                                                            <AppTextField
                                                                fullWidth
                                                                size="small"
                                                                name="precioTotal"
                                                                label="Precio total"
                                                                onBlur={() => { }}
                                                                value={items[i].precioTotal}
                                                            />
                                                        </BodyTableCell>
                                                        <BodyTableCell>
                                                            <IconButton onClick={() => handleDeleteItem(item.id)}>
                                                                <Delete sx={{
                                                                    color: "text.disabled"
                                                                }} />
                                                            </IconButton>
                                                        </BodyTableCell>
                                                    </TableRow>)}
                                                </TableBody>
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
                                    color='success'
                                    endIcon={<Add />}
                                    disabled={buttonProcesar}
                                    onClick={() => { setModalProcesar(true) }}
                                >
                                    {t("Procesar pago")}
                                </Button>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <Button
                                    variant="contained"
                                    endIcon={<Add />}
                                    onClick={onOpenRecibir}
                                >
                                    {t("Recibir")}
                                </Button>
                            </Grid>
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
            </form>
            <ProcesarPagoVentaModal open={modalProcesar} data={previewPago} ></ProcesarPagoVentaModal>
            <ModalPreguntarPagoVenta onPago={() => { setModalProcesar(true); setModalPreguntar(false) }} open={modalPreguntar} />
            {/* <RecibirProducto data={previewPago} onClose={onCloseRecibir} open={modalRecibir} /> */}
        </Box>
    )
}

export default CreateVenta
