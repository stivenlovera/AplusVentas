
import { Autocomplete, Box, Button, Grid, IconButton, styled, TextField, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { Context } from "contexts/ContextDataTable";
import { FieldArray, useFormik, FormikProvider, Form } from "formik";
import Add from "icons/Add";
import DeleteIcon from "icons/DeleteIcon";
import { useContext, useEffect, useState } from "react";
import { readUploadedFileAsText } from "utils/convertoToBase64";
import * as Yup from "yup"; // component props interface
import { Request } from "utils/http";

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

const CreateProductoModal = ({
    open,
    data,
    onClose,
    editProduct
}) => {
    const { codigoProducto, categorias, productosMaestros, initialState } = data;
    const [context, setContext] = useContext(Context);
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const [selectProductoMaestro, setSelectProductoMaestro] = useState(null)

    const validationSchema = Yup.object().shape({
        productoId: Yup.number().nullable(),
        codigoProducto: Yup.string().min(3, "Es muy corto").required("Codigo es requerido!"),
        codigoBarra: Yup.string().min(3, "Es muy corto").required("Codigo barra es requerido!"),
        productoMaestro: Yup.object().shape({
            productoMaestroId: Yup.number(),
            nombre: Yup.string(),
            categoriaId: Yup.number(),
        }),
        productoMaestroNombre: Yup.string().nullable(),
        nombreProducto: Yup.string().min(3, "Es muy corto").required("Nombre es requerido!"),
        stockActual: Yup.string().nullable(),
        precioCompra: Yup.number('debe ser un numero').required("Precio compra es requerido!"),
        utilidadMin: Yup.number('debe ser un numero').required("Utilidad max es requerido!"),
        precioVentaMin: Yup.number('debe ser un numero').required("Precio venta min es requerido!"),
        utilidadMax: Yup.number('debe ser un numero').required("Utilidad min es requerido!"),
        precioVentaMax: Yup.number('debe ser un numero').required("Precio venta max es requerido!"),
        categoria: Yup.object().shape({
            categoriaId: Yup.number(),
            nombre: Yup.string().min(3, "debe ser mayor a 3 caracteres"),
            izq: Yup.number(),
            der: Yup.number(),
        }),
        imagenes: Yup.array().nullable(),
        atributos: Yup.array()
            .of(Yup.object().shape({
                atributoId: Yup.string(),
                valor: Yup.string().min(3, "debe ser mayor a 3 caracteres"),
            }))
    });
    const formik = useFormik({
        initialValues: initialState,
        validationSchema,
        onSubmit: async (values) => {
            if (editProduct) {
                const { data, message, status } = await Request({
                    endPoint: `${process.env.REACT_APP_API}api/Producto/update/${values.productoId}`,
                    initialValues: [],
                    method: 'put',
                    showError: true,
                    showSuccess: true,
                    values: values
                });
                if (!!status) {
                    onClose()
                }
            } else {
                const { data, message, status } = await Request({
                    endPoint: `${process.env.REACT_APP_API}api/Producto`,
                    initialValues: [],
                    method: 'post',
                    showError: true,
                    showSuccess: true,
                    values: values
                });
                if (!!status) {
                    onClose()
                }
            }
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
        resetForm
    } = formik;

    const calcularPrecioVentaMin = () => {
        let resultado = parseInt(values.precioCompra) + (((values.utilidadMin) / 100) * values.precioCompra);
        setFieldValue('precioVentaMin', resultado);
    }
    const calcularPrecioVentaMax = () => {
        let resultado = parseInt(values.precioCompra) + (((values.utilidadMax) / 100) * values.precioCompra);
        setFieldValue('precioVentaMax', resultado);
    }
    const calcularUtilidadMin = () => {
        let resultado = parseInt(((values.precioVentaMin * 100) / values.precioCompra) - (100));
        setFieldValue('utilidadMin', resultado);
    }
    const calcularUtilidadMax = () => {
        let resultado = parseInt(((values.PrecioVentaMax * 100) / values.precioCompra) - (100));
        setFieldValue('utilidadMax', resultado);
    }

    const onImagenesChange = async (e) => {
        const imagen = await readUploadedFileAsText(e);
        values.imagenes.push(imagen);
        setValues({ ...values })
    }
    const selectFilterProductoMaestro = () => {
        return values.productoMaestro
    }

    const selectFilterCategoria = () => {
        let categoria = categorias.find(x => { return x.categoriaId == values.categoriaId })
        if (categoria == undefined) {
            return null;
        }
        return categoria
    }

    const ApiObtenerAtributo = async (categoriaId) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Atributo/create/${categoriaId}`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        if (!!status) {
            const nuevoAtributos = data.map((atributo) => {
                return {
                    atributoId: atributo.atributoId,
                    valor: '',
                    etiqueta: atributo.etiqueta
                }
            });
            setValues({
                ...values, atributos: nuevoAtributos
            })
        }
    }
    useEffect(() => {
        setValues({ ...initialState, productoMaestroNombre: initialState.productoMaestro.nombre })
    }, [open])

    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {editProduct && data ? "Editar producto" : "Añadir producto"}
        </H2>
        <FormikProvider value={formik}  >
            <Form autoComplete="off" noValidate onSubmit={(e) => { console.log('erroes', errors); handleSubmit(e) }}>
                <Scrollbar style={{
                    maxHeight: 500,
                    overflow: 'auto'
                }}>
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <H6 mb={1}>Codigo</H6>
                            <AppTextField
                                fullWidth
                                size="small"
                                name="codigoProducto"
                                placeholder="Codigo producto"
                                value={values.codigoProducto}
                                onChange={handleChange}
                                error={Boolean(touched.codigoProducto && errors.codigoProducto)}
                                helperText={touched.codigoProducto && errors.codigoProducto}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <H6 mb={1}>Codigo de Barras</H6>
                            <AppTextField
                                fullWidth
                                size="small"
                                name="codigoBarra"
                                placeholder="Codigo de barras"
                                value={values.codigoBarra}
                                onChange={handleChange}
                                error={Boolean(touched.codigoBarra && errors.codigoBarra)}
                                helperText={touched.codigoBarra && errors.codigoBarra}
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <H6 mb={1}>Seleccione un producto maestro</H6>
                            <Autocomplete
                                options={productosMaestros}
                                getOptionLabel={(options) => options.nombre}
                                isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
                                size="small"
                                fullWidth
                                onChange={(event, newValue) => {
                                    if (newValue != null) {
                                        setFieldValue('productoMaestro', newValue)
                                        setFieldValue('productoMaestroNombre', newValue.nombre)
                                    } else {
                                        setFieldValue('productoMaestroNombre', '')
                                    }
                                }}
                                defaultValue={() => {
                                    return {
                                        productoMaestroId: initialState.productoMaestro.productoMaestroId,
                                        nombre: initialState.productoMaestro.nombre,
                                        categoriaId: initialState.productoMaestro.categoriaId,
                                    }
                                }}
                                renderInput={
                                    (params) =>
                                        <TextField
                                            {...params}
                                            value={values.productoMaestroNombre}
                                            label="Selecione un producto maestro (opcional)"
                                            error={Boolean(touched.productoMaestro && errors.productoMaestro)}
                                            helperText={touched.productoMaestro && errors.productoMaestro}
                                        />}
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <H6 mb={1}>Nombre producto maestro</H6>
                            <AppTextField
                                fullWidth
                                size="small"
                                name="productoMaestroNombre"
                                placeholder="Nombre producto maestro"
                                value={values.productoMaestroNombre}
                                onChange={handleChange}
                                error={Boolean(touched.productoMaestroNombre && errors.productoMaestroNombre)}
                                helperText={touched.productoMaestroNombre && errors.productoMaestroNombre}
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <H6 mb={1}>Nombre producto</H6>
                            <AppTextField
                                fullWidth
                                size="small"
                                name="nombreProducto"
                                placeholder="Nombre producto"
                                value={values.nombreProducto}
                                onChange={handleChange}
                                error={Boolean(touched.nombreProducto && errors.nombreProducto)}
                                helperText={touched.nombreProducto && errors.nombreProducto}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <H6 mb={1}>Stock Actual</H6>
                            <AppTextField
                                fullWidth
                                size="small"
                                name="stockActual"
                                type="number"
                                placeholder="Stock actual"
                                value={values.stockActual}
                                onChange={handleChange}
                                error={Boolean(touched.stockActual && errors.stockActual)}
                                helperText={touched.stockActual && errors.stockActual}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <H6 mb={1}>% Utilidad min</H6>
                            <AppTextField
                                fullWidth
                                size="small"
                                name="utilidadMin"
                                type="number"
                                placeholder="% Utilidad mi"
                                value={values.utilidadMin}
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                                onKeyUp={
                                    (e) => {
                                        calcularPrecioVentaMin()
                                        console.log(e.target.value)
                                    }
                                }
                                error={Boolean(touched.utilidadMin && errors.utilidadMin)}
                                helperText={touched.utilidadMin && errors.utilidadMin}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <H6 mb={1}>Precio venta min</H6>
                            <AppTextField
                                fullWidth
                                size="small"
                                name="precioVentaMin"
                                type="number"
                                placeholder="Precio venta min"
                                value={values.precioVentaMin}
                                onChange={handleChange}
                                onKeyUp={
                                    (e) => {
                                        calcularUtilidadMin()
                                        console.log(e.target.value)
                                    }
                                }
                                error={Boolean(touched.precioVentaMin && errors.precioVentaMin)}
                                helperText={touched.precioVentaMin && errors.precioVentaMin}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <H6 mb={1}>Precio compra</H6>
                            <AppTextField
                                fullWidth
                                size="small"
                                name="precioCompra"
                                type="number"
                                placeholder="precio compra"
                                value={values.precioCompra}
                                onChange={handleChange}
                                onKeyUp={
                                    (e) => {
                                        //calcularUtilidadMin()
                                        console.log(e.target.value)
                                    }
                                }
                                error={Boolean(touched.precioCompra && errors.precioCompra)}
                                helperText={touched.precioCompra && errors.precioCompra}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <H6 mb={1}>% Utilidad max</H6>
                            <AppTextField
                                fullWidth
                                size="small"
                                name="utilidadMax"
                                type="number"
                                placeholder="% Utilidad max"
                                value={values.utilidadMax}
                                onChange={handleChange}
                                onKeyUp={
                                    (e) => {
                                        calcularPrecioVentaMax()
                                        console.log(e.target.value)
                                    }
                                }
                                error={Boolean(touched.utilidadMax && errors.utilidadMax)}
                                helperText={touched.utilidadMax && errors.utilidadMax}
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <H6 mb={1}>Precio venta max</H6>
                            <AppTextField
                                fullWidth
                                size="small"
                                name="precioVentaMax"
                                type="number"
                                placeholder="Categoria"
                                value={values.precioVentaMax}
                                onChange={handleChange}
                                onKeyUp={
                                    (e) => {
                                        calcularUtilidadMax()
                                        console.log(e.target.value)
                                    }
                                }
                                error={Boolean(touched.PrecioVentaMax && errors.PrecioVentaMax)}
                                helperText={touched.PrecioVentaMax && errors.PrecioVentaMax}
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <H6 mb={1}>Categoria</H6>
                            <Autocomplete
                                fullWidth
                                id="categoria"
                                options={categorias}
                                getOptionLabel={(options) => options.nombre}
                                size="small"
                                onChange={async (event, newValue) => {
                                    if (newValue != null) {
                                        await ApiObtenerAtributo(newValue.categoriaId);
                                        setFieldValue('categoria', newValue);
                                    } else {
                                        setFieldValue('categoria', initialState)
                                        setFieldValue('atributos', [])
                                    }
                                }}
                                defaultValue={() => {
                                    return {
                                        categoriaId: initialState.categoria.categoriaId,
                                        nombre: initialState.categoria.nombre,
                                        der: initialState.categoria.der,
                                        izq: initialState.categoria.izq
                                    }
                                }}
                                renderInput={
                                    (params) =>
                                        <TextField
                                            {...params}
                                            value={values.categoriaId}
                                            label="Seleccione una categoria"
                                            error={Boolean(touched.categoriaId && errors.categoriaId)}
                                            helperText={touched.categoriaId && errors.categoriaId}
                                        />}
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <FieldArray
                                name="atributos"
                                render={arrayHelpers => {
                                    const atributos = values.atributos;
                                    return (
                                        <Grid container spacing={2}>
                                            {atributos && atributos.length > 0 ? (
                                                atributos.map((atributo, index) => {
                                                    return (
                                                        <Grid item sm={12} xs={12} key={index}>
                                                            <AppTextField
                                                                fullWidth
                                                                size="small"
                                                                name={`atributos[${index}].valor`}
                                                                placeholder={atributos[index].etiqueta}
                                                                value={atributos[index].valor}
                                                                onChange={handleChange}
                                                            /* error={Boolean(touched.atributos && errors.atributos)}
                                                            helperText={touched.atributos && errors.atributos} */
                                                            />

                                                            {/* <button
                                                            type="button"
                                                            onClick={() => arrayHelpers.remove(index)} // remove a amenity from the list
                                                        >
                                                        </button> */}
                                                        </Grid>
                                                    )
                                                })) : null
                                            }
                                            {/* <button type="button" onClick={() => {
                                            arrayHelpers.push({
                                                atributoId: 0,
                                                valor: "",
                                            })
                                        }}>
                                            Add a Amenity
                                        </button> */}
                                        </Grid>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <H6 pb={1}>Imagenes de producto</H6>
                            <Box sx={{
                                padding: 1,
                                borderRadius: "8px",
                                border: "1px dashed",
                                borderColor: "text.disabled",
                                backgroundColor: "grey.100"
                            }}>
                                <Grid container spacing={1}>
                                    <FieldArray
                                        name="imagenes"
                                        render={arrayImagenes => {
                                            const imagenes = values.imagenes;
                                            return (
                                                <Grid container spacing={2}>
                                                    {imagenes && imagenes.length > 0 ? (
                                                        imagenes.map((imagen, i) => {
                                                            return (
                                                                <Grid item sm={3} xs={4} key={i}>
                                                                    <Box sx={{
                                                                        minHeight: 140,
                                                                        borderRadius: "8px",
                                                                        overflow: "hidden",
                                                                        position: "relative"
                                                                    }}>
                                                                        <img src={imagen} width="100%" height="100%" alt={imagen} />
                                                                        <ImageDeleteWrapper>
                                                                            <IconButton
                                                                                onClick={() => { arrayImagenes.remove(i) }}
                                                                            >
                                                                                <DeleteIcon
                                                                                    sx={{
                                                                                        fontSize: 12,
                                                                                        color: "white"
                                                                                    }}
                                                                                />
                                                                            </IconButton>
                                                                        </ImageDeleteWrapper>
                                                                    </Box>
                                                                </Grid>
                                                            )
                                                        })) : null
                                                    }
                                                    <Grid item sm={3} xs={4}>
                                                        <label htmlFor="image-upload">
                                                            <input type="file" accept="image/*" id="image-upload"
                                                                style={{
                                                                    display: "none"
                                                                }}
                                                                onChange={onImagenesChange}
                                                            />
                                                            <ImageUploadWrapper textAlign="center">
                                                                <Box>
                                                                    <Add color="disabled" />
                                                                    <Small fontWeight={600} display="block">
                                                                        Choose a file
                                                                    </Small>
                                                                    <Small fontWeight={600} color="text.disabled">
                                                                        or drag it here
                                                                    </Small>
                                                                </Box>
                                                            </ImageUploadWrapper>
                                                        </label>
                                                    </Grid>
                                                </Grid>
                                            )
                                        }}
                                    />
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                </Scrollbar>
                <Grid container>
                    <Grid item xs={12}>
                        <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                            <Button fullWidth variant="outlined" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button fullWidth type="submit" variant="contained">
                                guardar
                            </Button>
                        </FlexBox>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    </StyledAppModal>;
};

export default CreateProductoModal;