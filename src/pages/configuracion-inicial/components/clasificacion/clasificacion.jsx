import { Card, Divider, Grid } from '@mui/material'
import { H5, H6 } from 'components/Typography'
import AppTextField from 'components/input-fields/AppTextField'
import React from 'react'

const Clasificacion = () => {
    return (
        <Card sx={{
            padding: 3,
            mb: 3
        }}>
            <Grid item xs={12}>
                <H5 mb={3}>Clasificacion</H5>
                <Divider sx={{
                    my: 2
                }} />
                <H6 mb={1}>Clasificacion</H6>
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
        </Card>
    )
}

export default Clasificacion
