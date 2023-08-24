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
    return {
        onStore
    }
}