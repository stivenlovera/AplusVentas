//import { CrearOrdenCompraService } from "Services/api-ventas-erp/ordenCompra";
import { useState } from "react";
import { useSnackbar } from "notistack";
import moment from 'moment';
import { CreateVentaServicio } from "Services/api-ventas-erp/venta";

export const UseCreateVenta = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [create, setCreate] = useState({
        id: 0,
        descripcion: '',
        fecha:'',
        codigoVenta: '',
        VClienteId: '',
        montoliteral: '',
        total: 0,
        asientoId: '',
        usuario: '',
        nit: '',
        nombreAsiento: '',
        telefono: ''
    })
    const [clientes, setClientes] = useState([]);
    const [asientos, setAsiento] = useState([]);
    const [productos, setProductos] = useState([]);

    const ApiCrearVenta = async () => {
        try {
            const { data } = await CreateVentaServicio();
            console.log(data)
            if (data.status == 1) {
                setCreate({
                    ...create,
                    usuario: data.data.venta.usuario,
                    codigoVenta: data.data.venta.codigo,
                    descripcion: `Cotizacion ... ${data.data.venta.codigo}`,
                    fecha: moment().format('YYYY-MM-DD')
                });
                setClientes(data.data.clientes);
                setProductos(data.data.productos);
                setAsiento(data.data.asientos)
            }
            else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Error con el servidor', { variant: 'error' });
        }
    }

    return {
        create,
        clientes,
        asientos,
        productos,
        ApiCrearVenta
    }
}