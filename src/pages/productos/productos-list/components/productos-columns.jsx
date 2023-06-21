import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import CreateProductoModal from "./create-producto";
import Delete from "icons/Delete";
import { initialState } from "../utils/utils-productos";
import { Request } from "utils/http";
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
        accessor: "productoId",
        Cell: ({
            row
        }) => {
            const style = {
                fontSize: 19,
                transition: "color 0.3s",
                color: row.isSelected ? "white" : "text.disabled"
            };
            const [editar, setEditar] = useState({
                codigo: '',
                proveedores: [],
                categorias: [],
                productosMaestros: [],
                initialState: initialState
            })
            const [openModal, setOpenModal] = useState(false);
            /*Api */
            const onEditarProducto = async () => {
                setOpenModal(true)
                const { data, message, status } = await Request({
                    endPoint: `${process.env.REACT_APP_API}api/Producto/editar/${row.original.productoId}`,
                    initialValues: [],
                    method: 'get',
                    showError: true,
                    showSuccess: false
                });
                if (!!status) {
                    setEditar({
                        codigo: data.producto.codigoProducto,
                        categorias: data.categorias,
                        proveedores: data.proveedores,
                        productosMaestros: data.productosMaestros,
                        initialState: data.producto
                    });
                    setOpenModal(true);
                }
                else {
                    setOpenModal(false)
                }
            }
            useEffect(() => {

            }, [editar])
            
            return <Fragment>
                <IconButton
                    onClick={onEditarProducto}
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
                    open={openModal}
                    editProduct
                    onClose={() => setOpenModal(false)}
                    data={editar} />
            </Fragment>;
        }
    }];
export default ProductosColumns;