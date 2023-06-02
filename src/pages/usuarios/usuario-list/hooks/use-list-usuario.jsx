import { useState } from "react";
import { useSnackbar } from "notistack";
import { searchByProceso } from "pages/configuracion-inicial/components/procesos-list/utils/utilsProceso";
import { ListaUsuarioService } from "Services/api-ventas-erp/usuario";

export const UseListaUsuario = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [filteredItem, setFilteredItem] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    
    const filter = () => {
        const result = searchByProceso(filteredItem, searchValue);
        setFilteredItem(result);
    }
    const ApiListaUsuario = async () => {
        try {
            const { data } = await ListaUsuarioService();
            if (data.status == 1) {
                setFilteredItem(data.data);
            }
            else {
                enqueueSnackbar(data.message, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Error con el servidor', { variant: 'error' });
        }
    }
    return {
        filteredItem,
        setFilteredItem,
        searchValue,
        setSearchValue,
        filter,
        ApiListaUsuario
    }
}