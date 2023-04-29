import axios from "axios";

export async function ObtenerProcesoPlanCuentaService() {
    return await axios.get(`${process.env.REACT_APP_API}api/asiento-plan-cuenta`)
}
export async function CrearProcesoPlanCuentaService(nivel, vProcesoPlanCuentaId) {
    return await axios.get(`${process.env.REACT_APP_API}api/asiento-plan-cuenta`)
}
export async function GuardarProcesoPlanCuentaService({ id, codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vProcesoPlanCuentaId }) {
    return await axios.post(`${process.env.REACT_APP_API}api/asiento-plan-cuenta`, { codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vProcesoPlanCuentaId });
}
export async function ModificarProcesoPlanCuentaService({ id, codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vProcesoPlanCuentaId }) {
    return await axios.put(`${process.env.REACT_APP_API}api/asiento-plan-cuenta`, { id, codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vProcesoPlanCuentaId });
}
export async function EditarProcesoPlanCuentaService(id) {
    return await axios.delete(`${process.env.REACT_APP_API}api/asiento-plan-cuenta/editar`, {});
}
export async function EliminarProcesoPlanCuentaService(id) {
    return await axios.delete(`${process.env.REACT_APP_API}api/asiento-plan-cuenta`, {});
}