
import { Autocomplete, Box, Button, Grid, IconButton, styled, TextField, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { Context } from "contexts/ContextDataTable";
import { useFormik } from "formik";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

import * as Yup from "yup"; // component props interface
import { UseGuardarClasificacion } from "../hooks/UseGuardarClasificacion";
import { ResetTvRounded } from "@mui/icons-material";
import { UseUpdateClasificacion } from "../hooks/UseUpdateClasificacion";
import { useSnackbar } from "notistack";


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
    tipo,
    id,
    options
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const [context, setContext] = useContext(Context);

    const validationSchema = Yup.object().shape({
        id: Yup.number().nullable(),
        nombreClasificacion: Yup.string().min(3, "Es muy corto").required("Nombre es requerido!"),
        clasificacionId: Yup.number().nullable(),
        nombreClasificacionPadre: Yup.string().nullable(),
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
        onSubmit: values => {
            console.log('forms', values)
            console.log('change option', value)

            if (editClasificacion) {
                console.log('edicion')
                handlerSubmitModificar()
                setContext(true);
            } else {
                console.log('nuevo')
                handlerSubmitGuardar();
                setContext(true);
            }
            onClose()
            resetForm()
        }
    });
    const { handlerSubmitGuardar } = UseGuardarClasificacion(values);
    const { handlerSubmitModificar } = UseUpdateClasificacion(values);
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setValue({
            id: data.id,
            nombreClasificacion: data.nombreClasificacionPadre
        });
        setValues(data);
    }, [data])

    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {editClasificacion && data ? "Editar Clasificacion" : "Añadir Clasificacion"}
        </H2>

        <form onSubmit={handleSubmit}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Grid container spacing={2}>
                    <Grid item sm={12} xs={12}>
                        <H6 mb={1}>Pertenece a</H6>
                        <Autocomplete
                            fullWidth
                            getOptionLabel={(options) => options.nombreClasificacion}
                            //defaultValue={options[0]}
                            options={options}
                            autoSelect={true}
                            //inputValue={inputValue}
                            value={value ? value : null}
                            size="small"
                            isOptionEqualToValue={(option, value) => {
                                if (value) {
                                    return (option.value === value.value)
                                } else {
                                    return false;
                                }
                            }}
                            onChange={(event, newValue) => {
                                if (newValue != null) {
                                    setValue(newValue);
                                    setValues({ ...values, clasificacionId: newValue.id, nombreClasificacionPadre: newValue.nombreClasificacion })
                                    console.log(newValue)
                                } else {
                                    setValue(null);
                                }
                            }}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                            }}
                            renderInput={
                                (params) => <TextField
                                    {...params}
                                    label="Pertenece a"
                                    error={Boolean(touched.clasificacionId && errors.clasificacionId)}
                                    helperText={touched.clasificacionId && errors.clasificacionId}
                                />
                            }
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <H6 mb={1}>Nombre</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="nombreClasificacion"
                            placeholder="Nombre"
                            value={values.nombreClasificacion}
                            onChange={handleChange}
                            error={Boolean(touched.nombreClasificacion && errors.nombreClasificacion)}
                            helperText={touched.nombreClasificacion && errors.nombreClasificacion}
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