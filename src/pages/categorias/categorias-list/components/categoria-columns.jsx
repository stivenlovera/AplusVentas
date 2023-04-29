import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import CreateCategoriaModal from "./create-categoria";
const CategoriaColumns = [
    {
        Header: "Codigo",
        accessor: "codigo"
    },
    {
        Header: "Categoria",
        accessor: "nombreCategoria"
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
                <CreateCategoriaModal editProduct open={openModal}  data={row.original} onClose={() => setOpenModal(false)} />
            </Fragment>;
        }
    }];
export default CategoriaColumns;