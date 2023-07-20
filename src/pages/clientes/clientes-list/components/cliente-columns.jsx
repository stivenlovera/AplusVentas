import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import CreateClienteModal from "./create-cliente";
import { UseCliente } from "pages/clientes/hooks/useCliente";
import ModalDelete from "components/modal-delete/modal-delete";
import Delete from "icons/Delete";
import { Context } from "contexts/ContextDataTable";

const ClienteColumns = [
    {
        Header: "Codigo",
        accessor: "codigoCliente"
    },
    {
        Header: "Numero Documento",
        accessor: "numeroDocumento",
        Cell: ({
            row
        }) => {
            return row.original.numeroDocumento;
        }
    },
    {
        Header: "Tipo Documento",
        accessor: "tipoDocumentoIdentidad",
        Cell: ({
            row
        }) => {
            return row.original.tipoDocumentoIdentidad.descripcion;
        }
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
        Header: "Acciones",
        accessor: "id",
        Cell: ({
            row
        }) => {
            const [context, setContext] = useContext(Context);

            const style = {
                fontSize: 19,
                transition: "color 0.3s",
                color: row.isSelected ? "white" : "text.disabled"
            };
            const [openModal, setOpenModal] = useState(false);
            const [openModalDelete, setOpenModalDelete] = useState(false);

            const { onUpdate, onDelete } = UseCliente()

            const ApiUpdate = async (values) => {
                const { data, status } = await onUpdate(values);
                if (status) {
                    setOpenModal(false)
                    setContext(true)
                }
            }
            const ApiDelete = async () => {
                const { data, status } = await onDelete(row.original.id);
                if (status) {
                    setOpenModalDelete(false)
                    setContext(true)
                }
            }

            const handlerUpdate = async (values) => {
                await ApiUpdate(values);
            }

            const hanlderDelete = async () => {
                await ApiDelete();
            }

            return <Fragment>
                <IconButton onClick={() => { setOpenModal(true) }
                }>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <IconButton onClick={() => { setOpenModalDelete(true) }}>
                    <Delete sx={style} />
                </IconButton>
                <CreateClienteModal
                    editCliente={true}
                    open={openModal}
                    data={row.original}
                    onSubmit={handlerUpdate}
                    onClose={() => { setOpenModal(false) }
                    } />
                <ModalDelete
                    disabledButton={false}
                    onClose={() => { setOpenModalDelete(false) }}
                    onSave={hanlderDelete}
                    open={openModalDelete}
                />
            </Fragment>;
        }
    }];
export default ClienteColumns;