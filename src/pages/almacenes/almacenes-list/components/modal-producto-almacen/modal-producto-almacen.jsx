import { styled } from "@mui/material";
import AppModal from "components/AppModal";
import { Children } from "react";
import { useState } from "react";
import ListaProductos from "../lista-productos/lista-productos";
import Scrollbar from "components/ScrollBar";

const ModalProductosAlmacen = ({almacenId,open,onClose,children})=>
{
    // styled components
    const StyledAppModal = styled(AppModal)(({
        theme
    }) => ({
        maxWidth: 700,
        minWidth: 300,
        outline: "none",
        padding: "1.5rem"
    }));
      
    return <StyledAppModal open={open} handleClose={onClose}>
                      <Scrollbar style={{
                    maxHeight: 500,
                    overflow: 'auto'
                }}>

                {children}
                <ListaProductos></ListaProductos>
                </Scrollbar>
            </StyledAppModal>;
};
export default ModalProductosAlmacen;