import { Button, Paper, TableContainer } from '@mui/material'
import { Box } from '@mui/system'
import IconWrapper from 'components/IconWrapper'
import { H5 } from 'components/Typography'
import FlexBox from 'components/flexbox/FlexBox'
import Add from 'icons/Add'
import ShoppingBasket from 'icons/ShoppingBasket'
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management'
import React from 'react'
import { Link } from 'react-router-dom'

const AlmacenProducto = () => {
    return (
        <Box pt={2} pb={4}>
            <HeadingWrapper justifyContent="space-between" alignItems="center">
                <FlexBox gap={0.5} alignItems="center">
                    <IconWrapper>
                        <ShoppingBasket sx={{
                            color: "primary.main"
                        }} />
                    </IconWrapper>
                    <H5>Almacen</H5>
                </FlexBox>
                <Link to={'/dashboard/orden-inicial/create'}>
                    <Button variant="contained" endIcon={<Add />} >
                        Mover
                    </Button>
                </Link>
            </HeadingWrapper>
            <TableContainer component={Paper}>
                
            </TableContainer>
        </Box>
    )
}

export default AlmacenProducto
