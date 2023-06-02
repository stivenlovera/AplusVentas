
import { Button, Grid, styled, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { Context } from "contexts/ContextDataTable";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";

import * as Yup from "yup"; // component props interface
import { Request } from "utils/http";
// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 700,
    minWidth: 300,
    outline: "none",
    padding: "1.5rem"
}));

const CreateClasificacionModal = ({
    open,
    data,
    onClose,
    editClasificacion,
    hijo
}) => {
    const { categoriaId, nombre } = data;
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const [context, setContext] = useContext(Context);

    const validationSchema = Yup.object().shape({
        id: Yup.number().nullable(),
        nombre: Yup.string().min(3, "Es muy corto").required("Nombre es requerido!"),
        categoriaId: Yup.number().nullable()
    });

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        touched,
        setFieldValue,
        resetForm,
        setValues
    } = useFormik({
        initialValues: data,
        validationSchema,
        onSubmit: async (values) => {
            if (editClasificacion) {
                await onUpdate(values);
            } else {
                if (hijo) {
                    await onStoreHijo(values);
                } else {
                    let newValue = {
                        categoriaId: 0,
                        nombre: values.nombre
                    }
                    console.log('nuevo', newValue);
                    await onStore(newValue);
                }
            }
            onClose()
            resetForm()
        }
    });
    const identificarTipo = () => {
        if (editClasificacion) {
            return "Editar Clasificacion";
        } else {
            if (hijo) {
                return `Añadir SubClasificacion de ${data.nombre.trim()}`;
            } else {
                return "Añadir Clasificacion"
            }
        }
    }
    /*METODOS */

    /*API */
    const onStore = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/categoria/InsertarHijo`,
            initialValues: [],
            method: 'post',
            showError: true,
            showSuccess: false,
            values: values
        });
        if (!!status) {
            setContext(true);
            onClose();
        }
    }
    const onUpdate = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/categoria`,
            initialValues: [],
            method: 'put',
            showError: true,
            showSuccess: false,
            values: values
        });
        if (!!status) {
            setContext(true);
            onClose();
        }
    }
    const onStoreHijo = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/categoria/InsertarHijo`,
            initialValues: [],
            method: 'post',
            showError: true,
            showSuccess: false,
            values: values
        });
        if (!!status) {
            setContext(true);
            onClose();
        }
    }

    useEffect(() => {
        if (editClasificacion) {
            setValues({
                categoriaId: categoriaId,
                nombre: nombre.trim()
            });
        } else {
            if (hijo) {
                setValues({
                    categoriaId: categoriaId,
                    nombre: ''
                });
            } else {
                setValues({
                    categoriaId: categoriaId,
                    nombre: ''
                });
            }
        }

    }, [data])

    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {identificarTipo()}
        </H2>

        <form onSubmit={handleSubmit}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Grid container spacing={2}>
                    <Grid item sm={12} xs={12}>
                        <H6 mb={1}>Nombre</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="nombre"
                            placeholder="Nombre"
                            value={values.nombre}
                            onChange={handleChange}
                            error={Boolean(touched.nombre && errors.nombre)}
                            helperText={touched.nombre && errors.nombre}
                        />
                    </Grid>
                </Grid>
            </Scrollbar>
            <Grid container>
                <Grid item xs={12}>
                    <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                        <Button fullWidth variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button fullWidth type="submit" variant="contained">
                            Guardar
                        </Button>
                    </FlexBox>
                </Grid>
            </Grid>
        </form>
    </StyledAppModal>;
};

const images = ["/static/products/watch.png", "/static/products/camera.png", "/static/products/headphone.png"];
export default CreateClasificacionModal;