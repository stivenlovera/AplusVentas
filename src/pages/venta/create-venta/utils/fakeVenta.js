import { initialStateCliente } from "pages/clientes/clientes-list/components/cliente-fake";
import moment from 'moment';

export const initialCotizacion = {
    id: 0,
    fecha: moment().format('dd/mm/yyyy'),
    descripcion: '',
    codigoVenta: '',
    vCliente: initialStateCliente,
    montoliteral: '',
    total: 0,
    asiento: {
        tipoAsientoId: 0,
        asientoId: 0,
        nombreTipoAsiento: '',
        nombreAsiento: ''
    },
    usuario: '',
    nit: '',
    telefono: '',
    fechaCreacion: '',
    montoliteral: '',
    productos: []
}