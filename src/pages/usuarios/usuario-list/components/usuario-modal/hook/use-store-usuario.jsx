import { StoreEntradaAlmacenService } from "Services/api-ventas-erp/ordenCompra";
import { StoreUsuarioService } from "Services/api-ventas-erp/usuario";
import { useSnackbar } from "notistack";

export const UseStoreUsuario = (values) => {
    const { enqueueSnackbar } = useSnackbar();
    const ApiStoreUsuario = async () => {
        try {
            const { data } = await StoreUsuarioService(values);
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
        ApiStoreUsuario,
    }
}