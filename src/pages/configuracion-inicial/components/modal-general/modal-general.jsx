import { Button, Chip, Grid, IconButton, RadioGroup, styled, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { FormikProvider, useFormik, Form, FieldArray } from "formik";
import React, { useEffect, useState } from 'react'
import * as Yup from "yup"; // component props interface
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 700,
    minWidth: 300,
    outline: "none",
    padding: "1.5rem"
}));


const ModalGeneral = ({
    data,
    open,
    onClose,
    onSave
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));

    const formGeneral = useFormik({
        initialValues: data,
        validationSchema: Yup.object().shape({
            id: Yup.number(),
            nombreEmpresa: Yup.string().required("Nombre para la empresa es requerido!"),
            direccion: Yup.string().required("Direccion requerido!"),
            usuario_id: Yup.number(),
            nombrePropietario: Yup.string().required("Propietario es requerido!"),
            email: Yup.string().required("Email es requerido!"),
            telefono: Yup.string().required("Telefono es requerido!"),
            dominio: Yup.string().required("Dominio es requerido!"),
            facturacion: Yup.number(),
        }),
        onSubmit: async (values) => {
            onSave(values)
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
    } = formGeneral;
    useEffect(() => {
        console.log(data)
        setValues(data);
    }, [open])

    return (
        <StyledAppModal open={open} handleClose={onClose}>
            <H2 marginBottom={2}>
                {"Informacion General"}
            </H2>

            <FormikProvider value={formGeneral}>
                <Form onSubmit={(e) => {
                    console.log(values); console.log('errores', errors);
                    handleSubmit(e)
                }}>
                    <Scrollbar style={{
                        maxHeight: downXl ? 500 : "auto"
                    }}>
                        <Grid container spacing={2}>
                            <Grid item sm={6} xs={12}>
                                <H6 mb={1}>Nombre empresa (negocio o emprendimiento) </H6>
                                <AppTextField
                                    fullWidth
                                    size="small"
                                    name="nombreEmpresa"
                                    placeholder="Nombre empresa"
                                    value={values.nombreEmpresa}
                                    onChange={handleChange}
                                    error={Boolean(touched.nombreEmpresa && errors.nombreEmpresa)}
                                    helperText={touched.nombreEmpresa && errors.nombreEmpresa}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <H6 mb={1}>Propietario o representante</H6>
                                <AppTextField
                                    fullWidth
                                    size="small"
                                    name="nombrePropietario"
                                    placeholder="Propietario o representante"
                                    value={values.nombrePropietario}
                                    onChange={handleChange}
                                    error={Boolean(touched.nombrePropietario && errors.nombrePropietario)}
                                    helperText={touched.nombrePropietario && errors.nombrePropietario}
                                    disabled
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <H6 mb={1}>Direccion</H6>
                                <AppTextField
                                    fullWidth
                                    size="small"
                                    name="direccion"
                                    placeholder="Direccion"
                                    value={values.direccion}
                                    onChange={handleChange}
                                    error={Boolean(touched.direccion && errors.direccion)}
                                    helperText={touched.direccion && errors.direccion}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <H6 mb={1}>Telefono</H6>
                                <AppTextField
                                    fullWidth
                                    size="small"
                                    name="telefono"
                                    placeholder="Telefono"
                                    value={values.telefono}
                                    onChange={handleChange}
                                    type={'number'}
                                    error={Boolean(touched.telefono && errors.telefono)}
                                    helperText={touched.telefono && errors.telefono}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <H6 mb={1}>Email</H6>
                                <AppTextField
                                    size="small"
                                    fullWidth
                                    name="email"
                                    placeholder="Email"
                                    value={values.email}
                                    onChange={handleChange}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}

                                />
                            </Grid>
                            <Grid item sm={6} xs={6}>
                                <H6 mb={1}>Dominio</H6>
                                <AppTextField
                                    fullWidth
                                    size="small"
                                    name="dominio"
                                    placeholder="Dominio"
                                    value={values.dominio}
                                    onChange={handleChange}
                                    error={Boolean(touched.dominio && errors.dominio)}
                                    helperText={touched.dominio && errors.dominio}
                                    disabled
                                />
                            </Grid>
                            <Grid item sm={6} xs={6}>
                                <H6 mb={1}>Facturacion</H6>
                                {
                                    values.facturacion == 1 ? (<Chip label="Activado" color="primary" />) : (<Chip label="Desactivado" color="primary" disabled />)
                                }
                            </Grid>
                        </Grid>
                    </Scrollbar>
                    <Grid container>
                        <Grid item xs={12}>
                            <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                                <Button fullWidth variant="outlined" onClick={onClose}>
                                    Cancelar
                                </Button>
                                <Button fullWidth type="submit" variant="contained" >
                                    Guardar
                                </Button>
                            </FlexBox>
                        </Grid>
                    </Grid>
                </Form>
            </FormikProvider>
        </StyledAppModal >
    )
}

export default ModalGeneral
