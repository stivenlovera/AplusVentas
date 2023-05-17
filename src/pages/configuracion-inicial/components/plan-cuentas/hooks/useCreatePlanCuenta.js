import { CrearPlanCuentaService } from "Services/api-ventas-erp/PlanCuentaService";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { ErrorMesage } from "utils/ErrorAxios";

export const UseCreatePlanCuenta = (nivel = 0, padre = 0) => {
    const { enqueueSnackbar } = useSnackbar();
    const [create, setCreate] = useState({
        id: "",
        codigo: '',
        nombreCuenta: "",
        moneda: '1',
        valor: '1',
        codigoIdentificador: '0',
        nivel: 0,
        debe: '0',
        haber: '0',
        vPlanCuentaId: padre,
    })

    const apiCreate = async () => {
        let status = false;
        try {
            const { data } = await CrearPlanCuentaService(nivel,padre);
            if (data.status == 1) {
                status = true;
                setCreate({ ...create, codigo: data.data.codigo, nivel: data.data.nivel })
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
        create,
        apiCreate,
    }
}