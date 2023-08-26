import {  StoreEntradaAlmacenService } from "Services/api-ventas-erp/ordenCompra";
import { useSnackbar } from "notistack";

export const UseStoreRecibir = (id, values) => {
    const { enqueueSnackbar } = useSnackbar();
    const ApiStoreEntradaAlamacen = async () => {
        console.log(id, values)
        try {
            const { data } = await StoreEntradaAlmacenService(id, values);
            if (data.status == 1) {
                enqueueSnackbar(data.message, { variant: 'success' });
            }
            else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            console.log(error)
            enqueueSnackbar('Servidor desconectado', { variant: 'error' });
        }
    }
    return {
        ApiStoreEntradaAlamacen,
    }
}