import { enqueueSnackbar } from 'notistack';
import axios from "axios";

export async function Request({ endPoint, initialValues, method, showError, showSuccess, values }) {
    try {
        const { data } = await axios({
            method: method,
            url: endPoint,
            data: values
        });
        if (data.status == 1) {
            if (showSuccess) {
                enqueueSnackbar(data.message, { variant: 'success' });
            }
            console.log('Status Todo bien 1', data);
            return data;
        } else {
            if (showError) {
                enqueueSnackbar(data.message, { variant: 'error' });
            }

            console.log('Status con error 0', data, initialValues);
            return { ...data, data: initialValues };
        }
    } catch (e) {
        console.log(e?.response)
        if (axios.isAxiosError(e)) {
            console.log('error reconocido')
            if (!e?.response) {
                enqueueSnackbar('Error conexion', { variant: 'error' });
            }
            else {
                console.log(e.response?.status)
                switch (e.response?.status) {
                    case 401:
                        enqueueSnackbar('NO authenticate', { variant: 'error' });
                        break;
                    case 400:
                        enqueueSnackbar('Error Validacion', { variant: 'error' });
                        return e.response?.data
                        break;
                    case 403:
                        enqueueSnackbar('Error Desconectado', { variant: 'error' });
                        break;
                    default:
                        break;
                }
            }
        }
        var response = {
            data: initialValues,
            message: "Error de conexion con el servidor",
            status: 0
        }
        return response;
    }
};