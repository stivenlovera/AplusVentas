import { Edit } from "@mui/icons-material";
import { Box, Chip, IconButton, Rating, Tooltip } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import Delete from "icons/Delete";
import RolModal from "../modal-rol/modal-rol";
import ModalDelete from "components/modal-delete/modal-delete";
import { ContextPermisos } from "pages/permisos-roles/context/contextTablePermisos";
import { initialFormRoles } from "pages/permisos-roles/utils/initialValuesRol";
import { Request } from "utils/http";
const ColumnsRoles = [
    {
        Header: "Nombre",
        accessor: "nombre"
    },
    {
        Header: "Permisos",
        accessor: "permisos",
        Cell: ({
            row
        }) => {

            return (
                <Fragment>
                    {
                        row.original.permisos.map((permiso, i) => {
                            return (<Chip
                                key={i}
                                size="small"
                                label={permiso.nombre}
                                sx={{ m: 0.5 }}
                            />)
                        })
                    }
                </Fragment>
            );
        }
    },
    {
        Header: "Acciones",
        accessor: "rolId",
        Cell: ({
            row
        }) => {
            const [context, setContext] = useContext(ContextPermisos);
            const style = {
                fontSize: 19,
                transition: "color 0.3s",
                color: row.isSelected ? "white" : "text.disabled"
            };
            const [editar, setEditar] = useState(initialFormRoles)
            const [openModalEditar, setOpenModalEditar] = useState(false);
            const [openModalEliminar, setModalEliminar] = useState(false);
            const [buttonDelete, setButtonDelete] = useState(false);

            /*Metodos */
            const hanlderOpenEditar = async () => {
                const { data, message, status } = await Request({
                    endPoint: `${process.env.REACT_APP_API}api/Rol/${row.original.rolId}`,
                    initialValues: initialFormRoles,
                    method: 'get',
                    showError: true,
                    showSuccess: false
                });

                if (!!status) {
                    setOpenModalEditar(true);
                    setEditar(data);
                }
            }
            const hanlderOpenEliminar = async () => {
                setModalEliminar(true);
            }
            const hanlderEliminar = async () => {
                const { data, message, status } = await Request({
                    endPoint: `${process.env.REACT_APP_API}api/Rol/${row.original.rolId}`,
                    initialValues: [],
                    method: 'delete',
                    showError: true,
                    showSuccess: true
                });
                if (!!status) {
                    console.log(!!status);
                    setModalEliminar(false);
                    setContext(true);
                }
                setButtonDelete(false);
            }
            return <Fragment>
                <Tooltip title="Editar" arrow>
                    <IconButton onClick={hanlderOpenEditar}>
                        <Edit sx={{
                            fontSize: 22,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar" arrow>
                    <IconButton onClick={hanlderOpenEliminar}>
                        <Delete sx={{
                            fontSize: 22,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                </Tooltip>
                <RolModal
                    editRol
                    open={openModalEditar}
                    form={editar}
                    onClose={() => setOpenModalEditar(false)}
                />
                <ModalDelete
                    onClose={() => { setModalEliminar(false) }}
                    open={openModalEliminar}
                    onSave={hanlderEliminar}
                    disabledButton={buttonDelete}
                />
            </Fragment>;
        }
    }];
export default ColumnsRoles;