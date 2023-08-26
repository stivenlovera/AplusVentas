import { Request } from "utils/http";


export const UseMovimiento = () => {
    const ListGeneral = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/movimientos/generales`,
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
    const ListGeneralCuenta = async (values) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/movimientos/cuenta`,
            values: values,
            initialValues: [],
            method: 'post',
            showError: true,
            showSuccess: false
        });
        return {
            lista: data,
            status: !!status
        };
    }
    return {
        ListGeneral,
        ListGeneralCuenta
    }
}