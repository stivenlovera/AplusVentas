export const initialAlmacen = {
    id: 0,
    codigoAlmacen: '',
    dirrecion: '',
    nombreAlmacen: ''
};
export const initialProductoAlmacen = {
    productomaestroid: 0,
    productoid: 0,
    nombre: '',
    codigoProducto: '',
    nombreProducto: '',
    categoriaid: 0,
    nombrecategoria: ''
}
export const initialLisProductoAlmacen = {
    producto: initialProductoAlmacen,
    productoAlmacen: []
};

export const initialDetalleAlmacen = {
    detallealmacenid:0,
    serie: '',
    fecharegistro: '',
    estadoVendido: 0,
    almacen: initialAlmacen
};
