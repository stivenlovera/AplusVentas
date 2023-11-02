
import { Autocomplete, Box, Button, Grid, IconButton, styled, TextField, Typography, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H1, H2, H6, Small } from "components/Typography";
import { Context } from "contexts/ContextDataTable";
import { FieldArray, useFormik, FormikProvider, Form } from "formik";
import Add from "icons/Add";
import DeleteIcon from "icons/DeleteIcon";
import { useContext, useEffect, useState } from "react";
import { readUploadedFileAsText } from "utils/convertoToBase64";
import * as Yup from "yup"; // component props interface
import { Request } from "utils/http";
import AppTextField2 from "components/formikComponents/AppTextField2";
import React from 'react';
import { AutocompleteObject } from "components/formikComponents/AutoCompleteObject";

// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: '90vw',
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
    editProduct = false
}) => {
    const { codigoProducto, categorias, productosMaestros, tiposProducto, initialState } = data;
    const [context, setContext] = useContext(Context);
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const [selectProductoMaestro, setSelectProductoMaestro] = useState(null)
    const ingredientevalue = useState([])

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
        tipoProductoId: Yup.number().required("tipo de producto es requerido!"),
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
            })),

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
                console.log(values)
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
        console.log(values.precioVentaMin)
        let resultado = ((values.precioVentaMin * 100) / values.precioCompra) - 100;
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
                    <text>
                        {JSON.stringify(values)}
                    </text>
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <AppTextField2
                                name="codigoProducto"
                                placeholder="Codigo producto"

                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <AppTextField2
                                name="codigoBarra"
                                placeholder="Codigo de barras"
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <AutocompleteObject
                                label='Selecione un producto maestro (opcional)'
                                name='productoMaestro'
                                options={productosMaestros}
                                labelName='nombre'
                                onChange={(event, newValue) => {
                                    if (newValue) setFieldValue('productoMaestroNombre', newValue.nombre)
                                    else setFieldValue('productoMaestroNombre', '')

                                    handleChange(event);
                                }}
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <AppTextField2
                                name="productoMaestroNombre"
                                placeholder="Nombre producto maestro"
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <AppTextField2
                                name="nombreProducto"
                                placeholder="Nombre producto"
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <AppTextField2
                                name="stockActual"
                                type="number"
                                placeholder="Stock actual"
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <AppTextField2
                                name="utilidadMin"
                                type="number"
                                placeholder="% Utilidad min"
                                onKeyUp={
                                    (e) => {
                                        calcularPrecioVentaMin()
                                        console.log(e.target.value)
                                    }
                                }
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <AppTextField2
                                name="precioVentaMin"
                                type="number"
                                placeholder="Precio venta min"
                                onKeyUp={
                                    (e) => {
                                        calcularUtilidadMin()
                                    }
                                } />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <AppTextField2
                                name="precioCompra"
                                type="number"
                                placeholder="Precio compra"
                                onKeyUp={
                                    (e) => {
                                        //calcularUtilidadMin()
                                        console.log(e.target.value)
                                    }
                                }
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <AppTextField2
                                name="utilidadMax"
                                type="number"
                                placeholder="% Utilidad max"
                                onKeyUp={
                                    (e) => {
                                        calcularPrecioVentaMax()
                                    }
                                }
                            />
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            <AppTextField2
                                name="precioVentaMax"
                                type="number"
                                placeholder="Precio venta max"
                                onKeyUp={
                                    (e) => {
                                        calcularUtilidadMax()
                                    }
                                }
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <AutocompleteObject
                                label='seleccione categoria'
                                labelUndefined='elija la categoria'
                                labelName='nombre'
                                name="categoria"
                                options={categorias}
                                onChange={async (event, newValue) => {
                                    if (newValue != null) {
                                        await ApiObtenerAtributo(newValue.categoriaId);
                                        setFieldValue('categoria', newValue);
                                    } else {
                                        setFieldValue('categoria', initialState)
                                        setFieldValue('atributos', [])
                                    }
                                }}
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
                            <Button fullWidth variant="outlined" onClick={(e) => {
                                onClose(e)

                            }}>
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