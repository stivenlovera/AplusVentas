import { Box, Button, Card, Grid, Stack, styled, Table, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AppModal from "components/AppModal";
import AppAvatar from "components/avatars/AppAvatar";
import FlexBox from "components/flexbox/FlexBox";
import Scrollbar from "components/ScrollBar";
import { H2, H5, H6, Span, Tiny } from "components/Typography";
import Clear from "icons/Clear";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // styled components
import ResumenCarrito from "./resumen-carrito";
import ImagenNoDisponible from '../../../assets/no-dispnible.jpg'
import IncrementDecrement from "./increment-decrement";
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 700,
    minWidth: 300,
    outline: "none",
    padding: "1.5rem"
}));
const HeadTableCell = styled(TableCell)(() => ({
    padding: "10px 16px",
    fontSize: 12,
    "&:first-of-type": {
        paddingLeft: 24
    },
    "&:last-of-type": {
        paddingRight: 24
    }
}));
const BodyTableCell = styled(HeadTableCell)(() => ({
    padding: "24px 16px",
    "&:nth-child(1)": {
        minWidth: 300
    }
}));

const ModalCarritoLista = ({
    openModalCarritoCompra,
    stock,
    onSaveCompra,
    carritoProductos,
    onCloseModalCarritoCompra,
    onIncrement,
    onDecrement,
    onDelete
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));

    function total() {
        let total = 0;
        carritoProductos.map((carritoProductos) => {
            total = carritoProductos.precioVentaMax + total;
        })
        return total;
    }
    return <StyledAppModal
        open={openModalCarritoCompra}
        handleClose={onCloseModalCarritoCompra}
    >
        <H2 >
            Carrito compra
        </H2>
        <Scrollbar style={{
            maxHeight: downXl ? 500 : "auto"
        }}>
            <Box >
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <Card>
                            <H5 padding={2}>
                                Cantidad {' '}
                                <Span color="text.disabled" fontSize={12} fontWeight={500}>
                                    ({carritoProductos.length} item)
                                </Span>
                            </H5>

                            <Scrollbar autoHide={false}>
                                <Table sx={{
                                    minWidth: 500
                                }}>
                                    <TableHead sx={{
                                        backgroundColor: "action.hover"
                                    }}>
                                        <TableRow>
                                            <HeadTableCell>Producto</HeadTableCell>
                                            <HeadTableCell>Cantidad</HeadTableCell>
                                            <HeadTableCell>Precio Unitario</HeadTableCell>
                                            <HeadTableCell>Acciones</HeadTableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {carritoProductos.map((producto, i) => {
                                            const validateImagen = producto.imagenes.length > 0 ? `${process.env.REACT_APP_IMAGENES_PRODUCTOS}/${producto.imagenes}` : ImagenNoDisponible;
                                            return (<TableRow key={i}>
                                                <BodyTableCell>
                                                    <FlexBox gap={1.5} alignItems="center">
                                                        <AppAvatar
                                                            src={validateImagen}
                                                            sx={{
                                                                width: 65,
                                                                height: 65,
                                                                borderRadius: "10%"
                                                            }}
                                                        />
                                                        <Stack spacing={0.3}>
                                                            <H6>{producto.productoMaestroNombre}</H6>
                                                            <Tiny fontWeight={500}>
                                                                Modelo: <Span color="text.primary">{producto.nombreProducto} </Span>
                                                            </Tiny>
                                                            {/* <Tiny fontWeight={500}>
                                                                Size: <Span color="text.primary">09</Span>
                                                            </Tiny> */}
                                                        </Stack>
                                                    </FlexBox>
                                                </BodyTableCell>
                                                <BodyTableCell>
                                                    <IncrementDecrement
                                                        cantidad={producto.cantidad}
                                                        onDecrement={() => { onDecrement(producto) }}
                                                        onIncrement={() => { onIncrement(producto, producto.stockActual) }}
                                                        stock={producto.stockActual}
                                                    />
                                                </BodyTableCell>
                                                <BodyTableCell>{producto.precioVentaMax} Bs </BodyTableCell>
                                                <BodyTableCell>
                                                    <IconButton onClick={() => { onDelete(producto) }}>
                                                        <Clear sx={{
                                                            color: "text.disabled"
                                                        }} />
                                                    </IconButton>
                                                </BodyTableCell>
                                            </TableRow>)
                                        })}
                                    </TableBody>
                                </Table>
                            </Scrollbar>
                        </Card>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <ResumenCarrito
                            showCoupon
                            buttonText="Comprar ahora"
                            handleClick={() => { onSaveCompra(carritoProductos) }}
                            carritoProductos={carritoProductos}
                            total={total()}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Scrollbar>

    </StyledAppModal>;

};

export default ModalCarritoLista;