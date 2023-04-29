
import { GuardarPlanCuentaService } from "Services/api-ventas-erp/PlanCuentaService";
import { useSnackbar } from "notistack";

export const UseGuardarHijoPlanCuenta = (values) => {
    const { enqueueSnackbar } = useSnackbar();
    const handlerSubmitGuardar = () => {
        ApiGuardar()
    }
    const ApiGuardar = async () => {
        console.log(values)
        const { data } = await GuardarPlanCuentaService(values);
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