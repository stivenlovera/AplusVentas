
import { Autocomplete, Box, Button, Grid, IconButton, styled, TextField, useMediaQuery } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { Context } from "contexts/ContextDataTable";
import { useFormik } from "formik";
import Add from "icons/Add";
import DeleteIcon from "icons/DeleteIcon";
import { useContext, useLayoutEffect, useState } from "react";
import { obtenerClasificacionIdService } from "Services/api-ventas-erp/categoria";
import { CrearProductoService, EditarProductoService, GuardarProductoService } from "Services/api-ventas-erp/proveedorService";
import { fileGetBase64, readUploadedFileAsText } from "utils/convertoToBase64";

import * as Yup from "yup"; // component props interface

// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 1200,
    minWidth: 600,
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
    editProduct,
    tipo,
    id
}) => {
    const [context, setContext] = useContext(Context);
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const [precioMin, setPrecioMin] = useState(0)
    const initialState = {
        id: 0,
        codigoProducto: '',
        codigoBarra: '',
        nombreProducto: '',
        unidadMedida: '',
        precioCompra: 0,
        utilidadMin: 0,
        stockMinimo: 0,
        PrecioVentaMin: 0,
        utilidadMax: 0,
        PrecioVentaMax: 0,
        proveedorId: '',
        proveedor: '',
        categoriaId: '',
        grupoId: '',
        marcaId: '',
        modeloId: '',
        categoria: '',
        grupo: '',
        marca: '',
        modelo: '',
        imagenes: []
    };

    const validationSchema = Yup.object().shape({
        id: Yup.number().nullable(),
        codigoProducto: Yup.string().min(3, "Es muy corto").required("Codigo es requerido!"),
        codigoBarra: Yup.string().min(3, "Es muy corto").required("Codigo barra es requerido!"),
        nombreProducto: Yup.string().min(3, "Es muy corto").required("Nombre es requerido!"),
        unidadMedida: Yup.string().required("Unidad medida es requerido!"),
        stockMinimo: Yup.string().required("Stock minimo requerido!"),
        precioCompra: Yup.number('debe ser un numero').required("Precio compra es requerido!"),
        utilidadMin: Yup.number('debe ser un numero').required("Utilidad max es requerido!"),
        PrecioVentaMin: Yup.number('debe ser un numero').required("Precio venta min es requerido!"),
        utilidadMax: Yup.number('debe ser un numero').required("Utilidad min es requerido!"),
        PrecioVentaMax: Yup.number('debe ser un numero').required("Precio venta max es requerido!"),
        proveedorId: Yup.string().required("Proveedores es requerido!"),
        proveedor: Yup.string().nullable(),
        categoriaId: Yup.number().nullable(),
        grupoId: Yup.number().nullable(),
        marcaId: Yup.number(),//.required("Marca es requerido!"),
        modeloId: Yup.number(),//.required("Modelo es requerido!"),
        categoria: Yup.string().nullable(),
        grupo: Yup.string().nullable(),
        marca: Yup.string().nullable(),
        modelo: Yup.string().nullable(),
        imagenes: Yup.array()
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
    } = useFormik({
        initialValues: initialState,
        validationSchema,
        onSubmit: values => {
            setValues({ ...values, imagenes: imagenes })
            console.log(values);
            console.log(imagenes)
            switch (tipo) {
                case 'nuevo':
                    ApiInsertProducto();
                    break;
                case 'editar':

                    break
                default:
                    break;
            }
        }
    });
    const [optionProveedor, setOptionProveedor] = useState([]);
    const [optionCategoria, setOptionCategoria] = useState([]);
    const [optionGrupo, setOptionGrupo] = useState([])
    const [optionMarca, setOptionMarca] = useState([])
    const [optionModelo, setOptionModelo] = useState([])
    const [imagenes, setImagen] = useState([]);

    const onImagenChange = async (e) => {
        console.log('data entrante ', e);
        let imagen = await readUploadedFileAsText(e);
        console.log(imagen)
        setValues({ ...values, imagenes: imagenes })
        setImagen([...imagenes, imagen]);

    }
    const onImagenRemove = (i) => {
        var nuevo = []
        imagenes.forEach((element, index) => {
            if (index != i) {
                nuevo.push(element)
            }
        });
        setValues({ ...values, imagenes: nuevo })
        setFieldValue('imagenes', nuevo)

    }
    const calcularPrecioVentaMin = () => {
        let resultado = parseInt(values.precioCompra) + (((values.utilidadMin) / 100) * values.precioCompra);
        setFieldValue('PrecioVentaMin', resultado);
    }
    const calcularPrecioVentaMax = () => {
        let resultado = parseInt(values.precioCompra) + (((values.utilidadMax) / 100) * values.precioCompra);
        setFieldValue('PrecioVentaMax', resultado);
    }
    const calcularUtilidadMin = () => {
        let resultado = parseInt(((values.PrecioVentaMin * 100) / values.precioCompra) - (100));
        setFieldValue('utilidadMin', resultado);
    }
    const calcularUtilidadMax = () => {
        let resultado = parseInt(((values.PrecioVentaMax * 100) / values.precioCompra) - (100));
        setFieldValue('utilidadMax', resultado);
    }
    const ApiCrearProducto = async () => {
        const { data } = await CrearProductoService();
        console.log(data.data)
        setOptionProveedor(data.data.proveedores)
        setValues({ ...initialState, codigoProducto: data.data.codigo })
        setOptionCategoria(data.data.categorias);
    }
    const ApiEditarProducto = async () => {
        const { data } = await EditarProductoService(id);
        setOptionProveedor(data.data.proveedores)
        setOptionCategoria(data.data.categorias)
        console.log(data.data.proveedores)
        console.log(data.data.categorias)
        setImagen(data.data.imagenes);
        setValues({ ...data.data.producto });
    }
    const ApiModificarProducto = async () => {
        const { data } = await EditarProductoService(id);
        setValues({ ...data.data.clasificacion })
    }
    const ApiInsertProducto = async () => {
        const { data } = await GuardarProductoService(values);
        console.log(data.data)
        resetForm();
        onClose();
        setContext(true)
    }

    const ApiClasificacionPorId = async (clasificacionId) => {
        const { data } = await obtenerClasificacionIdService(clasificacionId);
        setOptionGrupo(data.data);
    }
    useLayoutEffect(() => {
        console.log(tipo)
        switch (tipo) {
            case 'nuevo':
                ApiCrearProducto();
                break;
            case 'editar':
                ApiEditarProducto();
                break
            default:
                break;
        }
        return () => {

        };
    }, [open])

    return <StyledAppModal open={open} handleClose={onClose}>
        <H2 marginBottom={2}>
            {editProduct && data ? "Editar producto" : "Añadir producto"}
        </H2>

        <form onSubmit={(e) => { console.log(errors); handleSubmit(e) }}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
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
                        <H6 mb={1}>Nombre</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="nombreProducto"
                            placeholder="Nombre"
                            value={values.productName}
                            onChange={handleChange}
                            error={Boolean(touched.nombreProducto && errors.nombreProducto)}
                            helperText={touched.nombreProducto && errors.nombreProducto}
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <H6 mb={1}>Stock minimo</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="stockMinimo"
                            type="number"
                            placeholder="Stock minimo"
                            value={values.stockMinimo}
                            onChange={handleChange}
                            error={Boolean(touched.stockMinimo && errors.stockMinimo)}
                            helperText={touched.stockMinimo && errors.stockMinimo}
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <H6 mb={1}>Unidad Medida</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="unidadMedida"
                            placeholder="Unidad Medida"
                            value={values.unidadMedida}
                            onChange={handleChange}
                            error={Boolean(touched.unidadMedida && errors.unidadMedida)}
                            helperText={touched.unidadMedida && errors.unidadMedida}
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>

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
                            name="PrecioVentaMin"
                            type="number"
                            placeholder="Precio venta min"
                            value={values.PrecioVentaMin}
                            onChange={handleChange}
                            onKeyUp={
                                (e) => {
                                    calcularUtilidadMin()
                                    console.log(e.target.value)
                                }
                            }
                            error={Boolean(touched.PrecioVentaMin && errors.PrecioVentaMin)}
                            helperText={touched.PrecioVentaMin && errors.PrecioVentaMin}
                        />
                    </Grid>
                    <Grid item sm={4} xs={12}>
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
                            name="PrecioVentaMax"
                            type="number"
                            placeholder="Categoria"
                            value={values.PrecioVentaMax}
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
                        <H6 mb={1}>Proveedor</H6>
                        <Autocomplete
                            disablePortal
                            id="combo-box-proveedor"
                            options={optionProveedor}
                            getOptionLabel={(options) => options.nombreProveedor}
                            size="small"
                            onChange={(event, newValue) => {
                                if (newValue != null) {
                                    setFieldValue('proveedorId', newValue.id)
                                } else {
                                    setFieldValue('proveedorId', initialState.id)
                                }
                            }}
                            renderInput={
                                (params) =>
                                    <TextField
                                        {...params}
                                        value={values.proveedorId}
                                        label="Proveedores"
                                        error={Boolean(touched.proveedorId && errors.proveedorId)}
                                        helperText={touched.proveedorId && errors.proveedorId}
                                    />}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Categoria</H6>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={optionCategoria}
                            getOptionLabel={(options) => options.nombreClasificacion}
                            size="small"
                            onChange={(event, newValue) => {
                                if (newValue != null) {
                                    setFieldValue('categoriaId', newValue.id);
                                    ApiClasificacionPorId(newValue.id);
                                } else {
                                    setFieldValue('categoriaId', initialState.id)
                                }
                            }}
                            renderInput={
                                (params) =>
                                    <TextField
                                        {...params}
                                        value={values.categoria}
                                        label="Grupo"
                                        error={Boolean(touched.categoriaId && errors.categoriaId)}
                                        helperText={touched.categoriaId && errors.categoriaId}
                                    />}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Grupo</H6>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={optionGrupo}
                            getOptionLabel={(options) => options.nombreClasificacion}
                            size="small"
                            onChange={(event, newValue) => {
                                if (newValue != null) {
                                    setFieldValue('grupoId', newValue.id);
                                    ApiClasificacionPorId(newValue.id);
                                } else {
                                    setFieldValue('grupoId', initialState.id)
                                }
                            }}
                            renderInput={
                                (params) =>
                                    <TextField
                                        {...params}
                                        value={values.grupoId}
                                        label="Grupo"
                                        error={Boolean(touched.grupoId && errors.grupoId)}
                                        helperText={touched.grupoId && errors.grupoId}
                                    />}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Marca</H6>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            getOptionLabel={(options) => options.nombreClasificacion}
                            options={optionMarca}
                            size="small"
                            onChange={(event, newValue) => {
                                if (newValue != null) {
                                    setFieldValue('marcaId', newValue.id);
                                    ApiClasificacionPorId(newValue.id);
                                } else {
                                    setFieldValue('marcaId', initialState.id)
                                }
                            }}
                            renderInput={
                                (params) =>
                                    <TextField
                                        {...params}
                                        value={values.marcaId}
                                        label="Marca"
                                        error={Boolean(touched.marcaId && errors.marcaId)}
                                        helperText={touched.marcaId && errors.marcaId}
                                    />}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Modelo</H6>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            getOptionLabel={(options) => options.nombreClasificacion}
                            options={optionModelo}
                            size="small"
                            onChange={(event, newValue) => {
                                if (newValue != null) {
                                    setFieldValue('modeloId', newValue.id);
                                    ApiClasificacionPorId(newValue.id);
                                } else {
                                    setFieldValue('modeloId', initialState.id)
                                }
                            }}
                            renderInput={
                                (params) =>
                                    <TextField
                                        {...params}
                                        value={values.modeloId}
                                        label="Modelo"
                                        error={Boolean(touched.modeloId && errors.modeloId)}
                                        helperText={touched.modeloId && errors.modeloId}
                                    />}
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
                                {imagenes.map((item, i) =>
                                    <Grid item sm={3} xs={4} key={i}>
                                        <Box sx={{
                                            minHeight: 140,
                                            borderRadius: "8px",
                                            overflow: "hidden",
                                            position: "relative"
                                        }}>
                                            <img src={item} width="100%" height="100%" alt={item} />
                                            <ImageDeleteWrapper>
                                                <IconButton
                                                    onClick={() => { onImagenRemove(i) }}
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
                                )}
                                <Grid item sm={3} xs={4}>
                                    <label htmlFor="image-upload">
                                        <input type="file" accept="image/*" id="image-upload"
                                            style={{
                                                display: "none"
                                            }}
                                            onChange={onImagenChange}
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
                        </Box>
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

export default CreateProductoModal;