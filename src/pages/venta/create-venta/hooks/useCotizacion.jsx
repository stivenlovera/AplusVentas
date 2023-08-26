import { Request } from "utils/http";

export const UseCotizacion = () => {

    const List = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/venta`,
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
            endPoint: `${process.env.REACT_APP_API}api/venta/create`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false
        });
        return {
            create: data,
            status: !!status
        };
    }
    const Store = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/venta/store`,
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
            endPoint: `${process.env.REACT_APP_API}api/venta/editar/${id}`,
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
            endPoint: `${process.env.REACT_APP_API}api/venta/update/${values.id}`,
            initialValues: [],
            method: 'put',
            showError: true,
            showSuccess: false,
            values: values
        });
        return {
            update: data,
            status: !!status
        };
    }
    const Delete = async (id) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/venta/${id}`,
            initialValues: [],
            method: 'delete',
            showError: true,
            showSuccess: false
        });
        return {
            delete: data,
            status: !!status
        };
    }
    const PreviewPago = async (ventaId) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/venta/preview-pago/${ventaId}`,
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
    const ProcesarPago = async (id, fecha) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/venta/procesar-pago/${id}`,
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

    return {
        List,
        Create,
        Store,
        Editar,
        Update,
        Delete,
        PreviewPago,
        ProcesarPago
    }
}