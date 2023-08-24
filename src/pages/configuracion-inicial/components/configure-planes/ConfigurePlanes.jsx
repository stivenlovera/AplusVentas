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
                    </Grid>
                    <Grid item xs={6}>
                        <H6 mb={1}>Proveedores</H6>
                        <AppTextField
                            fullWidth size="small"
                            name="codigoCliente"
                            placeholder="Nombre negocio"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <H6 mb={1}>Vendedores</H6>
                        <AppTextField
                            fullWidth size="small"
                            name="codigoCliente"
                            placeholder="Nombre negocio"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <H6 mb={1}>Productos</H6>
                        <AppTextField
                            fullWidth size="small"
                            name="codigoCliente"
                            placeholder="Nombre negocio"
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
