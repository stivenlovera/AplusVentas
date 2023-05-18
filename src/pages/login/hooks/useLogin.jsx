import { LoginService } from "Services/api-ventas-erp/authenticate";
import { useSnackbar } from "notistack";

export const UseLogin = (usuario, password) => {
    const { enqueueSnackbar } = useSnackbar();

    const ApiLogin = async () => {
        try {
            const { data } = await LoginService(usuario, password);
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: 'success' });
            }
            else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Servidor desconectado', { variant: 'error' });
        }
    }
    return {
        ApiLogin,
    }
}