import { clienteListFake } from "pages/clientes/clientes-list/components/cliente-fake";

export const initialVenta = {
    id: 0,
    fecha:moment().format('YYYY/MM/DD'),
    descripcion: '',
    codigoVenta: '',
    vCliente: clienteListFake,
    montoliteral: '',
    total: 0,
    asiento: '',
    usuario: '',
    nit: '',
    nombreAsiento: '',
    telefono: '',
    productos: null
}