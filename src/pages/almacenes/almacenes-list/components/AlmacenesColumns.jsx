import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import ModalAlmacen from "./modal-almacen/modal-almacen";
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
            return <Fragment>
                <IconButton onClick={() => setOpenModal(true)}>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <ModalAlmacen editProduct open={openModal}  data={row.original} onClose={() => setOpenModal(false)} />
            </Fragment>;
        }
    }];
export default AlamacenesColumns;