
import { Backdrop, Box, Button, CircularProgress, Grid, styled, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { Context } from "contexts/ContextDataTable";
import { Field, Formik, Form, useFormik, FieldArray, ErrorMessage } from "formik";
import { useContext, useEffect, useState } from "react";

import * as Yup from "yup"; // component props interface
import { Request } from "utils/http";
// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 800,
    minWidth: 400,
    outline: "none",
    padding: "1.5rem"
}));

const AtributoModal = ({
    open,
    data,
    onClose,
    onUpdate
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const [context, setContext] = useContext(Context);
    const [loader, setLoader] = useState(false)
    /*METODOS */

    /*API */
    const onHandlerSave = async (values) => {
        setLoader(true);
        if (values.atributoId == 0) {
            const { data, message, status } = await Request({
                endPoint: `${process.env.REACT_APP_API}api/Atributo`,
                initialValues: [],
                method: 'post',
                showError: true,
                showSuccess: true,
                values: values
            });
        } else {
            const { data, message, status } = await Request({
                endPoint: `${process.env.REACT_APP_API}api/Atributo`,
                initialValues: [],
                method: 'put',
                showError: true,
                showSuccess: true,
                values: values
            });
        }
        onUpdate(true);
        setLoader(false);
    }
    const onHandlerDelete = async (atributo, arrayHelpers, index) => {
        setLoader(true);
        if (atributo.atributoId == 0) {
            arrayHelpers.remove(index)
        } else {
            const { data, message, status } = await Request({
                endPoint: `${process.env.REACT_APP_API}api/Atributo/${atributo.atributoId}`,
                initialValues: [],
                method: 'delete',
                showError: true,
                showSuccess: true,
            });
            if (!!status) {
                onUpdate(true);
            }
        }
        setLoader(false);
    }

    useEffect(() => {
        console.log('data de entrada', data.atributos)
    }, [data.atributos])
    
    return <StyledAppModal open={open} handleClose={onClose} >
        <H2 marginBottom={2}>
            Atributos
        </H2>

        <Formik
            initialValues={{
                atributos: data.atributos /* [ {
                    categoriaId: 0,
                    atributoId: 0,
                    etiqueta: "string",
                    tipo: "string"
                } ] */
            }}
            validationSchema={Yup.object({
                atributos: Yup.array().of(
                    Yup.object().shape({
                        etiqueta: Yup.string().required("Nombre etiqueta requerido"),
                        tipo: Yup.string(),
                        categoriaId: Yup.number(),
                        atributoId: Yup.number()
                    })
                )
            })}
            onSubmit={values => {
                onHandlerSave(values)
            }}
        >
            {({ values, handleChange, touched, errors, setValues }) => {
                return (
                    <Form>
                        <FieldArray
                            name="atributos"
                            render={arrayHelpers => {
                                const atributos = values.atributos;
                                return (
                                    <div>
                                        <Backdrop
                                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                            open={loader}
                                            onClick={() => { setLoader(false) }}
                                        >
                                            <CircularProgress color="inherit" />
                                        </Backdrop>
                                        <Scrollbar style={{ maxHeight: 600, overflow: 'auto' }} >
                                            {atributos && atributos.length > 0
                                                ? atributos.map((atributo, index) => {
                                                    return (
                                                        <Box
                                                            key={index}
                                                            sx={{
                                                                backgroundColor: '#f3f4f9',
                                                                /* '&:hover': {
                                                                    backgroundColor: 'primary.main',
                                                                    opacity: [0.9, 0.8, 0.7],
                                                                }, */
                                                                p: 2,
                                                                m: 1
                                                            }}
                                                        >
                                                            <Grid container spacing={2}>
                                                                <Grid item sm={12} xs={12}>
                                                                    <H6 mb={1}>Nombre</H6>
                                                                    <AppTextField
                                                                        fullWidth
                                                                        size="small"
                                                                        name={`atributos.${index}.etiqueta`}
                                                                        placeholder="etiqueta"
                                                                        value={atributos[index].etiqueta}
                                                                        onChange={handleChange}
                                                                    /* error={Boolean(touched.atributos && atributos.${index}.etiqueta)}*/
                                                                    //helperText={`atributos.${index}.etiqueta` && `atributos.${index}.etiqueta`} 
                                                                    />
                                                                    <ErrorMessage name={`atributos.${index}.etiqueta`} />
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <FlexBox justifyContent="flex-end" gap={2} marginTop={0}>
                                                                        <Button
                                                                            fullWidth
                                                                            color="error"
                                                                            variant="contained"
                                                                            onClick={() => { onHandlerDelete(atributo, arrayHelpers, index) }}
                                                                        >
                                                                            Eliminar
                                                                        </Button>
                                                                        <Button
                                                                            fullWidth
                                                                            //type="submit"
                                                                            variant="contained"
                                                                            onClick={() => { onHandlerSave(atributo) }}
                                                                        >
                                                                            Guardar
                                                                        </Button>
                                                                    </FlexBox>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    );
                                                })
                                                : null}
                                        </Scrollbar>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                                                    <Button fullWidth variant="outlined" onClick={onClose}>
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        fullWidth
                                                        //type="submit"
                                                        variant="contained"
                                                        onClick={() => {
                                                            arrayHelpers.push({
                                                                categoriaId: data.categoriaId,
                                                                atributoId: 0,
                                                                etiqueta: "",
                                                                tipo: "text"
                                                            })
                                                        }}
                                                    >
                                                        Añadir atributo
                                                    </Button>
                                                </FlexBox>
                                            </Grid>
                                        </Grid>
                                    </div>
                                );
                            }}
                        />
                        <hr />
                    </Form>
                )
            }}
        </Formik>
    </StyledAppModal>;
};
export default AtributoModal;