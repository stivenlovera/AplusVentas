import { Box, Button, Paper, TableContainer } from '@mui/material'
import IconWrapper from 'components/IconWrapper'
import { H5 } from 'components/Typography'
import FlexBox from 'components/flexbox/FlexBox'
import ShoppingBasket from 'icons/ShoppingBasket'
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management'
import React from 'react'
import { Link } from 'react-router-dom'
import DateTable from './components/dataTable'
import Add from 'icons/Add'

const ListaComponents2= () => {
    return (
        <Box pt={2} pb={4}>
            <HeadingWrapper justifyContent="space-between" alignItems="center">
                <FlexBox gap={0.5} alignItems="center">
                    <IconWrapper>
                        <ShoppingBasket sx={{
                            color: "primary.main"
                        }} />
                    </IconWrapper>
                    <H5>Movimientos Generales</H5>
                </FlexBox>

                <Link to={'/dashboard/orden-inicial/create'}>
                    <Button variant="contained" endIcon={<Add />} >
                        se
                    </Button>
                </Link>
            </HeadingWrapper>
            <TableContainer component={Paper}>
            <DateTable></DateTable>     
            </TableContainer>
        </Box>
    )
}

export default ListaComponents2
