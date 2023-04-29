import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import CreateAlmacenModal from "./CreateAlmacen";
const AlamacenesColumns = [
    {
        Header: "Codigo",
        accessor: "codigo"
    },
    {
        Header: "Nombre",
        accessor: "nombre"
    },
    {
        Header: "Dirrecion",
        accessor: "dirrecion"
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
                <CreateAlmacenModal editProduct open={openModal}  data={row.original} onClose={() => setOpenModal(false)} />
            </Fragment>;
        }
    }];
export default AlamacenesColumns;