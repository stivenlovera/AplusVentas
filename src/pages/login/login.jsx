
import { Button, ButtonBase, Divider, Stack, styled } from "@mui/material";
import AppTextField from "components/input-fields/AppTextField";
import { useFormik } from "formik";
import AuthenticationLayout from "page-sections/authentication/AuthenticationLayout";
import React from "react";
import * as Yup from "yup";
import { UseLogin } from "./hooks/useLogin";
const initialState = {
    usuario: '',
    password: ''
}
const StyledButton = styled(ButtonBase)(({
    theme
}) => ({
    width: "100%",
    padding: 12,
    marginBottom: 16,
    borderRadius: "8px",
    fontWeight: "500",
    border: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down(454)]: {
        width: "100%",
        marginBottom: 8
    }
}));

const Login = () => {


    const validationSchema = Yup.object().shape({
        usuario: Yup.string().required("Usuario requerido"),
        password: Yup.string().required("Password es requerido"),
    });
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        touched,
        setFieldValue,
        setValues,
        resetForm,
    } = useFormik({
        initialValues: initialState,
        validationSchema,
        onSubmit: async (values) => {
            await ApiLogin();
        }
    });
    const { ApiLogin } = UseLogin(values.usuario, values.password)
    return (
        <AuthenticationLayout route="/register" description="que es esto?" title="A plus security" routeName="registrate!">
            <form onSubmit={handleSubmit}>
                <Stack gap={2} mt={5}>
                    <AppTextField
                        fullWidth
                        label="Usuario"
                        name='usuario'
                        value={values.usuario}
                        onChange={handleChange}
                        error={Boolean(touched.usuario && errors.usuario)}
                        helperText={touched.usuario && errors.usuario}
                    />
                    <AppTextField
                        fullWidth
                        label="Password"
                        name='password'
                        value={values.password}
                        onChange={handleChange}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    <Button variant="contained" type="submit">Iniciar session</Button>
                </Stack>
            </form>
        </AuthenticationLayout>
    );
};

export default Login;