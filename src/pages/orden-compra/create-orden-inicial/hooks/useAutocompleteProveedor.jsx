import { UseProveedor } from "pages/proveedores/proveedores-list/hooks/useProveedor";
import { useState } from "react";

export const useAutocompleteProveedor = (nameToValue, onList) => {
    //proveedores
    const [listaProveedores, setlistaProveedores] = useState([]);
    const [openAutoCompleteProveedores, setOpenAutoCompleteProveedores] = useState(false)
    const [loadingAutoCompleteProveedores, setLoadingAutoCompleteProveedores] = useState(false)

    const LoadListaProveedores = async () => {
        setLoadingAutoCompleteProveedores(true)
        const { lista, status } = await onList()
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
    const isOptionEqualToValueProveedor = (option, value) => option[nameToValue] === value[nameToValue]
    const getOptionLabelProveedor = (option) => option[nameToValue]

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