import { useState } from "react";
import { useSnackbar } from "notistack";
import { searchByVenta } from "../utils/searchByVenta";
import { ListaVentaServicio } from "Services/api-ventas-erp/venta";

export const UseListaVenta = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [filteredItem, setFilteredItem] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const filter = () => {
        const result = searchByVenta(filteredItem, searchValue);
        setFilteredItem(result);
    }
    const ApiListaVenta = async () => {
        try {
            const { data } = await ListaVentaServicio();
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
        ApiListaVenta
    }
}