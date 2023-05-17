import axios from "axios";

export async function ListaVentaServicio() {
    return await axios.get(`${process.env.REACT_APP_API}api/venta`);
}
export async function CreateVentaServicio() {
    return await axios.get(`${process.env.REACT_APP_API}api/venta/create`);
}
export async function StoreVentaServicio(values) {
    return await axios.post(`${process.env.REACT_APP_API}api/venta/store`, values);
}
export async function EditarVentaServicio(ventaId) {
    return await axios.get(`${process.env.REACT_APP_API}api/venta/edit/${ventaId}`);
}
export async function UpdateVentaServicio(values,ventaId) {
    return await axios.put(`${process.env.REACT_APP_API}api/venta/update/${ventaId}`, values);
}
export async function DeleteVentaServicio(ventaId) {
    return await axios.delete(`${process.env.REACT_APP_API}api/venta/delete/${ventaId}`);
}

/*Procesar Pago */
export async function PreviewPagoVentaService(id) {
    console.log('enviando id',id)
    return await axios.get(`${process.env.REACT_APP_API}api/venta/preview-pago/${id}`)
}
export async function ProcesarPagoVentaService(id, fecha) {
    return await axios.post(`${process.env.REACT_APP_API}api/venta/procesar-pago/${id}`, { fecha })
}