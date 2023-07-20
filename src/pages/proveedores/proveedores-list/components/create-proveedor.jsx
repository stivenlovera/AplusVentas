import { Button, Grid, IconButton, RadioGroup, styled, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup"; // component props interface

// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 700,
    minWidth: 300,
    outline: "none",
    padding: "1.5rem"
}));

const CreateProveedorModal = ({
    open,
    onClose,//void
    editProveedor,
    data,
    onSubmit//void
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const validationSchema = Yup.object().shape({
        codigoProveedor: Yup.string().min(3, "Es muy cortos").required("Codigo proveedor es requerido!"),
        nombreProveedor: Yup.string().min(3, "Es muy cortos").required("Nombre es requerido!"),
        dirrecion: Yup.string().required("Dirrecion es requerido!"),
        id: Yup.number().nullable(),
        telefono: Yup.number('debe de ser un numero').required("Telefono es requerido!"),
        contacto: Yup.string().required("Persona de contacto es requerido!"),
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
        initialValues: data,
        validationSchema,
        onSubmit: async (values) => {
            onSubmit(values)
        }
    });

    useEffect(() => {
        setValues(data)
    }, [open])

    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {editProveedor ? "Editar proveedor" : "Añadir proveedor"}
        </H2>

        <form onSubmit={handleSubmit}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Codigo</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="codigoProveedor"
                            placeholder="Codigo"
                            value={values.codigoProveedor}
                            onChange={handleChange}
                            error={Boolean(touched.codigoProveedor && errors.codigoProveedor)}
                            helperText={touched.codigoProveedor && errors.codigoProveedor}
                            disabled={true}
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Nombre</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="nombreProveedor"
                            placeholder="Nombre"
                            value={values.nombreProveedor}
                            onChange={handleChange}
                            error={Boolean(touched.nombreProveedor && errors.nombreProveedor)}
                            helperText={touched.nombreProveedor && errors.nombreProveedor} />
                    </Grid>

                    <Grid item xs={12}>
                        <H6 mb={1}>Dirrecion</H6>
                        <AppTextField
                            fullWidth
                            multiline
                            rows={3}
                            name="dirrecion"
                            placeholder="Dirrecion"
                            value={values.dirrecion}
                            onChange={handleChange}
                            error={Boolean(touched.dirrecion && errors.dirrecion)}
                            helperText={touched.dirrecion && errors.dirrecion} />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <H6 mb={1}>Persona contacto</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="contacto"
                            placeholder="Persona contacto"
                            value={values.contacto}
                            onChange={handleChange}
                            error={Boolean(touched.contacto && errors.contacto)}
                            helperText={touched.contacto && errors.contacto} />
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
                            helperText={touched.telefono && errors.telefono} />
                    </Grid>
                </Grid>
            </Scrollbar>
            <Grid container>
                <Grid item xs={12}>
                    <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                        <Button fullWidth variant="outlined" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button fullWidth type="submit" variant="contained" onSubmit={handleSubmit} >
                            Guardar
                        </Button>
                    </FlexBox>
                </Grid>
            </Grid>
        </form>
    </StyledAppModal>;
};
export default CreateProveedorModal;