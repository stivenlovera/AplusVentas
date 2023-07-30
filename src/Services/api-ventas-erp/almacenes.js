export const ListaAlmacenService = () => {
    return `${process.env.REACT_APP_API}api/almacen`;
}
export const CreateAlmacenService = () => {
    return `${process.env.REACT_APP_API}api/almacen/create`;
}
export const StoreAlmacenService = () => {
    return `${process.env.REACT_APP_API}api/almacen`;
}
export const EditarRolService = (id) => {
    return `${process.env.REACT_APP_API}api/almacen/${id}`;
}
export const UpdateRolService = (id) => {
    return `${process.env.REACT_APP_API}api/almacen/${id}`;
}
export const DeleteRolService = (id) => {
    return `${process.env.REACT_APP_API}api/almacen/${id}`;
}
export const GetProductsService = (id) => {
    return `${process.env.REACT_APP_API}api/almacen/obtenerProductos/${id}`;
}
export const GetProductsListService = () => {
    return `${process.env.REACT_APP_API}api/almacen/obtenerListadoProductosAlmacen`;
}

