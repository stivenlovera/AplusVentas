
import { GuardarPlanCuentaService } from "Services/api-ventas-erp/PlanCuentaService";
import { useSnackbar } from "notistack";
import { ErrorMesage } from "utils/ErrorAxios";

export const UseGuardarHijoPlanCuenta = (values) => {
    const { enqueueSnackbar } = useSnackbar();
    const ApiGuardar = async () => {
        let status = false;
        try {
            const { data } = await GuardarPlanCuentaService(values);
            if (data.status == 1) {
                status=true;
                enqueueSnackbar(data.message, { variant: 'success' })
            } else {
                enqueueSnackbar(data.message, { variant: 'error' })
            }
        } catch (error) {
            const message = ErrorMesage(error)
            enqueueSnackbar(message, { variant: 'error' });
        }
        return status;
    }
    return {
        ApiGuardar
    }
}