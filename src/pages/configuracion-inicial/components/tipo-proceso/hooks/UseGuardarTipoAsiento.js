import { GuardarTipoAsientoService } from "Services/api-ventas-erp/tipoAsiento";
import { useSnackbar } from "notistack";

export const UseGuardarTipoAsiento = () => {
    const { enqueueSnackbar } = useSnackbar();
    const handlerSubmitGuardar = (values) => {
        ApiGuardar(values)
    }
    const ApiGuardar = async (values) => {
        const { data } = await GuardarTipoAsientoService(values);
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