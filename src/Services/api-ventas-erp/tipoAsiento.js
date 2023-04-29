import axios from "axios";

export async function ObtenerTipoAsientoService() {
    return await axios.get(`${process.env.REACT_APP_API}api/tipo-asiento`)
}
export async function CrearTipoAsientoService() {
    return await axios.get(`${process.env.REACT_APP_API}api/tipo-asiento/create`)
}
export async function GuardarTipoAsientoService({ id, nombreTipoAsiento }) {
    return await axios.post(`${process.env.REACT_APP_API}api/tipo-asiento`, {id, nombreTipoAsiento });
}
export async function ModificarTipoAsientoService({ id, nombreTipoAsiento }) {
    return await axios.put(`${process.env.REACT_APP_API}api/tipo-asiento`,{id, nombreTipoAsiento });
}
export async function EditarTipoAsientoService(id) {
    return await axios.get(`${process.env.REACT_APP_API}api/tipo-asiento/editar/${id}` );
}
export async function EliminarTipoAsientoService(id) {
    return await axios.delete(`${process.env.REACT_APP_API}api/tipo-asiento`, {});
}