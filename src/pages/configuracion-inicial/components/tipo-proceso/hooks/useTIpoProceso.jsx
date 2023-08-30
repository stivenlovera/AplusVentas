import { Request } from "utils/http";

export const useTipoProceso = () => {
    const onList = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/tipo-asiento`,
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
    const onCreate = async (nivel, vPlanCuentaId) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/tipo-asiento/create`,
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
    const onStore = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/plan-cuenta`,
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
    const onEditar = async (id) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/tipo-asiento/editar/${id}`,
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
    const onUpdate = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/tipo-asiento/${values.id}`,
            initialValues: [],
            method: 'put',
            showError: true,         
            showSuccess: true,
            values:values
        });
        return {
            update: data,
            status: !!status
        };
    }
    const onDelete = async (id) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/plan-cuenta/${id}`,
            initialValues: [],
            method: 'delete',
            showError: true,
            showSuccess: true
        });
        return {
            destroy: data,
            status: !!status
        };
    }
    return {
        onList,
        onCreate,
        onStore,
        onEditar,
        onUpdate,
        onDelete
    }
}
