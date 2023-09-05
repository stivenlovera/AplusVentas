import { Request } from "utils/http";

export const UseDetalleAlmacen = () => {
    const onStore = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/detalle-almacen`,
            values: values,
            initialValues: [],
            method: 'post',
            showError: true,
            showSuccess: true
        });
        return {
            data: data,
            status: !!status
        };
    }
    const onUpdate = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/detalle-almacen/${values.detallealmacenid}`,
            values: values,
            initialValues: [],
            method: 'put',
            showError: true,
            showSuccess: true
        });
        return {
            data: data,
            status: !!status
        };
    }
    const onGetPendienteAlmacen = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/detalle-almacen/pendientes-serializar`,
            values: values,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        return {
            data: data,
            status: !!status
        };
    }
    const onGetProductoAlmacen = async (productoId) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/detalle-almacen/producto-almacen/${productoId}`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        return {
            data: data,
            status: !!status
        };
    }
    return {
        onStore,
        onUpdate,
        onGetPendienteAlmacen,
        onGetProductoAlmacen
    }
}