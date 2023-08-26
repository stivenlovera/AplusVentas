
import { useProceso } from "pages/configuracion-inicial/components/procesos-list/hooks/useProceso";
import { useState } from "react";

export const useAutocompleteMetodoPago = () => {
    //MetodoPago
    
    const [listaMetodoPago, setlistaMetodoPago] = useState([]);
    const [openAutoCompleteMetodoPago, setOpenAutoCompleteMetodoPago] = useState(false)
    const [loadingAutoCompleteMetodoPago, setLoadingAutoCompleteMetodoPago] = useState(false)
    const { List } = useProceso()
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
export const useAutocompleteMetodoPagoVenta = () => {
    //MetodoPago
    
    const [listaMetodoPago, setlistaMetodoPago] = useState([]);
    const [openAutoCompleteMetodoPago, setOpenAutoCompleteMetodoPago] = useState(false)
    const [loadingAutoCompleteMetodoPago, setLoadingAutoCompleteMetodoPago] = useState(false)
    const { ListVenta } = useProceso()
    const LoadListaMetodoPago = async () => {
        setLoadingAutoCompleteMetodoPago(true)
        const { lista, status } = await ListVenta()
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