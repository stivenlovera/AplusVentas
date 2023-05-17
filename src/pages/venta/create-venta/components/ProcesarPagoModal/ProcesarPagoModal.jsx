import styled from '@emotion/styled';
import { Box, Button, Card, Divider, Grid, Stack, Table, TableBody, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import AppModal from 'components/AppModal';
import Scrollbar from 'components/ScrollBar';
import { H2, H3, H5, H6, Small, Span, Tiny } from 'components/Typography';
import FlexBetween from 'components/flexbox/FlexBetween';
import FlexBox from 'components/flexbox/FlexBox';
import DownloadTo from 'icons/DownloadTo';
import { BodyTableCell, HeadTableCell } from 'page-sections/accounts/account/common/StyledComponents';
import React from 'react';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { UseStoreProcesoPagoVenta } from './hooks/useProcesarPagoVenta';

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
}) => {
    const navigate = useNavigate();
    const { ApiStoreProceso } = UseStoreProcesoPagoVenta(data.venta.id, moment().format('YYYY-MM-DD'));
    const handlerStoreProceso = async () => {
        await ApiStoreProceso();
        navigate('/dashboard/venta');
        return onClose;
    }
    const handlerClose = async () => {
        navigate('/dashboard/venta');
        return onClose;
    }
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    return (
        <StyledAppModal open={open} handleClose={onClose} >
            <H2 marginBottom={2}>
                Procesar pago
            </H2>
            <form onSubmit={(e) => { console.log(e) }}>
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
                                        <H3>Venta</H3>
                                        <H6 fontSize={12}> {data.venta.codigoOrden}</H6>
                                    </Stack>
                                </FlexBetween>
                                <Typography variant='body1' style={{fontWeight:'bold'}} color="text.secondary">
                                    Fecha Registro: {" "}
                                    <Span sx={{
                                        color: "text.primary",
                                        fontSize: 15,
                                        fontWeight: 400
                                    }}>
                                         {data.venta.fechaCreacion}
                                    </Span>
                                </Typography>
                                <br />
                                <Typography variant='body1' style={{fontWeight:'bold'}} color="text.secondary">
                                    Descripcion: {" "}
                                    <Span sx={{
                                        color: "text.primary",
                                        fontSize: 15,
                                        fontWeight: 400
                                    }}>
                                        {'sdasdasd '}
                                    </Span>
                                </Typography>
                                <Typography variant='body1' style={{fontWeight:'bold'}} color="text.secondary">
                                    Proveedor: {" "}
                                    <Span sx={{
                                        color: "text.primary",
                                        fontSize: 15,
                                        fontWeight: 400
                                    }}>
                                        {data.venta.vClienteId}
                                    </Span>
                                </Typography>
                                <Typography variant='body1' style={{fontWeight:'bold'}} color="text.secondary">
                                    NIT: {" "}
                                    <Span sx={{
                                        color: "text.primary",
                                        fontSize: 15,
                                        fontWeight: 400
                                    }}>
                                        {data.venta.nit}
                                    </Span>
                                </Typography>
                                <Typography variant='body1' style={{fontWeight:'bold'}} color="text.secondary">
                                    Tipo pago: {" "}
                                    <Span sx={{
                                        color: "text.primary",
                                        fontSize: 15,
                                        fontWeight: 400
                                    }}>
                                        {data.venta.asientoId}
                                    </Span>
                                </Typography>
                                <Table sx={{
                                    mt: 3
                                }}>
                                    <TableHead>
                                        <TableRow>
                                            <HeadTableCell>Producto</HeadTableCell>
                                            <HeadTableCell>Cantidad</HeadTableCell>
                                            <HeadTableCell>Precio</HeadTableCell>
                                            <HeadTableCell>Total</HeadTableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {data.productos.map((producto, i) => {
                                            return (
                                                <TableRow key={i}>
                                                    <BodyTableCell>{producto.nombreProducto}</BodyTableCell>
                                                    <BodyTableCell>{producto.cantidad}</BodyTableCell>
                                                    <BodyTableCell>{producto.precioUnitario}</BodyTableCell>
                                                    <BodyTableCell>{producto.precioTotal}</BodyTableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                                <Divider />
                                <Stack mt={3} spacing={1} maxWidth={200} marginLeft="auto">
                                    <FlexBetween>
                                        <Tiny fontWeight={500}>Total:</Tiny>
                                        <H6 sx={{ pr: 12 }}>{data.venta.total}</H6>
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
                            <Button fullWidth type="button" variant="contained" onClick={handlerStoreProceso}>
                                Registrar pago
                            </Button>
                        </FlexBox>
                    </Grid>
                </Grid>
            </form>
        </StyledAppModal >
    )
}

export default ProcesarPagoVentaModal;
