import { Request } from "utils/http";
import { UsuarioDto } from "interfaces/Interfaces";
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

    /**
     * 
     * @param {number} id id del usuario
     * @returns 
     */
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
    /**
     * 
     * @returns {{
     *              data:UsuarioDto[],
     *              status:boolean
     *          }} data
     */
    const onList = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Usuario`,
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

    const onEditar = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Persona`,
            initialValues: [],
            method: 'get',
            showError: true,
            showSuccess: false,
            values: values
        });
        return {
            data: data,
            status: !!status
        };
    }
    return {
        onDelete,
        onCreate,
        onList,
        onEditar
    }
}