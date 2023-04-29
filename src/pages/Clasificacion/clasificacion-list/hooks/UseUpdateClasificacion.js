
import { ModificarClasificacionService } from "Services/api-ventas-erp/clasificacionService";
import { useSnackbar } from "notistack";

export const UseUpdateClasificacion = (values) => {
    const { enqueueSnackbar } = useSnackbar();
    const handlerSubmitModificar = () => {
        ApiModificar()
    }
    const ApiModificar = async () => {
        const { data } = await ModificarClasificacionService(values);
        if (data.status == 1) {
            enqueueSnackbar(data.message, { variant: 'success' });
        }
        else {
            enqueueSnackbar(data.message, { variant: 'error' });
        }
    }
    return {
        handlerSubmitModificar
    }
}