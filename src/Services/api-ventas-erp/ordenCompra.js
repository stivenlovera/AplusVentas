import axios from "axios";

export async function CrearOrdenCompraService() {
    return await axios.get(`${process.env.REACT_APP_API}api/orden-compra/create`)
}
export async function ObtenerOrdenCompraService() {
    return await axios.get(`${process.env.REACT_APP_API}api/orden-compra`)
}
export async function GuardarOrdenCompraService(values) {
    return await axios.post(`${process.env.REACT_APP_API}api/orden-compra`, values);
}
export async function EditarOrdenCompraService(id) {
    return await axios.get(`${process.env.REACT_APP_API}api/orden-compra/editar/${id}`);
}
export async function ModificarOrdenCompraService({ id, codigoProveedor, nombreProveedor, dirrecion, credito, telefono, planCuentaId, moneda }) {
    return await axios.put(`${process.env.REACT_APP_API}api/orden-compra/${id}`, { id, codigoProveedor, nombreProveedor, dirrecion, credito, telefono, planCuentaId, moneda });
}
export async function EliminarOrdenCompraService(id) {
    return await axios.delete(`${process.env.REACT_APP_API}api/orden-compra/${id}`, {});
}

/*Procesar Pago */
export async function PreviewPagoCompraService(id) {
    return await axios.get(`${process.env.REACT_APP_API}api/orden-compra/preview-pago/${id}`)
}
export async function ProcesarPagoCompraService(id, fecha) {
    return await axios.post(`${process.env.REACT_APP_API}api/orden-compra/procesar-pago/${id}`, { fecha })
}

/*Proceso de recibir */
export async function PreviewRecibirProductosService(id) {
    return await axios.get(`${process.env.REACT_APP_API}api/orden-compra/preview-recibir/${id}`)
}
export async function StoreEntradaAlmacenService(id, productos) {
    return await axios.post(`${process.env.REACT_APP_API}api/orden-compra/store-recibir/${id}`, { productos: productos })
}