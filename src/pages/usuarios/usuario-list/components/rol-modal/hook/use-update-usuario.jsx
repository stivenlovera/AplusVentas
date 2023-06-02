import { UpdateUsuarioRolesService } from "Services/api-ventas-erp/usuarioRoles";
import { useSnackbar } from "notistack";

export const UseUpdateUsuarioRoles = (values) => {
    const { enqueueSnackbar } = useSnackbar();
    const ApiUpdateUsuario = async () => {
        try {
            const { data } = await UpdateUsuarioRolesService(values);
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: 'success' });
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
        ApiUpdateUsuario,
    }
}