import { GuardarOrdenCompraService } from "Services/api-ventas-erp/ordenCompra";
import { useSnackbar } from "notistack";

export const UseStoreOrdenCompra = (values) => {
    const { enqueueSnackbar } = useSnackbar();


    const ApiGuardar = async () => {
        let ordenCompraId = 0;
        try {
            const { data } = await GuardarOrdenCompraService(values);
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: 'success' });
                ordenCompraId = data.data;
      
            }
            else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Servidor desconectado', { variant: 'error' });
        }
        return ordenCompraId;
    }
    return {
        ApiGuardar,
    }
}