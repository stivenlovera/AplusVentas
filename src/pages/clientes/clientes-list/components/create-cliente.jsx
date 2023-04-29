import { Add, KeyboardArrowDown } from "@mui/icons-material";
import { Button, Grid, IconButton, styled, useMediaQuery } from "@mui/material";

import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { CrearClienteService, EditarClienteService, GuardarClienteService, ModificarClienteService } from "Services/api-ventas-erp/clienteService";
import * as Yup from "yup"; // component props interface
import { Context } from "../context/context";

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
    editProduct,
    tipo,
    id
}) => {
    const [context, setContext] = useContext(Context);
    const initialState = {
        id: "0",
        codigoCliente: "",
        nombreCliente: "",
        ci: "",
        telefono: "",
        dirrecion: "",
        lineaCredito: 0,
        correoElectronico: "",
        planCuentaId: "",
        monedaId: 1,
    };
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));

    const [planCuentas, setPlanCuentas] = useState([]);
    const [monedas, setMonedas] = useState([]);

    const [selectedMoneda, setSelectedMoneda] = useState("1");
    const handleSelectedChangeMoneda = event => {
        setFieldValue('monedaId', event.target.value);
        setSelectedMoneda(event.target.value);
    };

    const [selectedPlanCuenta, setSelectdPlanCuenta] = useState("1");
    const handleSelectedPlanCuenta = event => {
        setFieldValue('planCuentaId', event.target.value);
        setSelectdPlanCuenta(event.target.value);
    };

    const ApiCreateClientes = async () => {
        const { data } = await CrearClienteService();
        setValues({
            ...initialState,
            codigoCliente: data.data.codigoCliente,
            planCuentaId: data.data.planCuentas.length > 0 ? data.data.planCuentas[0].id : '',
            monedaId: data.data.monedas.length > 0 ? data.data.monedas[0].id : ''
        });
        setPlanCuentas(data.data.planCuentas);
        setMonedas(data.data.monedas);
    }
    const ApiGuardarClientes = async () => {
        console.log(values)
        const { data } = await GuardarClienteService(values)
        resetForm();
        onClose();
        setContext(true)
        console.log(data.message);
    }
    const ApiModificarClientes = async () => {
        const { data } = await ModificarClienteService(values)
        resetForm();
        onClose();
        setContext(true)
        console.log(data.message);
    }
    const ApiEditarCliente = async () => {
        const { data } = await EditarClienteService(id)
        setValues({
            id: data.data.cliente.id,
            codigoCliente: data.data.cliente.codigoCliente,
            nombreCliente: data.data.cliente.nombreCliente,
            ci: data.data.cliente.ci,
            telefono: data.data.cliente.telefono,
            dirrecion: data.data.cliente.dirrecion,
            lineaCredito:data.data.cliente.lineaCredito,
            correoElectronico: data.data.cliente.correoElectronico,
            planCuentaId: data.data.cliente.planCuentaId,
            monedaId:data.data.cliente.monedaId
        });
        setPlanCuentas(data.data.planCuentas);
        setMonedas(data.data.monedas);
        console.log(data.message);
    }


    const validationSchema = Yup.object().shape({
        id: Yup.string().nullable(),
        codigoCliente: Yup.string().min(3, "muy corto").required("Codigo requerido"),
        nombreCliente: Yup.string().required("Nombre es requerido"),
        ci: Yup.string().required("CI es requerido"),
        telefono: Yup.string().required("Telefono es requerido"),
        lineaCredito: Yup.number().required("Linea de credito es requerido"),
        correoElectronico: Yup.string().email('Debe ser un correo electronico').required("Correo electronico es requerido"),
        dirrecion: Yup.string().nullable(),
        planCuentaId: Yup.number().required("Plan cuenta es requerido"),
        monedaId: Yup.number().required("Moneda es requerido"),
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
            switch (tipo) {
                case 'nuevo':
                    await ApiGuardarClientes();
                    break;
                case 'editar':
                    await ApiModificarClientes();
                    break;
                default:
                    break;
            }
        }
    });

    useEffect(() => {
        switch (tipo) {
            case 'nuevo':
                ApiCreateClientes()
                return;
            case 'editar':
                ApiEditarCliente()
                return;
            default:
                return;
                break;
        }
    }, [open])
    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {editProduct && data ? "Editar cliente" : "Añadir cliente"}
        </H2>

        <form onSubmit={handleSubmit}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Grid container spacing={2}>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>CI - NIT</H6>
                        <AppTextField fullWidth size="small" name="ci" placeholder="CI - nit" value={values.ci} onChange={handleChange} error={Boolean(touched.ci && errors.ci)} helperText={touched.ci && errors.ci} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Codigo</H6>
                        <AppTextField fullWidth size="small" name="codigoCliente" placeholder="Codigo" value={values.codigoCliente} onChange={handleChange} error={Boolean(touched.codigoCliente && errors.codigoCliente)} helperText={touched.codigoCliente && errors.codigoCliente} />
                    </Grid>

                    <Grid item sm={12} xs={12}>
                        <H6 mb={1}>Nombre completo</H6>
                        <AppTextField fullWidth size="small" name="nombreCliente" placeholder="Nombre" value={values.nombreCliente} onChange={handleChange} error={Boolean(touched.nombreCliente && errors.nombreCliente)} helperText={touched.nombreCliente && errors.nombreCliente} />
                    </Grid>

                    <Grid item xs={12}>
                        <H6 mb={1}>Email</H6>
                        <AppTextField fullWidth multiline rows={1} name="correoElectronico" placeholder="Email" value={values.correoElectronico} onChange={handleChange} error={Boolean(touched.correoElectronico && errors.correoElectronico)} helperText={touched.correoElectronico && errors.correoElectronico} />
                    </Grid>

                    <Grid item xs={12}>
                        <H6 mb={1}>Dirrecion</H6>
                        <AppTextField fullWidth multiline rows={2} name="dirrecion" placeholder="Dirrecion" value={values.dirrecion} onChange={handleChange} error={Boolean(touched.dirrecion && errors.dirrecion)} helperText={touched.dirrecion && errors.dirrecion} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Telefono</H6>
                        <AppTextField fullWidth size="small" name="telefono" placeholder="Telefono" value={values.telefono} onChange={handleChange} error={Boolean(touched.telefono && errors.telefono)} helperText={touched.telefono && errors.telefono} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Linea credito</H6>
                        <AppTextField fullWidth size="small" name="lineaCredito" placeholder="Monto credito" value={values.lineaCredito} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
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

                    </Grid>
                    <Grid item sm={6} xs={12}>
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
                            Save
                        </Button>
                    </FlexBox>
                </Grid>
            </Grid>
        </form>
    </StyledAppModal>;
};

const images = ["/static/products/watch.png", "/static/products/camera.png", "/static/products/headphone.png"];
export default CreateClienteModal;