import { Add, KeyboardArrowDown } from "@mui/icons-material";
import { Button, Grid, IconButton, styled, useMediaQuery } from "@mui/material";

import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { Context } from "contexts/ContextDataTable";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { CrearClienteService, EditarClienteService, GuardarClienteService, ModificarClienteService } from "Services/api-ventas-erp/clienteService";
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

const CreateClienteModal = ({
    open,
    data,
    onClose,
    onSubmit,
    editCliente
}) => {
    const [actualizarTable, setActualizarTableContext] = useContext(Context);
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));

    const validationSchema = Yup.object().shape({
        id: Yup.number().nullable(),
        numeroDocumento: Yup.string().min(3, "muy corto").required("Numero de documento es requerido"),
        codigoCliente: Yup.string().required("Codigo requerido"),
        nombreCompletoCliente: Yup.string().required("Nombre es requerido"),
        correoElectronico: Yup.string().email('Debe ser un correo electronico').required("Correo electronico es requerido"),
        dirrecion: Yup.string().required("dirrecion es requerido"),
        telefono: Yup.string().required("Telefono es requerido"),
        codigoTipoDocumentoIdentidad: Yup.number().required("Selecione un tipo de documento"),
        complemento: Yup.string().nullable().required("Describa un complemento"),
        tipoDocumentoIdentidad: Yup.object().shape({
            id: Yup.string().required("requerido"),
            codigoClasificador: Yup.string().nullable(),
            codigoTipoParametro: Yup.string().nullable(),
            descripcion: Yup.string().nullable(),
        })
    });
    const formCLiente = useFormik({
        initialValues: data,
        validationSchema,
        onSubmit: async (values) => {
            onSubmit(values);
            setActualizarTableContext(true);
            resetForm()
        }
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
    } = formCLiente;

    useEffect(() => {
        setValues(data)
    }, [open])
    return (
        <Context.Provider value={[actualizarTable, setActualizarTableContext]}>
            <StyledAppModal open={open} handleClose={onClose}>
                <H2 marginBottom={2}>
                    {editCliente ? "Editar cliente" : "Añadir cliente"}
                </H2>
                <FormikProvider value={formCLiente}>
                    <Form onSubmit={(e) => { console.log(errors); handleSubmit(e) }}>

                        <Scrollbar style={{
                            maxHeight: downXl ? 500 : "auto"
                        }}>
                            <Grid container spacing={2}>

                                <Grid item sm={6} xs={12}>
                                    <H6 mb={1}>Numero de Documento</H6>
                                    <AppTextField
                                        fullWidth
                                        size="small"
                                        name="numeroDocumento"
                                        placeholder="Numero de documento"
                                        value={values.numeroDocumento}
                                        onChange={handleChange}
                                        error={Boolean(touched.numeroDocumento && errors.numeroDocumento)}
                                        helperText={touched.numeroDocumento && errors.numeroDocumento} />
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <H6 mb={1}>Tipo Documento</H6>
                                    <AppTextField
                                        fullWidth
                                        size="small"
                                        name="codigoTipoDocumentoIdentidad"
                                        placeholder="Tipo de Documento"
                                        value={values.codigoTipoDocumentoIdentidad}
                                        onChange={handleChange}
                                        error={Boolean(touched.codigoTipoDocumentoIdentidad && errors.codigoTipoDocumentoIdentidad)}
                                        helperText={touched.codigoTipoDocumentoIdentidad && errors.codigoTipoDocumentoIdentidad} />
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <H6 mb={1}>Codigo</H6>
                                    <AppTextField
                                        fullWidth
                                        size="small"
                                        name="codigoCliente"
                                        placeholder="Codigo"
                                        value={values.codigoCliente}
                                        onChange={handleChange}
                                        error={Boolean(touched.codigoCliente && errors.codigoCliente)}
                                        helperText={touched.codigoCliente && errors.codigoCliente} />
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <H6 mb={1}>Complemento</H6>
                                    <AppTextField
                                        fullWidth
                                        size="small"
                                        name="complemento"
                                        placeholder="Complemento"
                                        value={values.complemento}
                                        onChange={handleChange}
                                        error={Boolean(touched.complemento && errors.complemento)}
                                        helperText={touched.complemento && errors.complemento} />
                                </Grid>

                                <Grid item sm={12} xs={12}>
                                    <H6 mb={1}>Nombre completo</H6>
                                    <AppTextField
                                        fullWidth
                                        size="small"
                                        name="nombreCompletoCliente"
                                        placeholder="Nombre"
                                        value={values.nombreCompletoCliente}
                                        onChange={handleChange}
                                        error={Boolean(touched.nombreCompletoCliente && errors.nombreCompletoCliente)}
                                        helperText={touched.nombreCompletoCliente && errors.nombreCompletoCliente} />
                                </Grid>

                                <Grid item xs={12}>
                                    <H6 mb={1}>Email</H6>
                                    <AppTextField
                                        fullWidth
                                        size="small"
                                        name="correoElectronico"
                                        placeholder="Email"
                                        value={values.correoElectronico}
                                        onChange={handleChange}
                                        error={Boolean(touched.correoElectronico && errors.correoElectronico)}
                                        helperText={touched.correoElectronico && errors.correoElectronico} />
                                </Grid>

                                <Grid item xs={12}>
                                    <H6 mb={1}>Dirrecion</H6>
                                    <AppTextField
                                        fullWidth
                                        multiline
                                        size="small"
                                        name="dirrecion"
                                        placeholder="Dirrecion"
                                        value={values.dirrecion}
                                        onChange={handleChange}
                                        error={Boolean(touched.dirrecion && errors.dirrecion)}
                                        helperText={touched.dirrecion && errors.dirrecion} />
                                </Grid>

                                <Grid item sm={6} xs={12}>
                                    <H6 mb={1}>Telefono</H6>
                                    <AppTextField
                                        fullWidth
                                        size="small"
                                        name="telefono"
                                        placeholder="Telefono"
                                        value={values.telefono} onChange={handleChange}
                                        error={Boolean(touched.telefono && errors.telefono)}
                                        helperText={touched.telefono && errors.telefono} />
                                </Grid>

                                {/*   <Grid item sm={6} xs={12}>
                            <H6 mb={1}>Linea credito</H6>
                            <AppTextField
                                fullWidth
                                size="small"
                                name="lineaCredito"
                                placeholder="Monto credito"
                                value={values.lineaCredito} />
                        </Grid> */}

                                {/* <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Crear Plan cuenta en :</H6>
                        <AppTextField select fullWidth size="small" name="planCuentaId" value={values.planCuentaId} onChange={handleSelectedPlanCuenta} SelectProps={{
                            native: true,
                            IconComponent: KeyboardArrowDown
                        }} helperText={touched.planCuentaId && errors.planCuentaId} error={Boolean(touched.codigoCliente && errors.codigoCliente)} >
                            <React.Fragment>
                                {
                                    planCuentas?.map(
                                        (plan, i) => <option key={i} value={plan.id}>{plan.nombreCuenta}</option>
                                    )
                                }
                            </React.Fragment>
                        </AppTextField>

                    </Grid> */}
                                {/*  <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Moneda :</H6>
                        <AppTextField select fullWidth size="small" name="monedaId" value={values.monedaId} onChange={handleSelectedChangeMoneda} SelectProps={{
                            native: true,
                            IconComponent: KeyboardArrowDown
                        }}>
                            <React.Fragment>
                                {
                                    monedas?.map(
                                        (moneda, i) => <option key={i} value={moneda.id}>{moneda.nombreMoneda}</option>
                                    )
                                }
                            </React.Fragment>
                        </AppTextField>
                    </Grid> */}
                            </Grid>
                        </Scrollbar>

                        <Grid container>
                            <Grid item xs={12}>
                                <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                                    <Button fullWidth variant="outlined" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button fullWidth type="submit" variant="contained">
                                        Save
                                    </Button>
                                </FlexBox>
                            </Grid>
                        </Grid>
                    </Form>
                </FormikProvider>
            </StyledAppModal>
        </Context.Provider>);
};
export default CreateClienteModal;