import { Autocomplete, Box, Button, Grid, IconButton, RadioGroup, styled, Table, TableBody, TableHead, TableRow, TextField, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { FieldArray, FormikProvider, useFormik, Form } from "formik";
import { t } from "i18next";
import Add from "icons/Add";
import { BodyTableCell, HeadTableCell } from "page-sections/accounts/account/common/StyledComponents";

import React, { useEffect, useState } from "react";
import * as Yup from "yup"; // component props interface
import { initialAsiento } from "../utils/utilsProceso";
import AsientoCuenta from "./asientoPlancuenta";
import AutocompleteAsync from "components/AutocompleteAsync";
import { useAutocompleteTipoProceso } from "../hooks/useProceso";

// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 900,
    minWidth: 400,
    outline: "none",
    padding: "1.5rem"
}));

const CreateProcesoModal = ({
    open,
    data,
    tipo,
    onEnviar,
    onClose
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const [select, setSelect] = useState(null);

    const {
        LoadListaTipoProceso,
        getOptionLabelTipoProceso,
        isOptionEqualToValueTipoProceso,
        listaTipoProceso,
        loadingAutoCompleteTipoProceso,
        openAutoCompleteTipoProceso,
        refresListaTipoProceso
    } = useAutocompleteTipoProceso()

    const formAsiento = useFormik({
        initialValues: initialAsiento,
        validationSchema: Yup.object().shape({
            asiento: Yup.object().shape({
                id: Yup.number(),
                nombreAsiento: Yup.string(),
                tipoasientoId: Yup.number().nullable(),
            }),
            tipoAsiento: Yup.object().shape({
                id: Yup.number(),
                nombreTipoAsiento: Yup.string()
            }),
            asientoPlanCuenta: Yup.array().of(
                Yup.object().shape({
                    id: Yup.number(),
                    asientoId: Yup.number(),
                    rol: Yup.string().nullable(),
                    vPlanCuenta: Yup.object().shape({
                        id: Yup.number(),
                        codigo: Yup.string(),
                        nombreCuenta: Yup.string().nullable(),
                        moneda: Yup.string().nullable(),
                        valor: Yup.number().nullable(),
                        codigoIdentificador: Yup.string().nullable(),
                        nivel: Yup.number().nullable(),
                        debe: Yup.number().nullable(),
                        haber: Yup.number().nullable(),
                        vPlanCuentaId: Yup.number().nullable(),
                    }),
                })
            )
        }),
        onSubmit: async (values) => {
            onEnviar(values);
            resetForm();
        }
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
    } = formAsiento;

    const handleAddItem = () => {
        values.asientoPlanCuenta.push({
            id: 0,
            vPlanCuenta: {
                id: 0,
                codigo: '',
                nombreCuenta: '',
                moneda: '',
                valor: 0,
                codigoIdentificador: '',
                nivel: 0,
                debe: 0,
                haber: 0,
                vPlanCuentaId: 0
            },
            asientoId: 0,
            rol: ''
        });
        setValues({ ...values })
    };

    useEffect(() => {
        setValues(data);
    }, [open])
    return <StyledAppModal open={open} handleClose={onClose} >
        <H2 marginBottom={2}>
            {tipo == 'editar' ? "Editar asiento" : "Añadir asiento"}
        </H2>

        <FormikProvider value={formAsiento}>
            <Form onSubmit={(e) => { console.log(values); console.log(errors); handleSubmit(e) }}>
                <Scrollbar style={{
                    maxHeight: downXl ? 500 : "auto"
                }}>
                    <Grid container spacing={2}>
                        <Grid item sm={6} xs={12}>
                            <H6 mb={1}>Nombre asiento</H6>
                            <AppTextField
                                fullWidth
                                size="small"
                                name="asiento.nombreAsiento"
                                placeholder="Nombre del asiento"
                                value={values.asiento.nombreAsiento}
                                onChange={handleChange}
                                error={Boolean(touched.values?.asiento?.nombreAsiento && errors.values?.asiento?.nombreAsiento)}
                                helperText={touched.values?.asiento?.nombreAsiento && errors.values?.asiento?.nombreAsiento}
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <H6 mb={1}>Tipo asiento</H6>
                            <AutocompleteAsync
                                options={listaTipoProceso}
                                loading={loadingAutoCompleteTipoProceso}
                                open={openAutoCompleteTipoProceso}
                                onOpen={LoadListaTipoProceso}
                                onClose={refresListaTipoProceso}
                                getOptionLabel={getOptionLabelTipoProceso}
                                isOptionEqualToValue={isOptionEqualToValueTipoProceso}
                                name={'tipoAsiento'}
                                label={'Selecione tipo asiento'}
                                value={values.tipoAsiento}
                                onChange={(e, value) => {
                                    if (value != null) {
                                        console.log(value)
                                        setFieldValue(`tipoAsiento`, value)
                                        setFieldValue(`asiento.tipoasientoId`, value.id)
                                    }else{
                                        setFieldValue(`asiento.tipoasientoId`, initialAsiento.tipoAsiento.id)
                                        setFieldValue(`tipoAsiento`,  initialAsiento.tipoAsiento)
                                    }
                                }}
                                helperText={undefined}
                                errors={null}
                                defaultValue={values.tipoAsiento}
                                disabled={false}
                            />
                        </Grid>
                        <Grid item sm={12} xs={12}>
                            <Box my={3}>
                                <Scrollbar autoHide={false}>
                                    <Button
                                        variant="contained"
                                        endIcon={<Add />}
                                        onClick={handleAddItem}
                                    >
                                        {t("Añadir cuenta")}
                                    </Button>
                                    <Table sx={{
                                        minWidth: 700
                                    }}>
                                        <TableHead>
                                            <TableRow>
                                                <HeadTableCell width={200}>Codigo</HeadTableCell>
                                                <HeadTableCell width={400}>Nombre cuenta</HeadTableCell>
                                                <HeadTableCell>Uso</HeadTableCell>
                                                <HeadTableCell>Accion</HeadTableCell>
                                            </TableRow>
                                        </TableHead>

                                        <FieldArray name="asientoPlanCuenta" render={(arrayAsientoPlanCuenta) => {
                                            return (
                                                <TableBody >
                                                    {
                                                        values.asientoPlanCuenta && values.asientoPlanCuenta.length > 0 ? (
                                                            values.asientoPlanCuenta.map((asientoCuenta, index) => {
                                                                return (
                                                                    <AsientoCuenta key={index}
                                                                        dataCodigo={{
                                                                            name: `asientoPlanCuenta[${index}].vPlanCuenta.codigo`,
                                                                            value: values.asientoPlanCuenta[index].vPlanCuenta.codigo,
                                                                            label: "Codigo"
                                                                        }}
                                                                        dataAcction={{
                                                                            delete: () => {
                                                                                arrayAsientoPlanCuenta.remove(index)
                                                                            }
                                                                        }}
                                                                        asientoPlanCuenta={
                                                                            {
                                                                                name: `asientoPlanCuenta[${index}]`,
                                                                                value: values.asientoPlanCuenta[index].vPlanCuenta,
                                                                                label: "Selecione un producto",
                                                                                handleChange: (e, value) => {
                                                                                    console.log('selected producto', value)
                                                                                    if (value != null) {
                                                                                        setFieldValue(`asientoPlanCuenta[${index}].vPlanCuenta`, value)
                                                                                    }
                                                                                },
                                                                                error: Boolean(touched.asientoPlanCuenta?.[index]?.nombreProducto && errors.productos?.[index]?.nombreProducto),
                                                                                helperText: touched.asientoPlanCuenta?.[index]?.nombreProducto && errors.productos?.[index]?.nombreProducto,
                                                                                defaultValue: {
                                                                                    id: 0,
                                                                                    codigo: '',
                                                                                    nombreCuenta: '',
                                                                                    moneda: '',
                                                                                    valor: 0,
                                                                                    codigoIdentificador: '',
                                                                                    nivel: 0,
                                                                                    debe: 0,
                                                                                    haber: 0,
                                                                                    vPlanCuentaId: 0
                                                                                }
                                                                            }
                                                                        }
                                                                        dataRol={
                                                                            {
                                                                                name: `asientoPlanCuenta[${index}].rol`,
                                                                                value: values.asientoPlanCuenta[index].rol,
                                                                                label: "Rol",
                                                                                handleChange: (value) => {
                                                                                    setFieldValue(`asientoPlanCuenta[${index}].rol`, value.target.value)
                                                                                },
                                                                            }
                                                                        }
                                                                    />
                                                                )
                                                            })) : null
                                                    }
                                                </TableBody >
                                            )
                                        }} />
                                    </Table>
                                </Scrollbar>
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
                            <Button fullWidth type="submit" variant="contained"  >
                                Guardar
                            </Button>
                        </FlexBox>
                    </Grid>
                </Grid>
            </Form>
        </FormikProvider>
    </StyledAppModal >;
};

export default CreateProcesoModal;