import { Box, Button, Card, Divider, Grid } from '@mui/material'
import { H5, H6, Tiny } from 'components/Typography'
import FlexBox from 'components/flexbox/FlexBox'
import AppTextField from 'components/input-fields/AppTextField'
import React from 'react'

const ConfigurePlanes = () => {
    
    return (
        <Card sx={{
            padding: 3
        }}>
            <H5 mb={3}>Configure Plan cuentas</H5>
            <Divider sx={{
                my: 2
            }} />
            <Box mt={2} mb={3}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <H6 mb={1}>Configurar plan cuenta cliente</H6>  
                       {/*  <Autocomplete
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
                        /> */}
                    </Grid>
                    <Grid item xs={6}>
                        <H6 mb={1}>Proveedores</H6>
                        <AppTextField
                            fullWidth size="small"
                            name="codigoCliente"
                            placeholder="Nombre negocio"
                        //value={values.codigoCliente}
                        //onChange={handleChange}
                        //error={Boolean(touched.codigoCliente && errors.codigoCliente)}
                        //helperText={touched.codigoCliente && errors.codigoCliente}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <H6 mb={1}>Vendedores</H6>
                        <AppTextField
                            fullWidth size="small"
                            name="codigoCliente"
                            placeholder="Nombre negocio"
                        //value={values.codigoCliente}
                        //onChange={handleChange}
                        //error={Boolean(touched.codigoCliente && errors.codigoCliente)}
                        //helperText={touched.codigoCliente && errors.codigoCliente}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <H6 mb={1}>Productos</H6>
                        <AppTextField
                            fullWidth size="small"
                            name="codigoCliente"
                            placeholder="Nombre negocio"
                        //value={values.codigoCliente}
                        //onChange={handleChange}
                        //error={Boolean(touched.codigoCliente && errors.codigoCliente)}
                        //helperText={touched.codigoCliente && errors.codigoCliente}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <FlexBox justifyContent="flex-end" gap={2} marginTop={2}>
                            <Button type="submit" variant="contained">
                                Guardar
                            </Button>
                        </FlexBox>
                    </Grid>
                </Grid>
            </Box>
        </Card>
    )
}

export default ConfigurePlanes
