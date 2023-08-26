import { Request } from "utils/http";

export const UseOrdenCompra = () => {

    const List = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra/venta`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        return {
            lista: data,
            status: !!status
        };
    }
    const Create = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra/create`,
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
    const Store = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra`,
            initialValues: [],
            method: 'post',
            showError: true,
            showSuccess: true,
            values: values
        });
        return {
            store: data,
            status: !!status
        };
    }
    const Editar = async (id) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra/editar/${id}`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        return {
            edit: data,
            status: !!status
        };
    }
    const Update = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra/${values.id}`,
            initialValues: [],
            method: 'put',
            showError: true,
            showSuccess: true,
            values: values
        });
        return {
            update: data,
            status: !!status
        };
    }
    const onDelete = async (ventaId) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra/${ventaId}`,
            initialValues: [],
            method: 'delete',
            showError: true,
            showSuccess: true
        });
        return {
            delete: data,
            status: !!status
        };
    }
    const PreviewPago = async (ventaId) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra/preview-pago/${ventaId}`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        return {
            venta: data,
            status: !!status
        };
    }
    const ProcesarPago = async (compraId, fecha) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra/procesar-pago/${compraId}`,
            initialValues: [],
            method: 'post',
            values: { fecha },
            showError: true,
            showSuccess: true
        });
        return {
            resultado: data,
            status: !!status
        };
    }
    const onPreviewOrdeCompra = async (compraId) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra/preview-recibir/${compraId}`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: true
        });
        return {
            compra: data,
            status: !!status
        };
    }
    const onStoreAlmacenOrdeCompra = async (compraId, productos) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/orden-compra/store-recibir/${compraId}`,
            initialValues: [],
            method: 'post',
            values: productos,
            showError: true,
            showSuccess: true
        });
        return {
            compra: data,
            status: !!status
        };
    }
    return {
        List,
        Create,
        Store,
        Editar,
        Update,
        onDelete,
        PreviewPago,
        ProcesarPago,
        onPreviewOrdeCompra,
        onStoreAlmacenOrdeCompra
    }
}