import { Add, KeyboardArrowDown } from "@mui/icons-material";
import { Button, Grid, IconButton, RadioGroup, styled, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import AppModal from "components/AppModal";
import AppRadio from "components/AppRadio";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import DeleteIcon from "icons/DeleteIcon";
import { StyledFormControlLabel } from "page-sections/accounts/account-v2/StyledComponent";
import { Context } from "pages/proveedores/context/actualizarTabla";
import React, { useContext, useEffect, useState } from "react";
import { CrearProveedorService, EditarProveedorService, GuardarProveedorService, ModificarProveedorService } from "Services/api-ventas-erp/proveedores";
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
    id,
    status//void
}) => {
    const initialState = {
        id: 0,
        codigoProveedor: '',
        nombreProveedor: '',
        dirrecion: '',
        telefono: '',
        contacto: '',
    }
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
        initialValues: initialState,
        validationSchema,
        onSubmit: async (values) => {

        }
    });

    useEffect(() => {
        if (editProveedor) {
            ApiEditarProveedores()
        } else {
            ApiCreateProveedores()
        }
    }, [open])

    const ApiCreateProveedores = async () => {
        const { data } = await CrearProveedorService();

        setValues({
            ...initialState,
            codigoProveedor: data.data.codigo
        });
    }
    const ApiGuardarProveedores = async () => {
        const { data } = await GuardarProveedorService(values)
        resetForm();
        onClose();
      
        console.log(data.message);
    }
    const ApiModificarProveedores = async () => {
        const { data } = await ModificarProveedorService(values)
        resetForm();
        onClose();
      
        console.log(data.message);
    }
    const ApiEditarProveedores = async () => {
        const { data } = await EditarProveedorService(id)
        setValues({
            id: id,
            codigoProveedor: data.data.proveedor.codigoProveedor,
            nombreProveedor: data.data.proveedor.nombreProveedor,
            dirrecion: data.data.proveedor.dirrecion,
            telefono: data.data.proveedor.telefono,
            contacto: data.data.proveedor.contacto,
        });
    }
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