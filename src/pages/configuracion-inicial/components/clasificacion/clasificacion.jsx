import { Card, Divider, Grid } from '@mui/material'
import { H3, H5, H6 } from 'components/Typography'
import FlexBetween from 'components/flexbox/FlexBetween'
import React from 'react'

const Clasificacion = () => {
    return (
        <Card sx={{
            padding: 2
        }}>
            <Grid item xs={12} >
                <FlexBetween>
                    <H3>Clasificacion</H3>
                </FlexBetween>
                <Divider sx={{
                    my: 2
                }} />
                <H6 mb={1} style={{ paddingLeft: 15 }}>Categorias</H6>
                <H6 mb={1} style={{ paddingLeft: 30 }}>Sub categoria</H6>
                <H6 mb={1} style={{ paddingLeft: 45, color: 'blue' }}>Productos</H6>
            </Grid>
        </Card>
    )
}

export default Clasificacion
