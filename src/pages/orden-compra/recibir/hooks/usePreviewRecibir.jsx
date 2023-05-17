import { PreviewPagoCompraService, PreviewRecibirProductosService } from "Services/api-ventas-erp/ordenCompra";
import { useState } from "react";
import { useSnackbar } from "notistack";

export const UsePreviewOrdenCompraRecibir = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [almacenes, setAlmacenes] = useState([])
    const [previewPago, setPreviewPago] = useState({
        orderCompra: {
            id: 0,
            codigoOrden: '',
            vProveedoreId: 0,
            totalLiteral: '',
            total: 0,
            fechaCreacion: '',
            usuarioId: 0,
            nit: '4535345',
            telefono: '',
            asientoId: 0
        },
        productos: [],
        contabilidad: []
    })

    const ApiPreviewPago = async (orderCompraId) => {
        try {
            const { data } = await PreviewRecibirProductosService(orderCompraId);
            console.log(data)
            if (data.status == 1) {
                setPreviewPago({ ...data.data });
                setAlmacenes(data.data.almacenes)
            }
            else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Error con el servidor', { variant: 'error' });
        }
    }

    return {
        almacenes,
        previewPago,
        ApiPreviewPago
    }
}