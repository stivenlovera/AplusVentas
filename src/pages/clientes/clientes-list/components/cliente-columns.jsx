import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import Delete from "icons/Delete";
import CreateClienteModal from "./create-cliente";

const ClienteColumns = [
    {
        Header: "Codigo",
        accessor: "codigoCliente"
    },
    {
        Header: "CI - NIT",
        accessor: "ci"
    },
    {
        Header: "Nombre",
        accessor: "nombreCompletoCliente"
    },
    {
        Header: "Dirrecion",
        accessor: "dirrecion"
    },
    {
        Header: "Email",
        accessor: "correoElectronico"
    },
    {
        Header: "Telefono",
        accessor: "telefono"
    },
    {
        Header: "Linea credito",
        accessor: "lineaCredito"
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
                <IconButton onClick={() => { alert('funcion pendiente') }}>
                    <Delete sx={style} />
                </IconButton>
                <CreateClienteModal editProduct open={openModal} id={row.original.id} data={row.original} onClose={
                    () => {
                        setOpenModal(false)
                        setTipo('')
                    }
                } tipo={tipo} />
            </Fragment>;
        }
    }];
export default ClienteColumns;