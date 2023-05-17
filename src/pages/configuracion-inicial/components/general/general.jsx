import { Box, Button, Card, Divider, Grid } from '@mui/material'
import { H5, H6 } from 'components/Typography'
import FlexBox from 'components/flexbox/FlexBox'
import AppTextField from 'components/input-fields/AppTextField'
import React from 'react'

const General = () => {
    return (
        <Card sx={{
            padding: 3
        }}>
            <H5 mb={3}>Empresa</H5>

            <Divider sx={{
                my: 2
            }} />

            <Box mt={2} mb={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <H6 mb={1}>Nombre negocio</H6>
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

                    <Grid item md={6} xs={12}>

                    </Grid>

                    <Grid item md={6} xs={12}>

                    </Grid>

                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <FlexBox justifyContent="flex-end" gap={2} marginTop={0}>
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

export default General
