import axios from "axios";

export async function obtenerClasificacionIdService(id) {
    return await axios.get(`${process.env.REACT_APP_API}api/categoria/categoria-padre/${id}`)
}
export async function CrearClasificacionService() {
    return await axios.get(`${process.env.REACT_APP_API}api/categoria/create`)
}
export async function ObtenerClasificacionService() {
    return await axios.get(`${process.env.REACT_APP_API}api/categoria`)
}
export async function GuardarClasificacionService({
    id,
    nombreClasificacion,
    clasificacionId
}) {
    return await axios.post(`${process.env.REACT_APP_API}api/categoria`, {
        id,
        nombreClasificacion,
        clasificacionId
    });
}
export const EditarClasificacionService = async (id) => {
    return await axios.get(`${process.env.REACT_APP_API}api/categoria/editar/${id}`);
}

export async function ModificarClasificacionService({
    id,
    nombreClasificacion,
    clasificacionId
}) {
    return await axios.put(`${process.env.REACT_APP_API}api/categoria/${id}`, {
        id,
        nombreClasificacion,
        clasificacionId
    });
}
export const EliminarClasificacionService = async (id) => {
    return await axios.delete(`${process.env.REACT_APP_API}api/categoria/${id}`, {});
}

export const ListaClasificacionService = () => {
    return `${process.env.REACT_APP_API}api/categoria`;
}
export const CreateClasificacionService = () => {
    return `${process.env.REACT_APP_API}api/categoria/create`;
}
export const StoreClasificacionService = () => {
    return `${process.env.REACT_APP_API}api/categoria`;
}
export const EditarClasificacionService1 = (id) => {
    return `${process.env.REACT_APP_API}api/categoria/${id}`;
}
export const UpdateClasificacionService = (id) => {
    return `${process.env.REACT_APP_API}api/categoria/${id}`;
}
export const DeleteClasificacionService = (id) => {
    return `${process.env.REACT_APP_API}api/categoria/${id}`;
}

/*Lista permisos */
export const Listapermisos = () => {
    return `${process.env.REACT_APP_API}api/Permiso`;
}