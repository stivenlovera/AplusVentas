import { ObtenerPlanCuentaService } from "Services/api-ventas-erp/PlanCuentaService";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { ErrorMesage } from "utils/ErrorAxios";

export const UseListPlanCuenta = () => {
  const [lista, setLista] = useState([])
  const { enqueueSnackbar } = useSnackbar();
  const apiListar = async () => {
    let status = false;
    try {
      const { data } = await ObtenerPlanCuentaService();
      if (data.status == 1) {
        setLista(data.data);
        status = true;
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
    lista,
    apiListar
  }
}
