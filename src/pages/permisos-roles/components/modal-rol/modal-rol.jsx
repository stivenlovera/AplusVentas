
import { Autocomplete, Box, Button, Checkbox, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch, TextField, styled, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { setNestedObjectValues, useFormik } from "formik";
import * as Yup from "yup"; // component props interface
import { useContext, useEffect, useState } from "react";
import { initialFormRoles } from "pages/permisos-roles/utils/initialValuesRol";
import { ContextPermisos } from "pages/permisos-roles/context/contextTablePermisos";
import { Request } from "utils/http";
import { convertError } from "utils/convertError";
import { FormHelperText } from '@mui/material';

// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 400,
    minWidth: 200,
    outline: "none",
    padding: "1.5rem"
}));

const SwitchWrapper = styled(Box)(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10
}));

const RolModal = ({
    open,
    form,
    onClose,
    editRol
}) => {
    const { permisosRol, permisos } = form;
    const downXl = useMediaQuery(theme => theme.breakpoints.down("sm"));
    const [context, setContext] = useContext(ContextPermisos);
    const [buttonStore, setButtonStore] = useState(false);

    const validationSchema = Yup.object().shape({
        rolId: Yup.number().nullable(),
        nombre: Yup.string().required("Nombre es requerido!"),
        permisos: Yup.array().min(1, "Selecione almenos un rol!")
    });
    const {
        values,
        setValues,
        errors,
        handleChange,
        handleSubmit,
        touched,
        isValid,
        resetForm,
        setFieldValue,
        setErrors,
        setFieldError
    } = useFormik({
        initialValues: initialFormRoles,
        validationSchema,
        onSubmit: async (values) => {
            if (editRol) {
                await ApiUpdateRol();
            } else {
                /* console.log('es valido', isValid)
                console.log('data ', values) */
                await ApiStoreRol();
            }
        }
    });

    /*METODOS */
    const handlerClose = () => {
        onClose();
        resetForm();
    }
    /*API */
    const ApiStoreRol = async () => {
        console.log('acctivate roles ')
        setButtonStore(true)
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Rol`,
            initialValues: values,
            method: 'post',
            showError: true,
            showSuccess: true,
            values: values
        });
        if (!!status) {
            setContext(true);
            resetForm();
            onClose();
        } else {
            setButtonStore(false)
            const value = convertError(data);
            setErrors(value)
        }
    }

    const ApiUpdateRol = async () => {

        setButtonStore(true)
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Rol`,
            initialValues: values,
            method: 'put',
            showError: true,
            showSuccess: true,
            values: values
        });

        if (!!status) {
            setContext(true);
            resetForm();

            onClose();
        } else {
            const value = convertError(data);
            setErrors(value)
            setButtonStore(false)
        }
    }

    useEffect(() => {
        if (editRol) {
            setValues(permisosRol);
        } else {
            setValues(permisosRol);
        }
    }, [form]);

    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {editRol && form ? "Editar Rol y permisos" : "Rol y permisos"}
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
                    <Grid item sm={12} xs={12}>
                        <FormHelperText
                            error={Boolean(touched.permisos && errors.permisos)} >
                            {touched.permisos && errors.permisos}
                        </FormHelperText>
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={permisos}
                                getOptionLabel={(option) => option.nombre}
                                value={values.permisos}
                                isOptionEqualToValue={(option, value) => {
                                    return option.permisoId === value.permisoId
                                }}
                                onChange={(e, value) => {
                                    console.log(value)
                                    if (value !== null) {
                                        setValues({ ...values, permisos: value })
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Selecione permisos"
                                        placeholder="Permisos"
                                    />
                                )}
                            />
                        </List>
                    </Grid>
                </Grid>
            </Scrollbar>
            <Grid container>
                <Grid item xs={12}>
                    <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                        <Button fullWidth variant="outlined" onClick={handlerClose}>
                            Cancel
                        </Button>
                        <Button fullWidth variant="contained" type="submit" disabled={buttonStore}>
                            Aplicar
                        </Button>
                    </FlexBox>
                </Grid>
            </Grid>
        </form>
    </StyledAppModal >;
};
export default RolModal;