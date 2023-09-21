export const initialStateDetalleProducto = {
    productoId: 0,
    codigoProducto: '',
    codigoBarra: '',
    nombreProducto: '',
    stockActual: 0,
    precioCompra: 0,
    utilidadMin: 0,
    precioVentaMin: 0,
    utilidadMax: 0,
    precioVentaMax: 0,
    categoria: {
        categoriaId: 1,
        nombre: '',
        izq: 1,
        der: 8
    },
    productoMaestro: {
        productoMaestroId: 0,
        nombre: '',
        categoriaId: 0
    },
    productoMaestroNombre: '',
    imagenes: [],
    atributos: []
}
export const initialStateSort = [{
    nombre: 'Nombre',
    column: 'nombre',
    order: 'asc'
},
{
    nombre: 'De mayor a menor precio',
    column: 'precioVentaMax',
    order: 'desc'
},
{
    nombre: 'De menor a mayor precio',
    column: 'precioVentaMax',
    order: 'asc'
}]