import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import Delete from "icons/Delete";
import CreateProveedorModal from "./create-proveedor";
const ProveedorColumns = [
    {
        Header: "Codigo",
        accessor: "codigoProveedor"
    },
    {
        Header: "Nombre",
        accessor: "nombreProveedor"
    },
    {
        Header: "Dirrecion",
        accessor: "dirrecion"
    },
    {
        Header: "Telefono",
        accessor: "telefono"
    },
    {
        Header: "Credito",
        accessor: "credito"
    },
    {
        Header: "Acciones",
        accessor: "acciones",
        Cell: ({
            row
        }) => {
            const style = {
                fontSize: 19,
                transition: "color 0.3s",
                color: row.isSelected ? "white" : "text.disabled"
            };
            const [tipo, setTipo] = useState('');
            const [openModal, setOpenModal] = useState(false);
            return <Fragment>
                <IconButton onClick={
                    () => {
                        setOpenModal(true)
                        setTipo('editar')
                    }
                }>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <CreateProveedorModal editProduct open={openModal} id={row.original.id} data={row.original} onClose={
                    () => {
                        setOpenModal(false)
                        setTipo('')
                    }
                } tipo={tipo} />
                <IconButton onClick={() => { alert('funcion pendiente') }}>
                    <Delete sx={style} />
                </IconButton>
            </Fragment >;
        }
    }];
export default ProveedorColumns;