import { ProcesarPagoVentaService } from "Services/api-ventas-erp/venta";
import { useSnackbar } from "notistack";

export const UseStoreProcesoPagoVenta = (id, fecha) => {
    const { enqueueSnackbar } = useSnackbar();

    const ApiStoreProceso = async () => {
        let ordenCompraId = 0;
        try {
            const { data } = await ProcesarPagoVentaService(id, fecha);
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
        ApiStoreProceso,
    }
}