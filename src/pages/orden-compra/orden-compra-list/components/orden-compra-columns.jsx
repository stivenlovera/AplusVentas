import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import CreateOrdenCompraModal from "./create-orden-compra";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Delete from "icons/Delete";
import { Small } from "components/Typography";
import RecibirProducto from "pages/orden-compra/recibir/recibir-producto";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { UsePreviewOrdenCompraRecibir } from "pages/orden-compra/recibir/hooks/usePreviewRecibir";
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
            const [tipo, setTipo] = useState('');

            const [openModal, setOpenModal] = useState(false);

            /*Modal recibir producto */
            const [modalRecibir, setModalRecibir] = useState(false);
            const onCloseRecibir = () => {
                setModalRecibir(false)
            }

            const { ApiPreviewPago, previewPago, almacenes } = UsePreviewOrdenCompraRecibir();

            const hanlerOpenModalRecibir = async () => {
                console.log(row.original.id)
                console.log(almacenes)
                await ApiPreviewPago(row.original.id)
                setModalRecibir(true)
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
                    <IconButton onClick={() => setOpenModal(true)}>
                        <Edit sx={{
                            fontSize: 18,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                    <IconButton onClick={() => setOpenModal(true)}>
                        <Delete sx={style} />
                    </IconButton>
                    <RecibirProducto data={previewPago} almacenes={almacenes} onClose={onCloseRecibir} open={modalRecibir} />
                    <CreateOrdenCompraModal editProduct open={openModal} data={row.original} onClose={() => setOpenModal(false)} />
                </Fragment>
            );
        }
    }];
export default OrdenCompraColumns;