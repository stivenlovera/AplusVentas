import { Edit } from "@mui/icons-material";
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateProveedorModal from "./create-proveedor";
import { UseProveedor } from "../hooks/useProveedor";
import { proveedorInitial } from "./proveedor-fake";
import { Context } from "contexts/ContextDataTable";
const ProveedorColumns = [
    {
        Header: "Codigo",
        accessor: "codigoProveedor"
    },
    {
        Header: "Nombre",
        accessor: "nombreProveedor"
    },
    {
        Header: "Dirrecion",
        accessor: "dirrecion"
    },
    {
        Header: "Telefono",
        accessor: "telefono"
    },
    {
        Header: "Credito",
        accessor: "credito"
    },
    {
        Header: "Acciones",
        accessor: "acciones",
        Cell: ({
            row,
            onRefresh
        }) => {
            const style = {
                fontSize: 19,
                transition: "color 0.3s",
                color: row.isSelected ? "white" : "text.disabled"
            };
            const [context, setContext] = useContext(Context);
            const [data, setData] = useState(proveedorInitial)
            const [loadDataTable, setLoadDataTable] = useState(false)
            const [openModal, setOpenModal] = useState(false);

            const { Delete, Editar, List, Store, Update } = UseProveedor({ loadDataTable })
            //API
            const onEditar = async () => {
                const { edit, status } = await Editar(row.original.id)
                if (status) {
                    setData(edit)
                    setOpenModal(true);
                }

            }
            const onUpdate = async (values) => {
                const { edit, status } = await Update(values)
                if (status) {
                    setOpenModal(false);
                    setContext(true)
                }
            }
            //METODOS

            return (
                <Fragment>
                    <IconButton onClick={
                        () => {
                            onEditar()
                        }
                    }>
                        <Edit sx={{
                            fontSize: 18,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                    <CreateProveedorModal
                        open={openModal}
                        onClose={
                            () => {
                                setOpenModal(false)
                            }
                        }
                        editProveedor={true}
                        data={data}
                        onSubmit={(values) => { onUpdate(values) }}
                    />
                    <IconButton onClick={() => setOpenModal(true)}>
                        <DeleteIcon sx={style} />
                    </IconButton>
                </Fragment >
            );
        }
    }];
export default ProveedorColumns;