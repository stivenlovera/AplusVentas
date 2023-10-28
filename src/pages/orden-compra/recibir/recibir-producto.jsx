import styled from '@emotion/styled';
import { Autocomplete, Box, Button, Card, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableHead, TableRow, TextField, Typography, useMediaQuery } from '@mui/material';
import AppModal from 'components/AppModal';
import Scrollbar from 'components/ScrollBar';
import { H2, H3, H5, H6, Small, Span, Tiny } from 'components/Typography';
import FlexBetween from 'components/flexbox/FlexBetween';
import FlexBox from 'components/flexbox/FlexBox';
import DownloadTo from 'icons/DownloadTo';
import { HeadTableCell } from 'page-sections/accounts/account/common/StyledComponents';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { compraAlmacenProducto } from '../create-orden-inicial/utils/initialState';
import { FieldArray, Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup"; // component props interface
import RecibirProductoAlmacen from './components/recibir-producto-almacen';
import dayjs from 'dayjs';
// styled components
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
  onClose,
  onEnviar
}) => {
  const formAlmacenProducto = useFormik({
    initialValues: compraAlmacenProducto,
    validationSchema: Yup.object().shape({
      ordenCompraId: Yup.number(),
      codigoOrden: Yup.string(),
      productos: Yup.array().of(
        Yup.object().shape({
          productoId: Yup.number(),
          ordenCompraProductoId: Yup.number(),
          fechaVencimiento: Yup.string().required('Fecha vencimiento es requerido'),
          almacen: Yup.object().shape({
            codigoAlmacen: Yup.string(),
            dirrecion: Yup.string(),
            id: Yup.number(),
            nombreAlmacen: Yup.string()
          }),
          almacenId: Yup.string(),
          nombreAlmacen: Yup.string(),
          lote: Yup.string().required('Lote es requerido'),
          cantidad: Yup.number().min(1, 'Debe ser mayor a 0').required('Cantidad es requerida'),
          nombreProducto: Yup.string().required('Nombre producto es requerido'),
          precioCompra: Yup.number().min(1, 'Debe ser mayor a 0').required('Precio compra es requerida'),
          precioTotal: Yup.number(),
        })
      )
    }),
    onSubmit: async (valores) => {
      onEnviar(valores)
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
    setValues
  } = formAlmacenProducto;
  const downXl = useMediaQuery(theme => theme.breakpoints.down("md"));
  const now = dayjs()
  const [fecha, setFecha] = React.useState(dayjs());

  useEffect(() => {
    console.log(data)
    setValues({
      productos: data.productos,
      ordenCompraId: data.id,
      codigoOrden: data.codigoOrden
    })
  }, [data])

  return (
    <StyledAppModal open={open} handleClose={onClose} >
      <FormikProvider value={formAlmacenProducto}>
        <Form onSubmit={(e) => { console.log(values); console.log(errors); handleSubmit(e) }}>
          <H2 marginBottom={2}>
            Almacenar Compra
          </H2>
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
                      <H6 fontSize={12}> {data.codigoOrden} </H6>
                    </Stack>
                  </FlexBetween>
                  <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                    Fecha Registro: {" "}
                    <Span sx={{
                      color: "text.primary",
                      fontSize: 15,
                      fontWeight: 400
                    }}>
                      {moment(data.fecha).format('DD/MM/yyyy')}
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
                    Proveedor: {" "}
                    <Span sx={{
                      color: "text.primary",
                      fontSize: 15,
                      fontWeight: 400
                    }}>
                      {data.proveedor.nombreProveedor}
                    </Span>
                  </Typography>
                  <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                    NIT: {" "}
                    <Span sx={{
                      color: "text.primary",
                      fontSize: 15,
                      fontWeight: 400
                    }}>
                      {data.proveedor.nit}
                    </Span>
                  </Typography>
                  <Typography variant='body1' style={{ fontWeight: 'bold' }} color="text.secondary">
                    Tipo: {" "}
                    <Span sx={{
                      color: "text.primary",
                      fontSize: 15,
                      fontWeight: 400
                    }}>
                      {data.asiento.nombreAsiento}
                    </Span>
                  </Typography>
                  <Table sx={{
                    minWidth: 700
                  }}>
                    <TableHead>
                      <TableRow>
                        <HeadTableCell width={200}>Producto</HeadTableCell>
                        <HeadTableCell width={200}>Fecha vencimiento</HeadTableCell>
                        <HeadTableCell width={200}>Almacen</HeadTableCell>
                        <HeadTableCell width={150}>Lote</HeadTableCell>
                        <HeadTableCell>Cantidad</HeadTableCell>
                        <HeadTableCell>Precio compra</HeadTableCell>
                        <HeadTableCell>Total</HeadTableCell>
                      </TableRow>
                    </TableHead>

                    <FieldArray name="productos" render={(arrayProducto) => {
                      return (
                        <TableBody >
                          {
                            values.productos && values.productos.length > 0 ? (
                              values.productos.map((producto, index) => {

                                return (
                                  <RecibirProductoAlmacen
                                    key={index}
                                    dataProducto={
                                      {
                                        name: `productos[${index}].nombreProducto`,
                                        value: values.productos[index].nombreProducto,
                                        label: "Producto",
                                        disabled: data.estadoId == 2 ? true : false
                                      }
                                    }
                                    dataAlmacen={
                                      {
                                        name: `productos[${index}].almacen`,
                                        value: values.productos[index]?.almacen,
                                        label: "Selecione un almacen",
                                        handleChange: (e, value) => {
                                          console.log('selected almacen', value)
                                          if (value != null) {
                                            setFieldValue(`productos[${index}].almacen`, value)
                                            setFieldValue(`productos[${index}].almacenId`, value.almacenId)
                                            setFieldValue(`productos[${index}].nombreAlmacen`, value.nombreAlmacen)
                                          }
                                          else {
                                            setFieldValue(`productos[${index}].almacenId`, 0)
                                            setFieldValue(`productos[${index}].nombreAlmacen`, '')
                                          }
                                        },
                                        error: Boolean(touched.productos?.[index]?.nombreAlmacen && errors.productos?.[index]?.nombreAlmacen),
                                        helperText: touched.productos?.[index]?.nombreAlmacen && errors.productos?.[index]?.nombreAlmacen,
                                        defaultValues: {
                                          codigoAlmacen: '',
                                          dirrecion: '',
                                          id: 0,
                                          nombreAlmacen: ''
                                        },
                                        disabled: data.estadoId == 2 ? true : false
                                      }
                                    }
                                    dataLote={
                                      {
                                        name: `productos[${index}].lote`,
                                        value: `${values.codigoOrden}-${index + 1}`,
                                        label: "Lote",
                                        disabled: data.estadoId == 2 ? true : false
                                      }
                                    }
                                    dataFechaVencimiento={
                                      {
                                        name: `productos[${index}].fechaVencimiento`,
                                        value: fecha,
                                        label: "Fecha vencimiento",
                                        handleChange: (value) => {
                                          setFecha(value)
                                          setFieldValue('fechaVencimiento', dayjs(value).format('YYYY-MM-DD'))
                                        },
                                        disabled: data.estadoId == 2 ? true : false
                                      }
                                    }
                                    dataCantidad={
                                      {
                                        name: `productos[${index}].cantidad`,
                                        value: values.productos[index].cantidad,
                                        label: "Cantidad",
                                        disabled: data.estadoId == 2 ? true : false
                                      }
                                    }
                                    dataPrecioCompra={
                                      {
                                        name: `productos[${index}].precioCompra`,
                                        value: values.productos[index].precioCompra,
                                        label: "Precio compra",
                                        disabled: data.estadoId == 2 ? true : false
                                      }
                                    }
                                    dataPrecioTotal={
                                      {
                                        name: `productos[${index}].precioTotal`,
                                        value: values.productos[index].precioTotal,
                                        label: "Precio Total",
                                        disabled: data.estadoId == 2 ? true : false
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
                  <Divider />
                  <Stack mt={3} spacing={1} maxWidth={200} marginLeft="auto">
                    <FlexBetween>
                      <Tiny fontWeight={500}>Total:</Tiny>
                      <H6 sx={{ pr: 5 }}>
                        {data.total}
                      </H6>
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
                <Button fullWidth type="submit" variant="contained" disabled={data.estadoId == 2 ? true : false}>
                  Registrar
                </Button>
              </FlexBox>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </StyledAppModal >
  )
}

export default RecibirProducto;


{/* <BodyTableCell>
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
    />} />
</BodyTableCell> */}