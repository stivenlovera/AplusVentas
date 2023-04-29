
import { GuardarClasificacionService } from "Services/api-ventas-erp/clasificacionService";
import { useSnackbar } from "notistack";

export const UseGuardarClasificacion = (values) => {
    const { enqueueSnackbar } = useSnackbar();
    const handlerSubmitGuardar = () => {
        ApiGuardar()
    }
    const ApiGuardar = async () => {
        const { data } = await GuardarClasificacionService(values);
        if (data.status == 1) {
            enqueueSnackbar(data.message, { variant: 'success' });
        }
        else {
            enqueueSnackbar(data.message, { variant: 'error' });
        }
    }
    return {
        handlerSubmitGuardar
    }
}