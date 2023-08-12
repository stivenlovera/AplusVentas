import { Box, Button, Card, Divider, Grid, IconButton } from '@mui/material'
import { H3, H4, H5, H6 } from 'components/Typography'
import FlexBetween from 'components/flexbox/FlexBetween'
import { UseGeneral } from 'pages/configuracion-inicial/hooks/useGeneral'
import { initialGeneral } from 'pages/configuracion-inicial/utils/initialGeneral'
import React, { useEffect, useState } from 'react'

const General = () => {
    const [general, setGeneral] = useState(initialGeneral)
    const { onEditar } = UseGeneral()
    const inizialize = async () => {
        const { edit, status } = await onEditar();
        setGeneral(edit)
    }
    useEffect(() => {
        inizialize()

    }, [])

    return (
        <Box pt={0} pb={0}>
            <Card sx={{
                padding: 2
            }}>
                <FlexBetween>
                    <H3>Informacion General</H3>
                </FlexBetween>
                <Divider sx={{
                    my: 2
                }} />
                <Grid container spacing={1} mt={0}>
                    <Grid item md={6} xs={6}>
                        <H6 color="text.secondary">Nombre empresa (negocio o emprendimiento)</H6>
                        <H4 fontWeight={500}>{general.nombreEmpresa}</H4>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <H6 color="text.secondary">Propietario o representante</H6>
                        <H4 fontWeight={500}>{general.usuario_id}</H4>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <H6 color="text.secondary">Direccion</H6>
                        <H4 fontWeight={500}>{general.direccion}</H4>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <H6 color="text.secondary">Email</H6>
                        <H4 fontWeight={500}>{general.email}</H4>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <H6 color="text.secondary">Telefono</H6>
                        <H4 fontWeight={500}>{general.telefono}</H4>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <H6 color="text.secondary">Dominio web</H6>
                        <H4 fontWeight={500}>{general.dominio}</H4>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <H6 color="text.secondary">Sistema facturacion</H6>
                        <H4 fontWeight={500}>{general.facturacion}</H4>
                    </Grid>

                </Grid>
                <Divider sx={{
                    my: 2
                }} />
                <Grid container spacing={1} mt={0}>
                    <Grid item md={6} xs={6}>
                        <Button
                            fullWidth
                            size='small'
                            variant="contained"
                            onClick={() => { }}
                        >
                            Modificar Informacion general
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Box >
    )
}

export default General
