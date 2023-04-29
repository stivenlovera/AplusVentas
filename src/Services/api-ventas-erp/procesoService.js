import axios from "axios";

export async function ObtenerProcesoService() {
    return await axios.get(`${process.env.REACT_APP_API}api/asiento`)
}
export async function CrearProcesoService() {
    return await axios.get(`${process.env.REACT_APP_API}api/asiento/create`)
}
export async function GuardarProcesoService({ nombreAsiento, tipoAsientoId, id, nombreTipoAsiento, cuentas }) {
    return await axios.post(`${process.env.REACT_APP_API}api/asiento`, { nombreAsiento, tipoAsientoId, id, nombreTipoAsiento, cuentas });
}
export async function ModificarProcesoService({ id, codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vProcesoId }) {
    return await axios.put(`${process.env.REACT_APP_API}api/asiento`, { id, codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vProcesoId });
}
export async function EditarProcesoService(id) {
    return await axios.delete(`${process.env.REACT_APP_API}api/asiento/editar`, {});
}
export async function EliminarProcesoService(id) {
    return await axios.delete(`${process.env.REACT_APP_API}api/asiento`, {});
}