import { Request } from "utils/http";


export const UseCliente = () => {

    const List = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Clientes`,
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
    const Create = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Clientes/create`,
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
            endPoint: `${process.env.REACT_APP_API}api/Clientes`,
            initialValues: [],
            method: 'post',
            showError: true,
            showSuccess: true,
            values: values
        });
        return {
            data: data,
            status: !!status
        };
    }
    const Editar = async (id) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Clientes/editar/${id}`,
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
    const Update = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Clientes/${values.id}`,
            initialValues: [],
            method: 'put',
            showError: true,
            showSuccess: true,
            values: values
        });
        return {
            data: data,
            status: !!status
        };
    }
    const Delete = async (id) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Clientes/${id}`,
            initialValues: [],
            method: 'delete',
            showError: true,
            showSuccess: false
        });
        return {
            data: data,
            status: !!status
        };
    }

    return {
        List,
        Create,
        Store,
        Editar,
        Update,
        Delete
    }
}