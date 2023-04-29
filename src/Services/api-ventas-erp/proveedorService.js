import axios from "axios";

export async function CrearProductoService() {
    return await axios.get(`${process.env.REACT_APP_API}api/producto/create`)
}
export async function ObtenerProductoService() {
    return await axios.get(`${process.env.REACT_APP_API}api/producto`)
}
export async function GuardarProductoService(values) {
    return await axios.post(`${process.env.REACT_APP_API}api/producto`, values);
}
export async function EditarProductoService(id) {
    return await axios.get(`${process.env.REACT_APP_API}api/producto/editar/${id}`);
}
export async function ModificarProductoService({
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
    return await axios.put(`${process.env.REACT_APP_API}api/producto/${id}`, {
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
export async function EliminarProductoService(id) {
    return await axios.delete(`${process.env.REACT_APP_API}api/producto/${id}`, {});
}