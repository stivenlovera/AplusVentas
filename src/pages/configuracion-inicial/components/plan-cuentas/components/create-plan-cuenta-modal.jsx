import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, Grid, IconButton, RadioGroup, styled, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup"; // component props interface
import { Context } from "contexts/ContextDataTable";
import { UseGuardarHijoPlanCuenta, UseGuardarPlanCuenta } from "../hooks/useGuardarHIjoPlanCuenta";
import { UseEditarPlanCuenta } from "../hooks/useEditarPlanCuenta";

// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 700,
    minWidth: 300,
    outline: "none",
    padding: "1.5rem"
}));
const ImageDeleteWrapper = styled(FlexRowAlign)(({
    theme
}) => ({
    top: 5,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: "50%",
    position: "absolute",
    backgroundColor: theme.palette.error.main
}));
const ImageUploadWrapper = styled(FlexRowAlign)(({
    theme
}) => ({
    minHeight: 140,
    cursor: "pointer",
    borderRadius: "8px",
    backgroundColor: theme.palette.grey[200]
}));

const CreatePlanCuentaModal = ({
    open,
    data,
    onClose,
    onEnviar,
    tipo
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const [button, setButton] = useState(false);
    /*     const [context, setContext] = useContext(Context); */
    const [selectedMoneda, setSelectedMoneda] = useState("1");

    const handleChangeMoneda = event => {
        setFieldValue('moneda', event.target.value);
        setSelectedMoneda(event.target.value);
    };
    const validationSchema = Yup.object().shape({
        codigo: Yup.string().required("Codigo es requerido!"),
        nombreCuenta: Yup.string().required("Nombre es requerido!"),
        moneda: Yup.string().required("Moneda es requerido!"),
        nombreCuenta: Yup.string().required("Nombre es requerido!"),
        valor: Yup.number().required("valor es requerido"),
        codigoIdentificador: Yup.string().required("codigo es requerido"),
        id: Yup.number().nullable(),
        nivel: Yup.number().required(),
        debe: Yup.number().required("Debe es Requiredo"),
        haber: Yup.number().required("Haber es Requiredo"),
        vPlanCuentaId: Yup.string().required("Plan padre es requerido!")
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
            onEnviar(values)
        }
    });

    useEffect(() => {
        resetForm();
        setValues(data);
    }, [data])

    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {tipo == 'nuevo' || tipo == 'hijo' ? "Añadir Plan cuenta" : "Editar Plan cuenta"}
        </H2>
        <form onSubmit={(w) => {
            console.log(errors)
            handleSubmit(w)
        }}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Grid container spacing={2}>
                    <Grid item sm={4} xs={12}>
                        <H6 mb={1}>Codigo</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="codigo"
                            placeholder="Codigo"
                            value={values.codigo}
                            onChange={handleChange}
                            error={Boolean(touched.codigo && errors.codigo)}
                            helperText={touched.codigo && errors.codigo}
                        /*  disabled={true} */
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <H6 mb={1}>Nivel</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="nivel"
                            placeholder="Nivel"
                            value={values.nivel}
                            onChange={handleChange}
                            error={Boolean(touched.nivel && errors.nivel)}
                            helperText={touched.nivel && errors.nivel} />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <H6 mb={1}>Valor</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="valor"
                            placeholder="Valor"
                            value={values.valor}
                            onChange={handleChange}
                            error={Boolean(touched.valor && errors.valor)}
                            helperText={touched.valor && errors.valor}
                            type="number"
                        />
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <H6 mb={1}>Nombre</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="nombreCuenta"
                            placeholder="Nombre"
                            value={values.nombreCuenta}
                            onChange={handleChange}
                            error={Boolean(touched.nombreCuenta && errors.nombreCuenta)}
                            helperText={touched.nombreCuenta && errors.nombreCuenta} />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <H6 mb={1}>Moneda</H6>
                        <AppTextField select fullWidth size="small" name="moneda" value={values.moneda} onChange={handleChangeMoneda} SelectProps={{
                            native: true,
                            IconComponent: KeyboardArrowDown
                        }}>
                            <option value="1">Boliviano</option>
                            <option value="2">Dolar</option>
                        </AppTextField>

                    </Grid>
                    {/* <Grid item sm={4} xs={12}>
                        <H6 mb={1}>Debe</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="debe"
                            placeholder="Debe"
                            value={values.debe}
                            onChange={handleChange}
                            error={Boolean(touched.debe && errors.debe)}
                            helperText={touched.debe && errors.debe}
                            type="number"
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <H6 mb={1}>Haber</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="haber"
                            placeholder="Haber"
                            value={values.haber}
                            onChange={handleChange}
                            error={Boolean(touched.haber && errors.haber)}
                            helperText={touched.haber && errors.haber}
                            type="number"
                        />
                    </Grid> */}
                </Grid>
            </Scrollbar>
            <Grid container>
                <Grid item xs={12}>
                    <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                        <Button fullWidth variant="outlined" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button fullWidth type="submit" variant="contained" disabled={button} >
                            Guardar
                        </Button>
                    </FlexBox>
                </Grid>
            </Grid>
        </form>
    </StyledAppModal>;
};
export default CreatePlanCuentaModal;