import { Edit, Warehouse } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import ModalAlmacen from "./modal-almacen/modal-almacen";
import ModalProductosAlmacen from "./modal-producto-almacen/modal-producto-almacen";
import { UseAlmacen } from "./hooks/useAlmacen";
import CustomTable from "page-sections/admin-ecommerce/CustomTable";
import ProductosAlmacenColumns from "./modal-producto-almacen/producto-almacen-column";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import ShoppingBasket from "icons/ShoppingBasket";
import { H5 } from "components/Typography";



const AlamacenesColumns = [
    {
        Header: "Codigo",
        accessor: "codigoAlmacen"
    },
    {
        Header: "Nombre",
        accessor: "nombreAlmacen"
    },
    {
        Header: "Dirrecion",
        accessor: "dirrecion",
    },
    {
        Header: "Acciones",
        accessor: "id",
        Cell: ({
            row
        }) => {
            const [openModal, setOpenModal] = useState(false);
            const [openModalProductos, setOpenModalProductos] = useState(false);
            const [productos, setProductos] = useState([]);
            const abrirProductos = async (setOpenModalProductos,id,setProductos) =>{
                const {GetProductosAlmacen} = UseAlmacen();
                const {store,status} = await GetProductosAlmacen(id);
                setProductos(store);
                setOpenModalProductos(true);
            }
            const listarProductos = (
             <>
                <FlexBox gap={0.5} alignItems="center">
                    <IconWrapper>
                    <ShoppingBasket sx={{
                        color: "primary.main"
                    }} />
                    </IconWrapper>
                    <H5>{row.original.nombreAlmacen}</H5>
                </FlexBox>
                <CustomTable  columnShape={ProductosAlmacenColumns} data={productos} hidePagination/>
                </>    
            );
            return <Fragment>
                <IconButton onClick={() => setOpenModal(true)}>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <IconButton onClick={() => {abrirProductos(setOpenModalProductos,row.original.id,setProductos)}}>
                    <Warehouse sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <ModalAlmacen editProduct open={openModal}  data={row.original} onClose={() => setOpenModal(false)} />
                <ModalProductosAlmacen almacenId={row.original.id} open={openModalProductos}  onClose={() => setOpenModalProductos(false)} >
                    {listarProductos} 
                </ModalProductosAlmacen>
            </Fragment>;
        }
    }];
export default AlamacenesColumns;