
/* export const UseAuthenticate = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useState({
        usuario: '',
        nombre: '',
        apellido: '',
        dirrecion: ''
    })

    const ApiAuthenticar = async () => {
        try {
            const { data } = await Authenticate();
            console.log(data)
            if (data.status == 1) {
                setUser(data.data)
                console.log(data.data)
            }
            else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Error con el servidor', { variant: 'error' });
        }
    }
    return {
        user,
        ApiAuthenticar
    }
} */

import { Request } from "utils/http";

export const UseAuthenticate = () => {

    const GetAuthenticate = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Autenticacion/ObtenerDatosUsuario`,
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
    const Login = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/Producto/create`,
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

    return {
        GetAuthenticate,
        Login
    }
}