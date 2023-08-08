import styled from '@emotion/styled';
import { Autocomplete, Box, Button, Card, Divider, Grid, Stack, Table, TableBody, TableHead, TableRow, TextField, Typography, useMediaQuery } from '@mui/material';
import AppModal from 'components/AppModal';
import Scrollbar from 'components/ScrollBar';
import { H2, H3, H5, H6, Small, Span, Tiny } from 'components/Typography';
import FlexBetween from 'components/flexbox/FlexBetween';
import FlexBox from 'components/flexbox/FlexBox';
import DownloadTo from 'icons/DownloadTo';
import { BodyTableCell, HeadTableCell } from 'page-sections/accounts/account/common/StyledComponents';
import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { useNavigate } from "react-router-dom";
import AppTextField from 'components/input-fields/AppTextField';
import { DatePicker } from '@mui/x-date-pickers';
import { UseOrdenCompra } from '../create-orden-inicial/hooks/useOrdenCompra';

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
  maxWidth: 1200,
  minWidth: 600,
  outline: "none",
  padding: "1.5rem"
}));
const RecibirProducto = ({
  open,
  data,
  almacenes,
  onClose,
}) => {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([])
  const { CreateAlmacen, StoreAlmacen } = UseOrdenCompra();
  const handlerStoreProceso = async () => {
    return onClose();
    //navigate('/dashboard/orden-compra-list')
  }

  const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
  useEffect(() => {
    let NuevoValores = [];
    data.productos.map(p => {
      NuevoValores.push({
        precioCompra: p.precioCompra,
        precioTotal: p.precioTotal,
        cantidad: p.cantidad,
        productoId: p.productoId,
        nombreProducto: p.nombreProducto,
        lote: '',
        fechaVencimiento: '',
        almacenId: 0
      })
    }
    );
    console.log(NuevoValores)
    setProductos(NuevoValores);
  }, [data])

  return (
    <StyledAppModal open={open} handleClose={onClose} >
      <H2 marginBottom={2}>
        Recibir Orden Compra
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
                    <H3>Orden compra</H3>
                    <H6 fontSize={12}> khjkhjk</H6>
                  </Stack>
                </FlexBetween>
                <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                  Fecha Registro: {" "}
                  <Span sx={{
                    color: "text.primary",
                    fontSize: 15,
                    fontWeight: 400
                  }}>
                    hjkhjk
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
                    {'sdasdasd '}
                  </Span>
                </Typography>
                <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                  Proveedor: {" "}
                  <Span sx={{
                    color: "text.primary",
                    fontSize: 15,
                    fontWeight: 400
                  }}>
                    jhkhjkhj
                  </Span>
                </Typography>
                <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                  NIT: {" "}
                  <Span sx={{
                    color: "text.primary",
                    fontSize: 15,
                    fontWeight: 400
                  }}>
                    DSDASDASD
                  </Span>
                </Typography>
                <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                  Tipo pago: {" "}
                  <Span sx={{
                    color: "text.primary",
                    fontSize: 15,
                    fontWeight: 400
                  }}>
                    jhkhjkh
                  </Span>
                </Typography>
                <Table sx={{
                  mt: 3
                }}>
                  <TableHead>
                    <TableRow>
                      <HeadTableCell>Producto</HeadTableCell>
                      <HeadTableCell>Fecha vencimiento</HeadTableCell>
                      <HeadTableCell width={300}>Almacen</HeadTableCell>
                      <HeadTableCell width={150}>Lote</HeadTableCell>
                      <HeadTableCell>Cantidad</HeadTableCell>
                      <HeadTableCell>Precio compra</HeadTableCell>
                      <HeadTableCell>Total</HeadTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {productos.map((producto, i) => {
                      return (
                        <TableRow key={i}>
                          <BodyTableCell>{producto.nombreProducto}</BodyTableCell>
                          <BodyTableCell>
                            <DatePicker
                              fullWidth
                              label="Fecha vencimiento"
                              inputFormat="yyyy-MM-dd"
                              value={producto.fechaVencimiento}
                              onChange={(e) => {

                                productos[i].fechaVencimiento = moment(e).format('YYYY-MM-DD');
                                setProductos([...productos])
                              }}
                              renderInput={params =>
                                <AppTextField {...params}
                                  fullWidth name="Fecha vencimiento"
                                  size="small"
                                //onBlur={handleBlur}
                                /* error={Boolean(errors.birthday && touched.birthday)}
                                helperText={String(touched.birthday && errors.birthday)} */
                                />} />
                          </BodyTableCell>
                          <BodyTableCell>
                            <Autocomplete
                              fullWidth
                              getOptionLabel={(options) => options.nombreAlmacen}
                              options={almacenes}
                              size="small"
                              onChange={(event, newValue) => {
                                if (newValue != null) {
                                  productos[i].almacenId = newValue.id;
                                  setProductos([...productos])
                                } else {

                                }
                              }}
                              renderInput={
                                (params) => <TextField
                                  {...params}
                                  label="Selecione almacen"
                                />
                              }
                            />
                          </BodyTableCell>
                          <BodyTableCell>
                            <AppTextField
                              fullWidth
                              size="small"
                              name="lote"
                              placeholder="Lote"
                              //value={producto.lote}
                              onChange={(e) => {
                                productos[i].lote = e.target.value;
                                setProductos([...productos])
                              }}
                            /*   error={Boolean(touched.productName && errors.productName)}
                              helperText={touched.productName && errors.productName} */
                            />
                          </BodyTableCell>
                          <BodyTableCell>{producto.cantidad}</BodyTableCell>
                          <BodyTableCell>{producto.precioCompra}</BodyTableCell>
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
                    <H6 sx={{ pr: 5 }}>sassssssss</H6>
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
              <Button fullWidth variant="outlined" onClick={onClose}>
                Cancelar
              </Button>
              <Button fullWidth type="button" variant="contained" onClick={handlerStoreProceso}>
                Recibir data
              </Button>
            </FlexBox>
          </Grid>
        </Grid>
      </form>
    </StyledAppModal >
  )
}

export default RecibirProducto;
