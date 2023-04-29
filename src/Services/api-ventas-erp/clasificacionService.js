import axios from "axios";

export async function obtenerClasificacionIdService(id) {
    return await axios.get(`${process.env.REACT_APP_API}api/Clasificacion/clasificacion-padre/${id}`)
}
export async function CrearClasificacionService() {
    return await axios.get(`${process.env.REACT_APP_API}api/Clasificacion/create`)
}
export async function ObtenerClasificacionService() {
    return await axios.get(`${process.env.REACT_APP_API}api/Clasificacion`)
}
export async function GuardarClasificacionService({
    id,
    nombreClasificacion,
    clasificacionId
}) {
    return await axios.post(`${process.env.REACT_APP_API}api/Clasificacion`, {
        id,
        nombreClasificacion,
        clasificacionId
    });
}
export async function EditarClasificacionService(id) {
    return await axios.get(`${process.env.REACT_APP_API}api/Clasificacion/editar/${id}`);
}
export async function ModificarClasificacionService({
    id,
    nombreClasificacion,
    clasificacionId
}) {
    return await axios.put(`${process.env.REACT_APP_API}api/Clasificacion/${id}`, {
        id,
        nombreClasificacion,
        clasificacionId
    });
}
export async function EliminarClasificacionService(id) {
    return await axios.delete(`${process.env.REACT_APP_API}api/Clasificacion/${id}`, {});
}