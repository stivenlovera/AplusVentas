import { KeyboardArrowDown } from "@mui/icons-material";
import { Autocomplete, Box, Button, Grid, IconButton, RadioGroup, styled, Table, TableBody, TableHead, TableRow, TextField, useMediaQuery } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import AppTextField from "components/input-fields/AppTextField";
import Scrollbar from "components/ScrollBar";
import { H2, H6, Small } from "components/Typography";
import { useFormik } from "formik";
import { t } from "i18next";
import Add from "icons/Add";
import Delete from "icons/Delete";
import { BodyTableCell, HeadTableCell } from "page-sections/accounts/account/common/StyledComponents";

import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup"; // component props interface
import { UseGuardarProceso } from "../hooks/UseGuardarProceso";
import { Context } from "contexts/ContextDataTable";

// styled components
const StyledAppModal = styled(AppModal)(({
    theme
}) => ({
    maxWidth: 900,
    minWidth: 400,
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

const CreateProcesoModal = ({
    open,
    data,
    onClose,
    editProceso,
    tipo,
    optionTipoAsiento,
    optionPlanCuenta,
    optionRol
}) => {
    const downXl = useMediaQuery(theme => theme.breakpoints.down("xl"));
    const [select, setSelect] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [selectPlanCuenta, setSelectPlanCuenta] = useState([{
        id: 0,
        nombreCuenta: '',
        codigo: ''
    }]);
    const [selectRol, setSelectRol] = useState([{
        id: 0,
        rol: ''
    }]);
    const [context, setContext] = useContext(Context);
    const [items, setItems] = useState([]);
    const handleAddItem = () => {
        items.push({
            id: items.length,
            codigo: '',
            nombreCuenta: '',
            VPlanCuentaId: 0,
            asientoId: 0,
            rol: 'debe'
        });

        setItems([...items]);
        setValues({ ...values, cuentas: items })
    };
    const handleUpdateItem = (e, id) => {
        const fieldName = e.target.getAttribute("name");
        setItems(items => items.map(item => {
            if (item.id === id) {
                item[fieldName] = e.target.value;
            }
            return item;
        }));
    };

    const handleDeleteItem = id => {
        setItems(items => items.filter(item => item.id !== id));
    };

    const validationSchema = Yup.object().shape({
        nombreAsiento: Yup.string().required("Nombre es requerido!"),
        tipoAsientoId: Yup.string().required("Tipo asiento es requerido!"),
        id: Yup.number().nullable(),
        nombreTipoAsiento: Yup.string().required("Seleccione tipo asiento"),
        cuentas: Yup.array()
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
            }
        }
    });
    useEffect(() => {

    }, [tipo])
    const { handlerSubmitGuardar } = UseGuardarProceso();
    const hadlerClose = () => {
        onClose();
        resetForm();
        setItems([]);
        setSelect(null);
    }
    return <StyledAppModal open={open} handleClose={hadlerClose} >
        <H2 marginBottom={2}>
            {editProceso ? "Editar asiento" : "Añadir asiento"}
        </H2>

        <form onSubmit={(e) => {
            console.log(values);
            console.log(items)
            handleSubmit(e)
        }}>
            <Scrollbar style={{
                maxHeight: downXl ? 500 : "auto"
            }}>
                <Grid container spacing={2}>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Nombre asiento</H6>
                        <AppTextField
                            fullWidth
                            size="small"
                            name="nombreAsiento"
                            placeholder="Nombre del asiento"
                            value={values.nombreAsiento}
                            onChange={handleChange}
                            error={Boolean(touched.nombreAsiento && errors.nombreAsiento)}
                            helperText={touched.nombreAsiento && errors.nombreAsiento}
                        />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <H6 mb={1}>Tipo asiento</H6>
                        <Autocomplete
                            fullWidth
                            getOptionLabel={(optionTipoAsiento) => optionTipoAsiento.nombreTipoAsiento}
                            options={optionTipoAsiento}
                            autoSelect={true}
                            value={select ? select : null}
                            size="small"
                            isOptionEqualToValue={(option, value) => {
                                if (value) {
                                    console.log('obtener select ')
                                    return (option.value === value.value)
                                } else {
                                    console.log('obtener select vacio')
                                    return false;
                                }
                            }}
                            onChange={(event, newValue) => {
                                if (newValue != null) {
                                    setSelect(newValue);
                                    setValues({ ...values, tipoAsientoId: newValue.id, nombreTipoAsiento: newValue.nombreTipoAsiento })
                                    console.log(newValue)
                                } else {
                                    setSelect(null);
                                }
                            }}

                            renderInput={
                                (params) => <TextField
                                    {...params}
                                    label="Pertenece a"
                                    error={Boolean(touched.nombreTipoAsiento && errors.nombreTipoAsiento)}
                                    helperText={touched.nombreTipoAsiento && errors.nombreTipoAsiento}
                                />
                            }
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

                                    <TableBody>
                                        {items.map((item, i) => <TableRow key={item.id}>
                                            <BodyTableCell>
                                                <AppTextField
                                                    //onChange={e => handleUpdateItem(e, item.id)}
                                                    fullWidth
                                                    size="small"
                                                    name="name"
                                                    label="Codigo"
                                                    value={items[i].codigo}
                                                />
                                            </BodyTableCell>

                                            <BodyTableCell>
                                                <Autocomplete
                                                    fullWidth
                                                    getOptionLabel={(options) => options.nombreCuenta}
                                                    //defaultValue={optionPlanCuenta[0]}
                                                    options={optionPlanCuenta}
                                                    autoSelect={true}
                                                    //inputValue={inputValue}
                                                    value={items[i] ? items[i] : null}
                                                    size="small"
                                                    isOptionEqualToValue={(option, value) => {
                                                        if (value) {
                                                            return (option.value === value.value)
                                                        } else {
                                                            return false;
                                                        }
                                                    }}
                                                    onChange={(event, newValue) => {
                                                        if (newValue != null) {
                                                            setSelectPlanCuenta(newValue);
                                                            items[i].VPlanCuentaId = newValue.id;
                                                            items[i].nombreCuenta = newValue.nombreCuenta;
                                                            items[i].codigo = newValue.codigo;
                                                            setItems([...items]);
                                                        } else {
                                                            setSelectPlanCuenta(null);
                                                            items[i].VPlanCuentaId = '';
                                                            items[i].nombreCuenta = '';
                                                            items[i].codigo = '';
                                                            setItems([...items]);
                                                        }
                                                    }}

                                                    renderInput={
                                                        (params) => <TextField
                                                            {...params}
                                                            label="Pertenece a"
                                                            error={Boolean(touched.tipoAsientoId && errors.tipoAsientoId)}
                                                            helperText={touched.tipoAsientoId && errors.tipoAsientoId}
                                                        />
                                                    }
                                                />
                                            </BodyTableCell>

                                            <BodyTableCell>
                                                <AppTextField select fullWidth size="small" name="planCuentaId" value={items[i].rol} onChange={(e) => {
                                                    console.log(e.target.value)
                                                    items[i].rol = e.target.value;
                                                    console.log(items)
                                                    setItems([...items])
                                                }} SelectProps={{
                                                    native: true,
                                                    IconComponent: KeyboardArrowDown
                                                }} helperText={touched.tipoAsientoId && errors.tipoAsientoId} error={Boolean(touched.codigoCliente && errors.codigoCliente)} >
                                                    <React.Fragment>
                                                        {
                                                            optionRol?.map(
                                                                (rol, i) => <option key={i} value={rol.id}>{rol.rol}</option>
                                                            )
                                                        }
                                                    </React.Fragment>
                                                </AppTextField>

                                            </BodyTableCell>

                                            <BodyTableCell>
                                                <IconButton onClick={() => handleDeleteItem(item.id)}>
                                                    <Delete sx={{
                                                        color: "text.disabled"
                                                    }} />
                                                </IconButton>
                                            </BodyTableCell>
                                        </TableRow>)}
                                    </TableBody>
                                </Table>
                            </Scrollbar>
                        </Box>
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

const images = ["/static/products/watch.png", "/static/products/camera.png", "/static/products/headphone.png"];
export default CreateProcesoModal;