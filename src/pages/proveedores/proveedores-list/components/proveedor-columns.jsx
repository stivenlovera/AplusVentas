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

            const [openModal, setOpenModal] = useState(false);
            return <Fragment>
                <IconButton onClick={
                    () => {
                        setOpenModal(true)
                    }
                }>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <CreateProveedorModal
                    open={openModal}
                    id={row.original.id}
                    onClose={
                        () => {
                            setOpenModal(false)
                        }
                    }
                    editProveedor={true}
                    status={() => { }}
                />
                <IconButton onClick={() => { alert('funcion pendiente') }}>
                    <Delete sx={style} />
                </IconButton>
            </Fragment >;
        }
    }];
export default ProveedorColumns;