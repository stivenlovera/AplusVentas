import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import Delete from "icons/Delete";
import CreateClienteModal from "./create-cliente";
import { UseCliente } from "pages/clientes/hooks/useCliente";
import ModalDelete from "components/modal-delete/modal-delete";

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
            const [openModalDelete, setOpenModalDelete] = useState(false);

            const { Update, Delete } = UseCliente()

            const ApiUpdate = async (values) => {
                const { data, status } = await Update(values);
                if (status) {
                    setOpenModal(false)
                }
            }
           /*  const ApiDelete = async (values) => {
                const { data, status } = await Delete(row.original.id);
                if (status) {
                    setOpenModalDelete(false)
                }
            } */
            const onUpdate = async (values) => {
                await ApiUpdate(values);
            }

           /*  const onDelete = async () => {
                await ApiDelete();
            } */

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
                <IconButton onClick={() => { setOpenModalDelete(true) }}>
                    <Delete sx={style} />
                </IconButton>
                <CreateClienteModal
                    editCliente={true}
                    open={openModal}
                    data={row.original}
                    onSubmit={onUpdate}
                    onClose={() => { setOpenModal(false) }
                    } />
              {/*   <ModalDelete
                    disabledButton={false}
                    onClose={() => { setOpenModalDelete(false) }}
                    onSave={onDelete}
                    open={openModalDelete}
                /> */}
            </Fragment>;
        }
    }];
export default ClienteColumns;