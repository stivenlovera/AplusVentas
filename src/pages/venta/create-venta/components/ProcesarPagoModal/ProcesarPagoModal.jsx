import styled from '@emotion/styled';
import { Box, Button, Card, Divider, Grid, Stack, Table, TableBody, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import AppModal from 'components/AppModal';
import Scrollbar from 'components/ScrollBar';
import { H2, H3, H4, H5, H6, Small, Span, Tiny } from 'components/Typography';
import FlexBetween from 'components/flexbox/FlexBetween';
import FlexBox from 'components/flexbox/FlexBox';
import DownloadTo from 'icons/DownloadTo';
import { BodyTableCell, HeadTableCell } from 'page-sections/accounts/account/common/StyledComponents';
import React, { useState } from 'react';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { UseCotizacion } from '../../hooks/useCotizacion';
import { FormikProvider, useFormik, Form, FieldArray } from "formik";
import * as Yup from "yup"; // component props interface
import { initialSerieProductoVenta } from '../../utils/fakeVenta';

// styled components
const StyledSmall = styled(Small)(({
    theme,
    type
}) => ({
    fontSize: 12,
    color: "white",
    padding: "4px 10px",
    borderRadius: "4px",
    backgroundColor: type === "success" ? theme.palette.success.main : theme.palette.primary.main
}));
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 900,
    minWidth: 400,
    outline: "none",
    padding: "1.5rem"
}));
const ProcesarPagoVentaModal = ({
    open,
    data,
    onClose,
    onEnviar
}) => {
    const navigate = useNavigate();
    //manipular la data para preparar el formik para su validacion
    const prepare = () => {

    }

    const { ProcesarPago } = UseCotizacion();
    const handlerStoreProceso = async () => {
        const { resultado, status } = await ProcesarPago(data.id, moment().format('YYYY-MM-DD'));
        if (status) {
            navigate('/dashboard/venta');
            handlerClose()
        }
    }
    const handlerClose = async () => {
        navigate('/dashboard/venta');
        return onClose;
    }

    const validationSchema = Yup.object().shape({
        ventaId: Yup.number().required(),
        productos: Yup.array().of(
            Yup.object().shape({
                detalle_almacen_id: Yup.number(),
                serie: Yup.string().required('Registre o selecione un el producto'),
                venta_producto_id: Yup.number().required()
            })
        ).min(1, 'Debe haber almenos 1 producto')
    });

    const formSerializacion = useFormik({
        initialValues: initialSerieProductoVenta,
        validationSchema,
        //enableReinitialize: true,
        onSubmit: async (values) => {

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
    } = formSerializacion;

    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    return (
        <StyledAppModal open={open} handleClose={onClose} >
            <H2 marginBottom={2}>
                Detalle de venta
            </H2>
            <FormikProvider value={formSerializacion}>
                <Form onSubmit={(e) => {
                    console.log(values); console.log('errores', errors);
                    handleSubmit(e)
                }}>
                    <Scrollbar style={{
                        maxHeight: downXl ? 500 : "auto"
                    }}>
                        <Grid container spacing={2}>
                            <Grid container spacing={3} sx={{
                                padding: "2rem 1rem"
                            }}>
                                <Grid item md={12} xs={12}>
                                    <FlexBetween>
                                        <Box width={60}>
                                            <img src="/static/logo/logo.svg" height="36px" alt="" />
                                        </Box>
                                        <Stack textAlign="right">
                                            <H4>Codigo venta</H4>
                                            <H6 fontSize={12}> {data.codigoVenta}</H6>
                                        </Stack>
                                    </FlexBetween>
                                    <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                                        Fecha Registro: {" "}
                                        <Span sx={{
                                            color: "text.primary",
                                            fontSize: 15,
                                            fontWeight: 400
                                        }}>
                                            {moment(data.fechaCreacion).format('yyyy/MM/DD hh:mm:ss')}
                                        </Span>
                                    </Typography>
                                    <br />
                                    <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                                        Descripcion: {" "}
                                        <Span sx={{
                                            color: "text.primary",
                                            fontSize: 15,
                                            fontWeight: 400
                                        }}>
                                            {data.descripcion}
                                        </Span>
                                    </Typography>
                                    <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                                        Cliente: {" "}
                                        <Span sx={{
                                            color: "text.primary",
                                            fontSize: 15,
                                            fontWeight: 400
                                        }}>
                                            {data.vCliente.nombreCompletoCliente}
                                        </Span>
                                    </Typography>
                                    <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                                        NIT: {" "}
                                        <Span sx={{
                                            color: "text.primary",
                                            fontSize: 15,
                                            fontWeight: 400
                                        }}>
                                            {data.vCliente.numeroDocumento}
                                        </Span>
                                    </Typography>
                                    <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                                        Tipo pago: {" "}
                                        <Span sx={{
                                            color: "text.primary",
                                            fontSize: 15,
                                            fontWeight: 400
                                        }}>
                                            {data.asiento.nombreAsiento}
                                        </Span>
                                    </Typography>
                                    <Table sx={{
                                        mt: 3
                                    }}>
                                        <TableHead>
                                            <TableRow>
                                                <HeadTableCell>Producto</HeadTableCell>
                                                <HeadTableCell>Serie</HeadTableCell>
                                                <HeadTableCell>Precio</HeadTableCell>
                                                <HeadTableCell>Total</HeadTableCell>
                                            </TableRow>
                                        </TableHead>
                                        {
                                            data.productos.map((producto, i) => {
                                                let fake = []
                                                for (let index = 0; index < producto.cantidad; index++) {
                                                    fake.push(1)
                                                }
                                                return (
                                                    <TableBody key={i}>
                                                        {
                                                            fake.map((item, index) => {
                                                                return (
                                                                    <TableRow key={index}>
                                                                        <BodyTableCell>{producto.nombreProducto}</BodyTableCell>
                                                                        <BodyTableCell>{''} </BodyTableCell>
                                                                        <BodyTableCell>{producto.precioUnitario}</BodyTableCell>
                                                                        <BodyTableCell>{producto.precioTotal}</BodyTableCell>
                                                                    </TableRow>
                                                                )
                                                            })
                                                        }
                                                    </TableBody>
                                                )
                                            })
                                        }
                                    </Table>
                                    <Divider />
                                    <Stack mt={3} spacing={1} maxWidth={200} marginLeft="auto">
                                        <FlexBetween>
                                            <Tiny fontWeight={500}>Total:</Tiny>
                                            <H6 sx={{ pr: 12 }}>{data.total}</H6>
                                        </FlexBetween>
                                    </Stack>
                                    <Stack direction="row" justifyContent="flex-end" mt={4} spacing={2}>
                                        <Button variant="outlined" startIcon={<DownloadTo />}>
                                            PDF
                                        </Button>
                                        <Button variant="contained">Imprimir</Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Scrollbar>
                    <Grid container>
                        <Grid item xs={12}>
                            <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                                <Button fullWidth variant="outlined" onClick={handlerClose}>
                                    Cancelar
                                </Button>
                                <Button
                                    fullWidth
                                    type="button"
                                    variant="contained"
                                    onClick={handlerStoreProceso}
                                    disabled={data.estado.id == 2 ? true : false}
                                >
                                    {data.estado.id == 2 ? 'Venta ya fue registrada' : 'Registrar venta'}
                                </Button>
                            </FlexBox>
                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>
        </StyledAppModal >
    )
}

export default ProcesarPagoVentaModal;
