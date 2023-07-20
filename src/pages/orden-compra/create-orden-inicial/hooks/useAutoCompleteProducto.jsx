import { UseProducto } from "pages/productos/hooks/useProducto";
import { useState } from "react";

export const useAutocompleteProducto = () => {
    //proveedores
    const [listaProductos, setlistaProductos] = useState([]);
    const [openAutoCompleteProductos, setOpenAutoCompleteProductos] = useState(false)
    const [loadingAutoCompleteProductos, setLoadingAutoCompleteProductos] = useState(false)
    const { List } = UseProducto()
    const LoadListaProductos = async () => {
        setLoadingAutoCompleteProductos(true)
        const { lista, status } = await List()
        if (status) {
            setlistaProductos(lista)
            setOpenAutoCompleteProductos(true)
        }
        setLoadingAutoCompleteProductos(false)
    }
    const refresListaProductos = () => {
        setOpenAutoCompleteProductos(false)
        setlistaProductos([])
    }
    const isOptionEqualToValueProducto = (option, value) => option.nombreProducto === value.nombreProducto
    const getOptionLabelProducto = (option) => option.nombreProducto

    return {
        listaProductos,
        openAutoCompleteProductos,
        loadingAutoCompleteProductos,
        refresListaProductos,
        isOptionEqualToValueProducto,
        getOptionLabelProducto,
        LoadListaProductos
    }
}