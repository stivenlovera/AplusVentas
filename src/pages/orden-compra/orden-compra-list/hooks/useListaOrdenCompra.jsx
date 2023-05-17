import { useState } from "react";
import { useSnackbar } from "notistack";
import { ObtenerOrdenCompraService } from "Services/api-ventas-erp/ordenCompra";
import { searchByProceso } from "pages/configuracion-inicial/components/procesos-list/utils/utilsProceso";

export const UseListaOrdenCompra = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [filteredItem, setFilteredItem] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const filter = () => {
        const result = searchByProceso(filteredItem, searchValue);
        setFilteredItem(result);
    }
    const ApiListaOrdenCompra = async () => {
        try {
            const { data } = await ObtenerOrdenCompraService();
            console.log(data)
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
        ApiListaOrdenCompra
    }
}