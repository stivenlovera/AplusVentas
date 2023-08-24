export const initialStateOrdenCompra = {
    id: 0,
    fecha: '',
    descripcion: '',
    codigoOrden: '',
    nombreUsuario: '',
    nit: '',
    telefono: '',
    proveedor: {
        id: 0,
        codigoProveedor: '',
        nit: '',
        nombreProveedor: '',
        contacto: '',
        telefono: '',
    },
    montoliteral: '',
    stockActual: 0,
    total: 0,
    estadoId: 0,
    asiento: {
        tipoAsientoId: 0,
        asientoId: 0,
        nombreTipoAsiento: '',
        nombreAsiento: ''
    },
    usuario: {
        usuarioId: 0,
        usuario: '',
        nombre: '',
        apellido: '',
    },
    productos: []
}
export const compraAlmacenProducto =
{
    ordenCompraId: 0,
    codigoOrden:'',
    productos: []
}