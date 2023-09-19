import { Request } from "utils/http";

export const UseClasificacion = () => {

    const onList = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/categoria`,
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
    return {
        onList
    }
}