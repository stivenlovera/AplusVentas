import axios from "axios";

export async function CrearClienteService() {
    return await axios.get(`${process.env.REACT_APP_API}api/clientes/create`)
}
export async function ObtenerClienteService() {
    return await axios.get(`${process.env.REACT_APP_API}api/clientes`)
}
export async function GuardarClienteService({
    id,
    ci,
    codigoCliente,
    nombreCliente,
    correoElectronico,
    telefono,
    dirrecion,
    lineaCredito,
    planCuentaId,
    monedaId
}) {
    return await axios.post(`${process.env.REACT_APP_API}api/clientes`, {
        id: id,
        ci: ci,
        codigoCliente: codigoCliente,
        nombreCliente: nombreCliente,
        correoElectronico: correoElectronico,
        telefono: telefono,
        dirrecion: dirrecion,
        lineaCredito: lineaCredito,
        planCuentaId: planCuentaId,
        monedaId: monedaId,
    });
}
export async function EditarClienteService(id) {
    return await axios.get(`${process.env.REACT_APP_API}api/clientes/editar/${id}`);
}
export async function ModificarClienteService({
    id,
    ci,
    codigoCliente,
    nombreCliente,
    correoElectronico,
    telefono,
    dirrecion,
    lineaCredito,
    planCuentaId,
    monedaId
}) {
    return await axios.put(`${process.env.REACT_APP_API}api/clientes/${id}`, {
        id: id,
        ci: ci,
        codigoCliente: codigoCliente,
        nombreCliente: nombreCliente,
        correoElectronico: correoElectronico,
        telefono: telefono,
        dirrecion: dirrecion,
        lineaCredito: lineaCredito,
        planCuentaId: planCuentaId,
        monedaId: monedaId
    });
}
export async function EliminarClienteService(id) {
    return await axios.delete(`${process.env.REACT_APP_API}api/clientes/${id}`, {});
}