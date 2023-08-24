import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import CreateOrdenCompraModal from "./create-orden-compra";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Delete from "icons/Delete";
import { Small } from "components/Typography";
import RecibirProducto from "pages/orden-compra/recibir/recibir-producto";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link } from "react-router-dom";
import ModalDelete from "components/modal-delete/modal-delete";
import { UseOrdenCompra } from "pages/orden-compra/create-orden-inicial/hooks/useOrdenCompra";
import { initialStateOrdenCompra } from "pages/orden-compra/create-orden-inicial/utils/initialState";
import { UseDetalleAlmacen } from "pages/almacenes/hooks/useDetalleAlmacen";
const OrdenCompraColumns = [
    {
        Header: "Codigo",
        accessor: "codigoCompra"
    },
    {
        Header: "Fecha",
        accessor: "fechaCreacion"
    },
    {
        Header: "Estado",
        accessor: "nombreEstado",
        Cell: ({
            row
        }) => {
            return (
                <Small sx={{
                    backgroundColor: "action.hover",
                    borderRadius: 10,
                    padding: ".2rem 1rem",
                    textAlign: "center"
                }}>
                    {row.original.nombreEstado}
                </Small>
            )
        }
    },
    {
        Header: "Usuario",
        accessor: "usuario",
    },
    {
        Header: "Proveedor",
        accessor: "proveedor"
    },
    {
        Header: "Total",
        accessor: "total"
    },
    {
        Header: "TipoPago",
        accessor: "asientoNombre"
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
            const [openModalDelete, setOpenModalDelete] = useState(false);
            const [openModal, setOpenModal] = useState(false);
            const [modalRecibir, setModalRecibir] = useState(false);
            const [previewRecibir, setpreviewRecibir] = useState(initialStateOrdenCompra)
            const { onDelete, onPreviewOrdeCompra } = UseOrdenCompra();
            const { onStore } = UseDetalleAlmacen();
            /*Modal recibir producto */
            const onCloseRecibir = () => {
                setModalRecibir(false)
            }
            const onSubmitRecibir = async (values) => {
                const { data, status } = await onStore(values);
                if (status) {
                    setModalRecibir(false)
                }
            }
            const hanlerOpenModalRecibir = async () => {
                const { status, compra } = await onPreviewOrdeCompra(row.original.id)
                setpreviewRecibir(compra)
                setModalRecibir(true)
            }
            const onDeleteProducto = async () => {
                const { status } = await onDelete(row.original.id)
                if (status) {
                    setOpenModalDelete(false)
                }
            }
            return (
                <Fragment>
                    <IconButton onClick={hanlerOpenModalRecibir}>
                        <LocalMallIcon sx={{
                            fontSize: 18,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                    <IconButton onClick={() => setOpenModal(true)}>
                        <VisibilityIcon sx={{
                            fontSize: 18,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                    <Link to={`/dashboard/orden-inicial/editar/${row.original.id}`}>
                        <Edit sx={{
                            fontSize: 18,
                            color: "text.disabled"
                        }} />
                    </Link>
                    <IconButton onClick={() => setOpenModalDelete(true)}>
                        <Delete sx={style} />
                    </IconButton>
                    <RecibirProducto
                        data={previewRecibir}
                        onClose={onCloseRecibir}
                        open={modalRecibir}
                        onEnviar={onSubmitRecibir}
                    />
                    <CreateOrdenCompraModal
                        editProduct
                        open={openModal}
                        data={row.original}
                        onClose={() => setOpenModal(false)}
                    />
                    <ModalDelete
                        disabledButton={false}
                        onClose={() => setOpenModalDelete(false)}
                        onSave={onDeleteProducto}
                        open={openModalDelete}
                    />
                </Fragment>
            );
        }
    }];
export default OrdenCompraColumns;