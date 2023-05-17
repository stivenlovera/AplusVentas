import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import CreateProductoModal from "./create-producto";
import Delete from "icons/Delete";
const ProductosColumns = [
    {
        Header: "Cod barras",
        accessor: "codigoBarra"
    },
    {
        Header: "Nombre",
        accessor: "nombreProducto"
    },
    {
        Header: "Unidad Medida",
        accessor: "unidadMedida"
    },
    {
        Header: "Precio venta min",
        accessor: "precioVentaMin"
    },
    {
        Header: "Precio venta max",
        accessor: "precioVentaMax"
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
                <IconButton
                    onClick={() => {
                        setOpenModal(true)
                        setTipo('editar')
                    }}
                >
                    <Edit
                        sx={{
                            fontSize: 18,
                            color: "text.disabled"
                        }}
                    />
                </IconButton>
                <IconButton onClick={() => { alert('funcion pendiente') }}>
                    <Delete sx={style} />
                </IconButton>
                <CreateProductoModal
                    editProduct
                    open={openModal}
                    data={row.original}
                    id={row.original.id}
                    onClose={
                        () => {
                            setOpenModal(false);
                            setTipo('')
                        }}
                    tipo={tipo}
                />
            </Fragment>;
        }
    }];
export default ProductosColumns;