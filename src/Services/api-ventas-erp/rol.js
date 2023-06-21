export const ListaRolService = () => {
    return `${process.env.REACT_APP_API}api/Rol`;
}
export const CreateRolService = () => {
    return `${process.env.REACT_APP_API}api/Rol/create`;
}
export const StoreRolService = () => {
    return `${process.env.REACT_APP_API}api/Rol`;
}
export const EditarRolService = (id) => {
    return `${process.env.REACT_APP_API}api/Rol/${id}`;
}
export const UpdateRolService = (id) => {
    return `${process.env.REACT_APP_API}api/Rol/${id}`;
}
export const DeleteRolService = (id) => {
    return `${process.env.REACT_APP_API}api/Rol/${id}`;
}

/*Lista permisos */
export const Listapermisos = () => {
    return `${process.env.REACT_APP_API}api/Permiso`;
}