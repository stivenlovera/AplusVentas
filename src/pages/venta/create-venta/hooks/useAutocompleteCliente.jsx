import { UseCliente } from "pages/clientes/hooks/useCliente";
import { useState } from "react";

export const useAutocompleteCliente = () => {
    //proveedores
    const [listaCliente, setlistaCliente] = useState([]);
    const [openAutoCompleteCliente, setOpenAutoCompleteCliente] = useState(false)
    const [loadingAutoCompleteCliente, setLoadingAutoCompleteCliente] = useState(false)
    const { onList } = UseCliente()
    const LoadListaCliente = async () => {
        setLoadingAutoCompleteCliente(true)
        const { lista, status } = await onList()
        if (status) {
            setlistaCliente(lista)
            setOpenAutoCompleteCliente(true)
        }
        setLoadingAutoCompleteCliente(false)
    }
    const refreshListaCliente = () => {
        setOpenAutoCompleteCliente(false)
        setlistaCliente([])
    }
    const isOptionEqualToValueCliente = (option, value) => option.nombreCompletoCliente === value.nombreCompletoCliente
    const getOptionLabelCliente= (option) => option.nombreCompletoCliente

    return {
        listaCliente,
        openAutoCompleteCliente,
        loadingAutoCompleteCliente,
        refreshListaCliente,
        isOptionEqualToValueCliente,
        getOptionLabelCliente,
        LoadListaCliente
    }
}