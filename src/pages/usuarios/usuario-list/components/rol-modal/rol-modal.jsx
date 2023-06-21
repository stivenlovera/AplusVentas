
import { Autocomplete, Box, Button, Grid, Switch, TextField, styled, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import * as Yup from "yup"; // component props interface

import { useContext, useEffect, useState } from "react";
import { UseUpdateUsuarioRoles } from "./hook/use-update-usuario";
import { initialRoles } from "../utils/initialRoles";
import { Context } from "contexts/ContextDataTable";

// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 700,
    minWidth: 300,
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

const RolesModal = ({
    open,
    data,
    onClose,
    editRol
}) => {
    const { usuario, roles } = data
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));

    const [changeRoles, setChangeRoles] = useState([]);
    const [context, setContext] = useContext(Context);

    const validationSchema = Yup.object().shape({
        habilitado: Yup.bool().required("Selecione es Requerido!"),
        usuarioId: Yup.number().nullable(),
        usuario: Yup.string().required("Usuario es Requerido!"),
        password: Yup.string().required("Password es Requerido!"),
        roles: Yup.array().required("Roles es Requerido!")
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
        setFieldError
    } = useFormik({
        initialValues: initialRoles,
        validationSchema,
        onSubmit: async (values) => {
            await ApiUpdateUsuario()
        }
    });

    const { ApiUpdateUsuario } = UseUpdateUsuarioRoles(values)

    const hadlerChangeHabilitado = () => {

        if (!values.habilitado) {
            setValues({
                habilitado: usuario.habilitado,
                usuario: usuario.usuario,
                usuarioId: usuario.usuarioId,
                password: '',
            })
        } else {
            setValues({
                habilitado: false,
                usuarioId: usuario.usuarioId,
                password: '*',
                roles: [],
                usuario: '  ',
            });
        }
        setFieldValue('habilitado', !values.habilitado)
    }

    useEffect(() => {
        setValues({
            habilitado: usuario.habilitado,
            usuario: usuario.usuario,
            usuarioId: usuario.usuarioId,
            password: '',
        })
    }, [data])

    /*Metodos */
    const handlerClose = () => {
        onClose();
        resetForm();
    }

    const OnSubmit = async (e) => {

        if (values.habilitado) {
            await ApiUpdateUsuario();
            setContext(true);
            handlerClose();
        } else {
            await ApiUpdateUsuario();
            setContext(true);
            handlerClose();
            console.log('no enviar habilitado')
        }

    }
    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {editRol && data ? "Acceso y roles" : "Acceso y roles"}
        </H2>

        <form >
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>

                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <SwitchWrapper>
                            <Small display="block" fontWeight={600}>
                                {values.habilitado ? 'Habilitado' : 'No habilitado'}
                            </Small>
                            <Switch checked={values.habilitado} onChange={hadlerChangeHabilitado} />
                        </SwitchWrapper>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Usuario</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="usuario"
                            placeholder="Usuario"
                            onChange={handleChange}
                            error={Boolean(touched.usuario && errors.usuario)}
                            helperText={touched.usuario && errors.usuario}
                            disabled={!values.habilitado}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Password</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                            disabled={!values.habilitado}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <H6 mb={1}>Seleccione roles</H6>
                        <Autocomplete
                            fullWidth
                            multiple
                            getOptionLabel={(options) => options.nombre}
                            options={roles}

                            disabled={!values.habilitado}
                            defaultValue={usuario.roles}
                            //isOptionEqualToValue={(option, value) => option.value === value.value}
                            size="small"
                            onChange={(event, newValue) => {
                                if (newValue != null) {
                                    var rolId = newValue.map(x => x.rolId);
                                    setChangeRoles(newValue)
                                    setFieldValue('roles', rolId)
                                } else {

                                }
                            }}
                            renderInput={
                                (params) => <TextField
                                    {...params}
                                />
                            }
                        />
                    </Grid>
                </Grid>
            </Scrollbar>
            <Grid container>
                <Grid item xs={12}>
                    <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                        <Button fullWidth variant="outlined" onClick={handlerClose}>
                            Cancel
                        </Button>
                        <Button fullWidth variant="contained" onClick={OnSubmit}>
                            Aplicar
                        </Button>
                    </FlexBox>
                </Grid>
            </Grid>
        </form>
    </StyledAppModal >;
};
export default RolesModal;