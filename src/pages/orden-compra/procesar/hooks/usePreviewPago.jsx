import { PreviewPagoCompraService } from "Services/api-ventas-erp/ordenCompra";
import { useState } from "react";
import { useSnackbar } from "notistack";

export const UsePreviewOrdenCompraPago = () => {
    const { enqueueSnackbar } = useSnackbar();
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
        productos: [
            /* {
                nombreProducto: '',
                cantidad: 0,
                precioCompra: 0,
                precioTotal: 0
            } */
        ],
        contabilidad: [
            /* {
                cuenta: '',
                codigo: 0,
                debe: 0,
                haber: 0
            },
            {
                cuenta: '',
                codigo: 0,
                debe: 0,
                haber: 0
            } */
        ]
    })

    const ApiPreviewPago = async (orderCompraId) => {
        try {
            const { data } = await PreviewPagoCompraService(orderCompraId);
            console.log(data)
            if (data.status == 1) {
                setPreviewPago({ ...data.data });
            }
            else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Error con el servidor', { variant: 'error' });
        }
    }

    return {
        previewPago,
        ApiPreviewPago
    }
}