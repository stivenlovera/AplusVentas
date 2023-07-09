
import { UseAsiento } from "pages/configuracion-inicial/components/procesos-list/hooks/useAsientos";
import { useState } from "react";

export const useAutocompleteMetodoPago = () => {
    //MetodoPago
    
    const [listaMetodoPago, setlistaMetodoPago] = useState([]);
    const [openAutoCompleteMetodoPago, setOpenAutoCompleteMetodoPago] = useState(false)
    const [loadingAutoCompleteMetodoPago, setLoadingAutoCompleteMetodoPago] = useState(false)
    const { List } = UseAsiento()
    const LoadListaMetodoPago = async () => {
        setLoadingAutoCompleteMetodoPago(true)
        const { lista, status } = await List()
        if (status) {
            setlistaMetodoPago(lista)
            setOpenAutoCompleteMetodoPago(true)
            setLoadingAutoCompleteMetodoPago(false)
        }
    }
    const refresListaMetodoPago = () => {
        setOpenAutoCompleteMetodoPago(false)
        setlistaMetodoPago([])
    }
    const isOptionEqualToValueMetodoPago = (option, value) => option.nombreAsiento === value.nombreAsiento
    const getOptionLabelMetodoPago = (option) => option.nombreAsiento
    
    return {
        listaMetodoPago,
        openAutoCompleteMetodoPago,
        loadingAutoCompleteMetodoPago,
        refresListaMetodoPago,
        isOptionEqualToValueMetodoPago,
        getOptionLabelMetodoPago,
        LoadListaMetodoPago
    }
}