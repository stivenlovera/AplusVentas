import { Request } from "utils/http";
export const UseUsuario = () => {
    const onDelete = async (id) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Persona/${id}`,
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
    const onCreate = async (id) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Usuario/${id}`,
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
        onDelete,
        onCreate
    }
}