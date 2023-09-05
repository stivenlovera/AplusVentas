import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import { Form, FormikProvider, useFormik } from 'formik';
import React, { useEffect } from 'react'
import * as Yup from "yup";
import { useAutocompleteAlmacenes } from '../hooks/useAlmacenes';
import AutocompleteAsync from 'components/AutocompleteAsync';
import { initialAlmacen, initialDetalleAlmacen } from '../utils/almacen';

const FormDetalleSerie = ({ data, events }) => {
    const { processValueChange, applyChanges, cancelChanges } = events;
    const {
        almacenId,
        codigoAlmacen,
        detallealmacenid,
        estadoVendido,
        fecharegistro,
        nombreAlmacen,
        nombreProducto,
        ordenCompraProductoId,
        productoid,
        serie
    } = data;
    const {
        LoadListaAlmacenes,
        getOptionLabelAlmacenes,
        isOptionEqualToValueAlmacenes,
        listaAlmacenes,
        loadingAutoCompleteAlmacenes,
        openAutoCompleteAlmacenes,
        refresListaAlmacenes
    } = useAutocompleteAlmacenes();
    const formDetalleAlmacen = useFormik({
        initialValues: initialDetalleAlmacen,
        validationSchema: Yup.object().shape({
            detallealmacenid: Yup.number(),
            serie: Yup.string().required('serie es requerida'),
            fecharegistro: Yup.string(),
            estadoVendido: Yup.number(),
            almacen: Yup.object().shape({
                id: Yup.number().required('almacen es requerida'),
                codigoAlmacen: Yup.string().required(),
                dirrecion: Yup.string(),
                nombreAlmacen: Yup.string().required('almacen es requerida'),
            })
        }),
        onSubmit: async (values) => {
            applyChanges(values)
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
    } = formDetalleAlmacen;
    useEffect(() => {
        setValues({
            detallealmacenid: detallealmacenid,
            serie: serie,
            fecharegistro: fecharegistro,
            estadoVendido: estadoVendido,
            almacen: {
                id: almacenId,
                codigoAlmacen: codigoAlmacen,
                dirrecion: '',
                nombreAlmacen: nombreAlmacen
            }
        })
    }, [])

    return (
        <Box pt={2} pb={1}>
            <Paper>
                <FormikProvider value={formDetalleAlmacen}>
                    <Form onSubmit={(e) => { console.log(values); console.log(errors); handleSubmit(e) }}>
                        <Grid container spacing={2} sx={{ p: 2 }}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                    <Select
                                        size='small'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.estadoVendido}
                                        name='estadoVendido'
                                        label="Estado"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={0}>Pendiente</MenuItem>
                                        <MenuItem value={1}>Disponible</MenuItem>
                                        <MenuItem value={2}>Vendido</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <AutocompleteAsync
                                    options={listaAlmacenes}
                                    loading={loadingAutoCompleteAlmacenes}
                                    open={openAutoCompleteAlmacenes}
                                    onOpen={LoadListaAlmacenes}
                                    onClose={refresListaAlmacenes}
                                    getOptionLabel={getOptionLabelAlmacenes}
                                    isOptionEqualToValue={isOptionEqualToValueAlmacenes}
                                    name={'almacenId'}
                                    label={'Almacen'}
                                    value={values.almacen}
                                    onChange={(e, value) => {
                                        if (value != null) {
                                            setFieldValue('almacen', value)
                                        } else {
                                            setFieldValue('almacen', initialAlmacen)
                                        }
                                    }}
                                    helperText={touched.almacen?.nombreAlmacen && errors.almacen?.nombreAlmacen}
                                    errors={touched.almacen?.nombreAlmacen && errors.almacen?.nombreAlmacen}
                                    /* defaultValue={{
                                        codigoAlmacen: values.codigoAlmacen,
                                        dirrecion: 'dd',
                                        nombreAlmacen: values.nombreAlmacen,
                                        id: values.almacenId
                                    }} */
                                    disabled={false}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    size='small'
                                    name="serie"
                                    label="Serie"
                                    value={values.serie}
                                    helperText={touched.serie && errors.serie}
                                    errors={touched.serie && errors.serie}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2} justifyContent="flex-end">
                                    <Grid item>
                                        <Button
                                            size='small'
                                            variant='contained'
                                            onClick={cancelChanges}
                                            color="error"
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            size='small'
                                            variant='contained'
                                            type={'submit'}
                                            color="primary"
                                        >
                                            Anotar
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                </FormikProvider>

            </Paper>
        </Box >
    )
}

export default FormDetalleSerie
