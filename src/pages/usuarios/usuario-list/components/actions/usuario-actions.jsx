import { IconButton, Tooltip } from "@mui/material";
import Delete from "icons/Delete";
import { Fragment, useState } from "react";
import CreateUsuarioModal from "../usuario-modal/create-usuario";
import RolesModal from "../rol-modal/rol-modal";
import ModalDelete from "components/modal-delete/modal-delete";
import { UseUsuario } from "../../hooks/useUsuario";
import Edit from "icons/Edit";
import { UseEditarUsuarioRoles } from "../rol-modal/hook/use-edit-usuario";
import TuneIcon from '@mui/icons-material/Tune';
export const UsuarioActions = ({ row }) => {
    console.log(row)
    const style = {
        fontSize: 19,
        transition: "color 0.3s",
        color: row.isSelected ? "white" : "text.disabled"
    };
    const [openModalEditar, setOpenModalEditar] = useState(false);
    const [openModalRol, setOpenModalRol] = useState(false);
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
        const { data, status } = await onDelete(row.usuarioId);
        if (status) {
            setOpenModalDelete(false)
        }
    }
    console.log(row)
    const { apiEditar, roles, usuario } = UseEditarUsuarioRoles(row.usuarioId);

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
            data={row}
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