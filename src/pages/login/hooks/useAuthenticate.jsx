import { CrearOrdenCompraService } from "Services/api-ventas-erp/ordenCompra";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { Authenticate } from "Services/api-ventas-erp/authenticate";

export const UseAuthenticate = () => {
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
}