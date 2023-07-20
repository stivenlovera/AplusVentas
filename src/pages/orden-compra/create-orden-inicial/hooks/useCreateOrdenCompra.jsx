import { CrearOrdenCompraService } from "Services/api-ventas-erp/ordenCompra";
import { useState } from "react";
import { useSnackbar } from "notistack";
import moment from 'moment';

export const UseCreateOrdenCompra = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [create, setCreate] = useState({
        id: 0,
        descripcion: '',
        fecha:'',
        codigoOrden: '',
        VProveedoreId: '',
        nombreProveedor: '',
        montoliteral: '',
        total: 0,
        asientoId: '',
        usuario: '',
        nit: '',
        nombreAsiento: '',
        telefono: ''
    })
    const [proveedores, setProveedores] = useState([]);
    const [asientos, setAsiento] = useState([]);
    const [productos, setProductos] = useState([]);

    const ApiCrearOrdenCompra = async () => {
        try {
            const { data } = await CrearOrdenCompraService();
            if (data.status == 1) {
                setCreate({
                    ...create,
                    usuario: data.data.ordenCompra.usuario,
                    codigoOrden: data.data.ordenCompra.codigoOrden,
                    descripcion: `Order compra ... ${data.data.ordenCompra.codigoOrden}`,
                    fecha: moment().format('YYYY-MM-DD')
                });
                setProveedores(data.data.proveedores);
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
        proveedores,
        asientos,
        productos,
        ApiCrearOrdenCompra
    }
}