import { LoginService } from "Services/api-ventas-erp/authenticate";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setToken } from "reducers/Slice";

export const UseLogin = (usuario, password) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updateToken = (token) => {
        dispatch(
            setToken({
                token: token
            })
        )
    }
    const ApiLogin = async () => {
        try {
            const { data } = await LoginService(usuario, password);
            if (data.status == 1) {
                console.log(data)
                updateToken(data.data.token)
                navigate('/dashboard')
                enqueueSnackbar(data.message, { variant: 'success' });
            }
            else {

                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {

            enqueueSnackbar('Servidor desconectado', { variant: 'error' });
        }
    }
    return {
        ApiLogin,
    }
}