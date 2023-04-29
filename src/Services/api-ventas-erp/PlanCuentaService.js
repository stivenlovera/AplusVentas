import axios from "axios";

export async function ObtenerPlanCuentaService() {
    return await axios.get(`${process.env.REACT_APP_API}api/plan-cuenta`)
}
export async function CrearPlanCuentaService(nivel, vPlanCuentaId) {
    return await axios.get(`${process.env.REACT_APP_API}api/plan-cuenta/create?nivel=${nivel}&padre=${vPlanCuentaId}`)
}
export async function GuardarPlanCuentaService({ codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vPlanCuentaId }) {
    return await axios.post(`${process.env.REACT_APP_API}api/plan-cuenta`, { codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vPlanCuentaId });
}
export async function GuardarPlanCuentaHijoService({ id, codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vPlanCuentaId }) {
    return await axios.post(`${process.env.REACT_APP_API}api/plan-cuenta?padre=${id}`, { codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vPlanCuentaId });
}
export async function ModificarPlanCuentaService({ id, codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vPlanCuentaId }) {
    return await axios.put(`${process.env.REACT_APP_API}api/plan-cuenta/${id}`, { id, codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vPlanCuentaId });
}
export async function EditarPlanCuentaService(id) {
    return await axios.delete(`${process.env.REACT_APP_API}api/plan-cuenta/editar/${id}`, {});
}
export async function EliminarPlanCuentaService(id) {
    return await axios.delete(`${process.env.REACT_APP_API}api/plan-cuenta/${id}`, {});
}