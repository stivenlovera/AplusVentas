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
import CreateModalProcesar from '../procesar/procesar'
import Delete from 'icons/Delete'
import { UseCreateOrdenCompra } from './hooks/useCreateOrdenCompra'
import { useParams } from 'react-router-dom';
import { UseStoreOrdenCompra } from './hooks/useStoreOrderCompra'
import numeroALetras from 'convertir-numero-a-letras-mexico';
import { UsePreviewOrdenCompraPago } from '../procesar/hooks/usePreviewPago'
import RecibirProducto from '../recibir/recibir-producto'
import CreateModalPreguntar from '../pregunta/pregunta'
import CreateProveedorModal from 'pages/proveedores/proveedores-list/components/create-proveedor'
import { Context } from "pages/proveedores/context/actualizarTabla";

const CreateOrdenInicial = () => {
    const [actualizarTable, setActualizarTableContext] = useState(false);

    const { id } = useParams();
    const { t } = useTranslation();
    const [items, setItems] = useState([]);
    const [selectAsiento, setSelectAsiento] = useState(null);
    const [modalProcesar, setModalProcesar] = useState(false);
    const [modalRecibir, setModalRecibir] = useState(false);
    const [buttonProcesar, setButtonProcesar] = useState(true);
    const [openModalProveedor, setOpenModalProveedor] = useState(false);
    const [ordenCompraId, setOrdenCompraId] = useState(0)

    const [modalPreguntar, setModalPreguntar] = useState(false)
    const handleAddItem = () => {
        items.push({
            id: 0,
            codigoProducto: 0,
            nombreProducto: '',
            precioCompra: 0,
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
        codigoOrden: Yup.string().required('Codigo es requerido'),
        VProveedoreId: Yup.number().required('Selecione un proveedor'),
        nombreProveedor: Yup.string().nullable(),
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
            codigoOrden: '',
            VProveedoreId: '',
            nombreProveedor: '',
            montoliteral: '',
            total: 0,
            telefono: '',
            asientoId: '',
            usuario: '',
            nit: '',
            nombreAsiento: '',
            productos: []
        },
        validationSchema,
        //enableReinitialize: true,
        onSubmit: async (values) => {
            if (id == 'create') {
                let id = await ApiGuardar()
                setOrdenCompraId(id);
                await ApiPreviewPago(id)

                setActualizarTableContext(true)
                console.log(ordenCompraId)
                setButtonProcesar(false);
                setModalPreguntar(true);
            }
            console.log('envio de datos')
            console.log(values)
        }
    });

    const { ApiCrearOrdenCompra, asientos, create, proveedores, productos } = UseCreateOrdenCompra();
    const { ApiGuardar } = UseStoreOrdenCompra(values)

    const { ApiPreviewPago, previewPago } = UsePreviewOrdenCompraPago(ordenCompraId)

    const loadOrdenCompra = async () => {
        await ApiCrearOrdenCompra();
        setValues(create);
    }

    useEffect(() => {
        if (values.codigoOrden == '') {
            loadOrdenCompra()
        }
        setActualizarTableContext(false);

    }, [values, ordenCompraId, actualizarTable])

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
        <Context.Provider value={[actualizarTable, setActualizarTableContext]}>
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
                            <H5>Lista orden compra</H5>
                        </FlexBox>

                        {/*  <Button variant="contained" endIcon={<Add />} onClick={() => { }}>
                    {t("Añadir producto")}
                </Button> */}

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
                                        name="usuario"
                                        placeholder="Usuario"
                                        value={values.usuario}
                                        onChange={handleChange}
                                        error={Boolean(touched.usuario && errors.usuario)}
                                        helperText={touched.usuario && errors.usuario}
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
                                    <Autocomplete
                                        fullWidth
                                        getOptionLabel={(options) => options.nombreProveedor}
                                        //defaultValue={optionPlanCuenta[0]}
                                        options={proveedores}
                                        //autoSelect={true}
                                        //inputValue={inputValue}
                                        //value={values.id}
                                        size="small"
                                        /*    isOptionEqualToValue={(option, value) => {
                                               if (value) {
                                                   return (option.value === value.value)
                                               } else {
                                                   return false;
                                               }
                                           }} */
                                        onChange={(event, newValue) => {
                                            if (newValue != null) {
                                                console.log(newValue)
                                                setFieldValue('VProveedoreId', newValue.id)
                                                setFieldValue('nombreProveedor', newValue.nombreProveedor)
                                                setItems([...items]);
                                                setFieldValue('descripcion', `${values.descripcion} ${newValue.contacto}`)
                                            } else {
                                                setItems([...items]);
                                            }
                                        }}

                                        renderInput={
                                            (params) => <TextField
                                                {...params}
                                                label="Selecione proveedor"
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
                                                label="Selecione proveedor"
                                                error={Boolean(touched.asientoId && errors.asientoId)}
                                                helperText={touched.asientoId && errors.asientoId}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <H6 mb={1}>Cree un producto</H6>
                                    <Button variant="contained" endIcon={<Add />} onClick={() => { }}>
                                        {t("Crea un producto")}
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <H6 mb={1}>Cree un proveedor</H6>
                                    <Button variant="contained" endIcon={<Add />} onClick={() => { setOpenModalProveedor(true); }}>
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

                                                    <TableBody>
                                                        {items.map((item, i) => <TableRow key={i}>
                                                            <BodyTableCell>
                                                                <AppTextField
                                                                    //onChange={e => handleUpdateItem(e, item.id)}
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
                                                                    //defaultValue={optionPlanCuenta[0]}
                                                                    options={productos}
                                                                    //autoSelect={true}
                                                                    //inputValue={inputValue}
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
                                                                            items[i].precioCompra = newValue.precioCompra;
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
                                                                        /*error={Boolean(touched.tipoAsientoId && errors.tipoAsientoId)}
                                                                        helperText={touched.tipoAsientoId && errors.tipoAsientoId} */
                                                                        />
                                                                    }
                                                                />
                                                            </BodyTableCell>
                                                            <BodyTableCell>
                                                                <AppTextField
                                                                    //onChange={e => handleUpdateItem(e, item.id)}
                                                                    fullWidth
                                                                    size="small"
                                                                    name="stock"
                                                                    label="Stock"
                                                                    value={items[i].stock}
                                                                />
                                                            </BodyTableCell>
                                                            <BodyTableCell>
                                                                <AppTextField
                                                                    //onChange={e => handleUpdateItem(e, item.id)}
                                                                    fullWidth
                                                                    size="small"
                                                                    id="cantidad"
                                                                    name="cantidad"
                                                                    value={items[i].cantidad}
                                                                    label="Cantidad"
                                                                    onChange={(e) => {
                                                                        console.log('on change', e.target.value);
                                                                        items[i].cantidad = (e.target.value);
                                                                        items[i].precioTotal = parseInt(items[i].cantidad == '' ? 0 : items[i].cantidad) * parseFloat(items[i].precioCompra);
                                                                        setItems([...items]);
                                                                        onCalculoTotal()
                                                                    }}
                                                                    type={'number'}
                                                                />
                                                            </BodyTableCell>
                                                            <BodyTableCell>
                                                                <AppTextField
                                                                    //onChange={e => handleUpdateItem(e, item.id)}
                                                                    fullWidth
                                                                    size="small"
                                                                    id="precioCompra"
                                                                    name="precioCompra"
                                                                    label="Precio compra"
                                                                    value={items[i].precioCompra}
                                                                    onChange={(e) => {
                                                                        console.log('on change', e.target.value);
                                                                        items[i].precioCompra = (e.target.value);
                                                                        items[i].precioTotal = parseInt(items[i].cantidad == '' ? 0 : items[i].cantidad) * parseFloat(items[i].precioCompra == '' ? 0 : items[i].precioCompra);
                                                                        setItems([...items]);
                                                                        onCalculoTotal()
                                                                    }}
                                                                    type={'number'}
                                                                />
                                                            </BodyTableCell>
                                                            <BodyTableCell>
                                                                <AppTextField
                                                                    //onChange={e => handleUpdateItem(e, item.id)}
                                                                    fullWidth
                                                                    size="small"
                                                                    name="precioTotal"
                                                                    label="Precio total"
                                                                    autoFocus
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
                                <Grid item xs={12} sm={4}>
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
                                <Grid item xs={12} sm={4}>
                                    <Button
                                        variant="contained"
                                        endIcon={<Add />}
                                        onClick={onOpenRecibir}
                                    >
                                        {t("Recibir")}
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={4}>
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
                <CreateModalProcesar open={modalProcesar} data={previewPago} ></CreateModalProcesar>
                <CreateModalPreguntar onPago={() => { setModalProcesar(true); setModalPreguntar(false) }} open={modalPreguntar} />
                <RecibirProducto data={previewPago} onClose={onCloseRecibir} open={modalRecibir} />
                <CreateProveedorModal open={openModalProveedor} onClose={() => setOpenModalProveedor(false)} tipo={'nuevo'} />
            </Box>
        </Context.Provider>
    )
}

export default CreateOrdenInicial
