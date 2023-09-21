import { Button, Card, Divider, IconButton, Stack, TextField } from "@mui/material";
import FlexBetween from "components/flexbox/FlexBetween";
import FlexBox from "components/flexbox/FlexBox";
import { H5, H6 } from "components/Typography";
import Edit from "icons/Edit";
import ShoppingCart from "icons/ShoppingCart";
import React, { useState } from "react"; // ---------------------------------------------------------------------

// ---------------------------------------------------------------------
const ResumenCarrito = ({
    showCoupon,
    showEditBtn,
    buttonText,
    carritoProductos,
    handleClick,
    total
}) => {
    const Total = () => {
        let total = 0;
        carritoProductos.map((item) => { total += item.precioVentaMax })
        console.log(total)
        return total;
    }
    return <Card sx={{
        padding: 3
    }}>
        <FlexBetween mb={4}>
            <H5>Resumen de carrito compra</H5>
            {showEditBtn && <IconButton>
                <Edit sx={{
                    fontSize: 16,
                    color: "text.disabled"
                }} />
            </IconButton>}
        </FlexBetween>

        <Stack spacing={1.5} mb={4}>
            {
                carritoProductos.map((producto, i) => {
                    return (<ListItem title={producto.productoMaestroNombre} value={producto.precioVentaMax} />)
                })
            }
            <Divider />
            <ListItem
                title="Total"
                value={total}
                valueColor="error.main"
            />
        </Stack>{/* 

      {showCoupon && <FlexBox alignItems="center" gap={1} mb={3}>
          <TextField color="grey" placeholder="Apply Coupon" size="small" fullWidth />
          <Button variant="contained" size="small" sx={{
        padding: 1
      }}>
            Apply
          </Button>
        </FlexBox>} */}

        <Button variant="contained" startIcon={<ShoppingCart />} fullWidth onClick={handleClick}>
            {buttonText}
        </Button>
    </Card>;
};

export default ResumenCarrito;

function ListItem({
    title,
    value,
    valueColor
}) {
    return <FlexBetween>
        <H6 fontWeight={500}>{title}</H6>
        <H6 fontWeight={500} color={valueColor}>
            ${value}
        </H6>
    </FlexBetween>;
}