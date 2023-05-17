import { StoreVentaServicio } from "Services/api-ventas-erp/venta";
import { useSnackbar } from "notistack";

export const UseStoreVenta = (values) => {
    const { enqueueSnackbar } = useSnackbar();
    const ApiStore = async () => {
        let ordenCompraId = 0;
        try {
            const { data } = await StoreVentaServicio(values);
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
        ApiStore,
    }
}