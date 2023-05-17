import { useState } from "react";
import { useSnackbar } from "notistack";
import { PreviewPagoVentaService } from "Services/api-ventas-erp/venta";

export const UsePreviewPagoVenta = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [previewPago, setPreviewPago] = useState({
        venta: {
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

    const ApiPreviewPago = async (ventaId) => {
        try {
            const { data } = await PreviewPagoVentaService(ventaId);
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