
import { GuardarPlanCuentaService } from "Services/api-ventas-erp/PlanCuentaService";
import { useSnackbar } from "notistack";

export const UseGuardarPadrePlanCuenta = (values) => {
    const { enqueueSnackbar } = useSnackbar();
    const handlerSubmitGuardarPadre = () => {
        ApiGuardar()
    }
    const ApiGuardar = async () => {
        const { data } = await GuardarPlanCuentaService(values);
        if (data.status == 1) {
            enqueueSnackbar(data.message, { variant: 'success' });
        }
        else {
            enqueueSnackbar(data.message, { variant: 'error' });
        }
    }
    return {
        handlerSubmitGuardarPadre
    }
}