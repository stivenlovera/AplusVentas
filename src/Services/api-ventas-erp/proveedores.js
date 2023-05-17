import axios from "axios";

export async function CrearProveedorService() {
    return await axios.get(`${process.env.REACT_APP_API}api/proveedor/create`)
}
export async function ObtenerProveedorService() {
    return await axios.get(`${process.env.REACT_APP_API}api/proveedor`)
}
export async function GuardarProveedorService({ codigoProveedor, nombreProveedor, dirrecion, contacto, telefono, }) {
    return await axios.post(`${process.env.REACT_APP_API}api/proveedor`, { codigoProveedor, nombreProveedor, dirrecion, contacto, telefono });
}
export async function EditarProveedorService(id) {
    return await axios.get(`${process.env.REACT_APP_API}api/proveedor/editar/${id}`);
}
export async function ModificarProveedorService({ id, codigoProveedor, nombreProveedor, dirrecion, credito, telefono, planCuentaId, moneda }) {
    return await axios.put(`${process.env.REACT_APP_API}api/proveedor/${id}`, { id, codigoProveedor, nombreProveedor, dirrecion, credito, telefono, planCuentaId, moneda });
}
export async function EliminarProveedorService(id) {
    return await axios.delete(`${process.env.REACT_APP_API}api/proveedor/${id}`, {});
}