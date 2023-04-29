import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import CreateOrdenCompraModal from "./create-orden-compra";
const OrdenCompraColumns = [
    {
        Header: "Codigo",
        accessor: "codigo"
    },
    {
        Header: "Fecha",
        accessor: "fecha"
    },
    {
        Header: "Estado",
        accessor: "estado"
    },
    {
        Header: "Usuario",
        accessor: "usuario"
    },
    {
        Header: "Proveedor",
        accessor: "proveedor"
    },
    {
        Header: "Codigo Producto",
        accessor: "codigoProducto"
    },
    {
        Header: "Producto",
        accessor: "producto"
    },
    {
        Header: "Cantidad",
        accessor: "cantidad"
    },
    {
        Header: "Precio compra",
        accessor: "precioCompra"
    },
    {
        Header: "Total compra",
        accessor: "totalCompra"
    },
    {
        Header: "Almacen Destino",
        accessor: "almacenDestino"
    },
    {
        Header: "Facturado",
        accessor: "facturado"
    },
    {
        Header: "Acciones",
        accessor: "acciones",
        Cell: ({
            row
        }) => {
            const [openModal, setOpenModal] = useState(false);
            return <Fragment>
                <IconButton onClick={() => setOpenModal(true)}>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <CreateOrdenCompraModal editProduct open={openModal}  data={row.original} onClose={() => setOpenModal(false)} />
            </Fragment>;
        }
    }];
export default OrdenCompraColumns;