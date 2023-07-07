import { UseProveedor } from "pages/proveedores/proveedores-list/hooks/useProveedor";
import { useState } from "react";

export const useAutocompleteProveedor = () => {
    //proveedores
    const [listaProveedores, setlistaProveedores] = useState([]);
    const [openAutoCompleteProveedores, setOpenAutoCompleteProveedores] = useState(false)
    const [loadingAutoCompleteProveedores, setLoadingAutoCompleteProveedores] = useState(false)
    const { List } = UseProveedor()
    const LoadListaProveedores = async () => {
        setLoadingAutoCompleteProveedores(true)
        const { lista, status } = await List()
        if (status) {
            setlistaProveedores(lista)
            setOpenAutoCompleteProveedores(true)
        }
        setLoadingAutoCompleteProveedores(false)
    }
    const refresListaProveedores = () => {
        setOpenAutoCompleteProveedores(false)
        setlistaProveedores([])
    }
    const isOptionEqualToValueProveedor = (option, value) => option.nombreProveedor === value.nombreProveedor
    const getOptionLabelProveedor = (option) => option.nombreProveedor

    return {
        listaProveedores,
        openAutoCompleteProveedores,
        loadingAutoCompleteProveedores,
        refresListaProveedores,
        isOptionEqualToValueProveedor,
        getOptionLabelProveedor,
        LoadListaProveedores
    }
}