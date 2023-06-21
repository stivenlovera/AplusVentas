import { Edit } from "@mui/icons-material";
import { Box, Chip, IconButton, Rating, Tooltip } from "@mui/material";
import { Fragment, useState } from "react";
import CreateUsuarioModal from "../usuario-modal/create-usuario";
import Delete from "icons/Delete";
import TuneIcon from '@mui/icons-material/Tune';
import RolesModal from "../rol-modal/rol-modal";
import {  UseEditarUsuarioRoles } from "../rol-modal/hook/use-edit-usuario";
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
                    <IconButton onClick={() => { alert('funcion pendiente') }}>
                        <Delete sx={{
                            fontSize: 22,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                </Tooltip>
                <CreateUsuarioModal editUsuario open={openModalEditar} data={row.original} onClose={() => setOpenModalEditar(false)} />
                <RolesModal data={{
                    roles,
                    usuario
                }} editRol onClose={() => { setOpenModalRol(false) }} open={openModalRol} />
            </Fragment >;
        }
    }];
export default UsuarioColumns;