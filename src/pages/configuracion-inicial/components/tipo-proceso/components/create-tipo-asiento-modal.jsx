import { Button, Grid, IconButton, RadioGroup, styled, Table, TableBody, TableHead, TableRow, TextField, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup"; // component props interface
import { Context } from "contexts/ContextDataTable";
import { UseGuardarTipoAsiento } from "../hooks/UseGuardarTipoAsiento";

// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 600,
    minWidth: 200,
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

const CreateTipoAsientoModal = ({
    open,
    data,
    onClose,
    editProceso,
    tipo,
    id
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const [context, setContext] = useContext(Context);

    const validationSchema = Yup.object().shape({
        nombreTipoAsiento: Yup.string().required("Nombre es requerido!"),
        id: Yup.number().nullable(),
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
        //enableReinitialize: true,
        onSubmit: async (values) => {
            if (editProceso) {

            } else {
                handlerSubmitGuardar(values)
                hadlerClose();
                setContext(true);
                setContext(true)
            }
        }
    });
    useEffect(() => {
        setValues(data);
    }, [data])

    const { handlerSubmitGuardar } = UseGuardarTipoAsiento();

    const hadlerClose = () => {
        onClose();
        resetForm();
    }
    return <StyledAppModal open={open} handleClose={hadlerClose} >
        <H2 marginBottom={2}>
            {editProceso ? "Editar Tipo asiento" : "Tipo asiento"}
        </H2>

        <form onSubmit={(e) => {
            handleSubmit(e)
        }}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Grid container spacing={2}>
                    <Grid item sm={12} xs={12}>
                        <H6 mb={1}>Nombre tipo asiento</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="nombreTipoAsiento"
                            value={values.nombreTipoAsiento}
                            placeholder="Nombre del asiento"
                            onChange={handleChange}
                            error={Boolean(touched.nombreTipoAsiento && errors.nombreTipoAsiento)}
                            helperText={touched.nombreTipoAsiento && errors.nombreTipoAsiento}
                        />
                    </Grid>
                </Grid>
            </Scrollbar>
            <Grid container>
                <Grid item xs={12}>
                    <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                        <Button fullWidth variant="outlined" onClick={hadlerClose}>
                            Cancelar
                        </Button>
                        <Button fullWidth type="submit" variant="contained"  >
                            Guardar
                        </Button>
                    </FlexBox>
                </Grid>
            </Grid>
        </form>
    </StyledAppModal >;
};

export default CreateTipoAsientoModal;