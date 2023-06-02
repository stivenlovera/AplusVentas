
import { useState } from "react";
import { initialRol } from "../../utils/InitialRol";
import { initialRoles } from "../../utils/initialRoles";
import { enqueueSnackbar } from "notistack";
import { EditarUsuarioRolesService } from "Services/api-ventas-erp/usuarioRoles";

export const UseEditarUsuarioRoles = (id) => {
    const [usuario, setUsuario] = useState(initialRoles);
    const [roles, setRoles] = useState([]);

    const apiEditar = async () => {
        try {
            const { data } = await EditarUsuarioRolesService(id);
            if (data.status == 1) {
                console.log(data)
                setUsuario(data.data.rolesUsuario)
                setRoles(data.data.roles)
                //enqueueSnackbar(data.message, { variant: 'success' });
            }
            else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
            return !!data.status;
        } catch (error) {
            enqueueSnackbar('Servidor desconectado', { variant: 'error' });
            return false;
        }
    }
    return {
        usuario,
        roles,
        apiEditar
    }
}