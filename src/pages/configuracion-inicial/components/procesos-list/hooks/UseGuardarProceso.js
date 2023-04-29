import { GuardarProcesoService } from "Services/api-ventas-erp/procesoService";
import { useSnackbar } from "notistack";

export const UseGuardarProceso = () => {
    const { enqueueSnackbar } = useSnackbar();
    const handlerSubmitGuardar = (values) => {
        ApiGuardar(values)
    }
    const ApiGuardar = async (values) => {
        console.log(values)
        const { data } = await GuardarProcesoService(values);
        if (data.status == 1) {
            enqueueSnackbar(data.message, { variant: 'success' });
        }
        else {
            enqueueSnackbar(data.message, { variant: 'error' });
        }
    }
    return {
        handlerSubmitGuardar,
    }
}