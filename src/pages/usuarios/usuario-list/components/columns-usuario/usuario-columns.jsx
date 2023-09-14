import { Edit } from "@mui/icons-material";
import { Box, Chip, IconButton, Rating, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";
import CreateUsuarioModal from "../usuario-modal/create-usuario";
import Delete from "icons/Delete";
import TuneIcon from '@mui/icons-material/Tune';
import RolesModal from "../rol-modal/rol-modal";
import { UseEditarUsuarioRoles } from "../rol-modal/hook/use-edit-usuario";
import ModalDelete from "components/modal-delete/modal-delete";
import { UseUsuario } from "../../hooks/useUsuario";

const UsuarioColumns = [
    {
        Header: "Nombres",
        accessor: "nombre"
    },
    {
        Header: "CI",
        accessor: "ci"
    },
    {
        Header: "Apellidos",
        accessor: "apellido"
    },
    {
        Header: "Fecha Nacimiento",
        accessor: "fechaNacimiento"
    },
    {
        Header: "Roles",
        accessor: "roles",

        Cell: ({
            row
        }) => {
            var roles = [];
            if (row.original.roles != "") {
                roles = row.original.roles.split(",");
            }
            return (
                <Fragment>
                    {
                        roles.map((rol, i) => {
                            return (<Chip
                                key={i}
                                size="small"
                                label={rol}
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
        accessor: "usuarioId",
        Cell: ({
            row
        }) => {
            const style = {
                fontSize: 19,
                transition: "color 0.3s",
                color: row.isSelected ? "white" : "text.disabled"
            };
            const [openModalEditar, setOpenModalEditar] = useState(false);
            const [openModalRol, setOpenModalRol] = useState(false);
            const [openModalEliminar, setModalEliminar] = useState(false);
            const [openModalDelete, setOpenModalDelete] = useState(false);

            /*use editar */

            /*Metodos */
            const hanlderOpenEditar = async () => {
                setOpenModalEditar(true);
            }
            const hanlderOpenRol = async () => {
                if (await apiEditar()) {
                    setOpenModalRol(true);
                }
            }
            const { onDelete } = UseUsuario()
            const hanlderDelete = async () => {
                const { data, status } = await onDelete(row.original.usuarioId);
                if (status) {
                    setOpenModalDelete(false)
                }
            }
            const { apiEditar, roles, usuario } = UseEditarUsuarioRoles(row.original.usuarioId);

            return <Fragment>
                <Tooltip title="Editar" arrow>
                    <IconButton onClick={hanlderOpenEditar}>
                        <Edit sx={{
                            fontSize: 22,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Roles" arrow>
                    <IconButton onClick={hanlderOpenRol}>
                        <TuneIcon sx={{
                            fontSize: 22,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar" arrow>
                    <IconButton onClick={() => { setOpenModalDelete(true) }}>
                        <Delete sx={{
                            fontSize: 22,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                </Tooltip>
                <CreateUsuarioModal
                    editUsuario
                    open={openModalEditar}
                    data={row.original}
                    onClose={() => setOpenModalEditar(false)} />
                <RolesModal data={{
                    roles,
                    usuario
                }}
                    editRol
                    onClose={() => { setOpenModalRol(false) }} open={openModalRol} />
                <ModalDelete
                    disabledButton={false}
                    onClose={() => { setOpenModalDelete(false) }}
                    onSave={hanlderDelete}
                    open={openModalDelete}
                />
            </Fragment >;
        }
    }];
export default UsuarioColumns;