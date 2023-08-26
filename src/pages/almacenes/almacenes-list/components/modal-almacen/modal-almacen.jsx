import { Add } from "@mui/icons-material";
import { Button, Grid, IconButton, styled, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import { useEffect } from "react";
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

const ModalAlmacen = ({
    open,
    data,
    onClose,
    editProduct,
    onSubmit
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const {
        resetForm,
        setValues,
        values,
        errors,
        handleChange,
        handleSubmit,
        touched
    } = useFormik({
        initialValues: data,
        validationSchema: Yup.object().shape({
            id: Yup.number(),
            codigoAlmacen: Yup.string().required("Codigo es requerido!"),
            dirrecion: Yup.string().required("Direccion es requerido!"),
            nombreAlmacen: Yup.string().required("Nombre es requerido!")
        }),
        onSubmit: values => {
            onSubmit(values)
        }
    });
    useEffect(() => {
        resetForm()
        setValues(data)
    }, [open])

    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {editProduct && data ? "Editar Almacen" : "Añadir Almacen"}
        </H2>
        <form onSubmit={handleSubmit}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Codigo</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="codigoAlmacen"
                            placeholder="Codigo"
                            value={values.codigoAlmacen}
                            onChange={handleChange}
                            error={Boolean(touched.codigoAlmacen && errors.codigoAlmacen)}
                            helperText={touched.codigoAlmacen && errors.codigoAlmacen}
                        />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Nombre</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="nombreAlmacen"
                            placeholder="Nombre"
                            value={values.nombreAlmacen}
                            onChange={handleChange}
                            error={Boolean(touched.nombreAlmacen && errors.nombreAlmacen)}
                            helperText={touched.nombreAlmacen && errors.nombreAlmacen}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <H6 mb={1}>Dirrecion</H6>
                        <AppTextField
                            fullWidth
                            multiline
                            rows={3}
                            name="dirrecion"
                            placeholder="Direccion"
                            value={values.dirrecion}
                            onChange={handleChange}
                            error={Boolean(touched.dirrecion && errors.dirrecion)}
                            helperText={touched.dirrecion && errors.dirrecion}
                        />
                    </Grid>
                </Grid>
            </Scrollbar>
            <Grid container>
                <Grid item xs={12}>
                    <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                        >
                            Save
                        </Button>
                    </FlexBox>
                </Grid>
            </Grid>
        </form>
    </StyledAppModal>;
};
export default ModalAlmacen;