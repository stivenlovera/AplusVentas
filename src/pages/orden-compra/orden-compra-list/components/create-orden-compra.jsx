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
import DeleteIcon from "icons/DeleteIcon";
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

const CreateOrdenCompraModal = ({
    open,
    data,
    onClose,
    editProduct
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const initialValues = {
        productName: "",
        storeName: "",
        price: "",
        discountPrice: "",
        description: "",
        category: "",
        tags: "",
        stock: "",
        sku: "",
        images: ""
    };
    const validationSchema = Yup.object().shape({
        productName: Yup.string().min(3, "Too Short").required("Product Name is Required!"),
        storeName: Yup.string().required("Store Name is Required!"),
        price: Yup.number().required("Price is Required!"),
        description: Yup.string().required("Description is Required!"),
        category: Yup.string().required("Category is Required!"),
        stock: Yup.number().required("Stock is Required!"),
        sku: Yup.string().required("SKU is Required!")
    });
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        touched
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            console.log(values);
        }
    });
    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {editProduct && data ? "Editar orden compra" : "Añadir orden compra"}
        </H2>

        <form onSubmit={handleSubmit}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Grid container spacing={2}>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Codigo</H6>
                        <AppTextField fullWidth size="small" name="codigo" placeholder="Codigo" value={values.productName} onChange={handleChange} error={Boolean(touched.productName && errors.productName)} helperText={touched.productName && errors.productName} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Fecha</H6>
                        <AppTextField fullWidth size="small" name="fecha" placeholder="Fecha" value={values.productName} onChange={handleChange} error={Boolean(touched.productName && errors.productName)} helperText={touched.productName && errors.productName} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Estado</H6>
                        <AppTextField fullWidth size="small" name="estado" placeholder="Estado" value={values.storeName} onChange={handleChange} error={Boolean(touched.storeName && errors.storeName)} helperText={touched.storeName && errors.storeName} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Usuario</H6>
                        <AppTextField fullWidth size="small" name="usuario" placeholder="Usuario" value={values.description} onChange={handleChange} error={Boolean(touched.description && errors.description)} helperText={touched.description && errors.description} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Proveedor</H6>
                        <AppTextField fullWidth size="small" name="proveedor" placeholder="Proveedor" value={values.storeName} onChange={handleChange} error={Boolean(touched.storeName && errors.storeName)} helperText={touched.storeName && errors.storeName} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Codigo Producto</H6>
                        <AppTextField fullWidth size="small" name="codigoProducto" placeholder="Codigo producto" value={values.storeName} onChange={handleChange} error={Boolean(touched.storeName && errors.storeName)} helperText={touched.storeName && errors.storeName} />
                    </Grid>

                    <Grid item sm={12} xs={12}>
                        <H6 mb={1}>Producto</H6>
                        <AppTextField fullWidth size="small" name="producto" placeholder="Producto" value={values.storeName} onChange={handleChange} error={Boolean(touched.storeName && errors.storeName)} helperText={touched.storeName && errors.storeName} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Cantidad</H6>
                        <AppTextField fullWidth size="small" name="cantidad" placeholder="Cantidad" value={values.storeName} onChange={handleChange} error={Boolean(touched.storeName && errors.storeName)} helperText={touched.storeName && errors.storeName} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Precio compra</H6>
                        <AppTextField fullWidth size="small" name="precioCompra" placeholder="Precio compra" value={values.storeName} onChange={handleChange} error={Boolean(touched.storeName && errors.storeName)} helperText={touched.storeName && errors.storeName} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Total compra</H6>
                        <AppTextField fullWidth size="small" name="totalCompra" placeholder="Total compra" value={values.storeName} onChange={handleChange} error={Boolean(touched.storeName && errors.storeName)} helperText={touched.storeName && errors.storeName} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Almacen Destino</H6>
                        <AppTextField fullWidth size="small" name="almacenDestino" placeholder="Almacen Destino" value={values.storeName} onChange={handleChange} error={Boolean(touched.storeName && errors.storeName)} helperText={touched.storeName && errors.storeName} />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Facturado</H6>
                        <AppTextField fullWidth size="small" name="facturado" placeholder="Facturado" value={values.storeName} onChange={handleChange} error={Boolean(touched.storeName && errors.storeName)} helperText={touched.storeName && errors.storeName} />
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
export default CreateOrdenCompraModal;