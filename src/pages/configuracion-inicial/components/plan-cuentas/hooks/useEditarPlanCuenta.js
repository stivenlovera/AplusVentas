
import { EditarPlanCuentaService } from "Services/api-ventas-erp/PlanCuentaService";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { ErrorMesage } from "utils/ErrorAxios";

export const UseEditarPlanCuenta = (id) => {
    const { enqueueSnackbar } = useSnackbar();
    const [editar, setEditar] = useState({
        id: "",
        codigo: '',
        nombreCuenta: "",
        moneda: '1',
        valor: '1',
        codigoIdentificador: '0',
        nivel: '0',
        debe: '0',
        haber: '0',
        vPlanCuentaId: '0',
    })
    const apiEditar = async () => {
        let status = false;
        try {
            const { data } = await EditarPlanCuentaService(id);
            if (data.status == 1) {
                status=true;
                setEditar(data.data)
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
        editar,
        apiEditar,
    }
}