import { Request } from "utils/http";
import { useCuenta } from "../../plan-cuentas/hooks/useCuenta";
import { useState } from "react";
import { useTipoProceso } from "../../tipo-proceso/hooks/useTIpoProceso";
export const useProceso = () => {

  const List = async () => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/asiento`,
      initialValues: [],
      method: 'get',
      showError: true,
      showSuccess: false
    });
    return {
      lista: data,
      status: !!status
    };
  }
  const Create = async () => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/asiento/create`,
      initialValues: [],
      method: 'get',
      showError: true,
      showSuccess: false
    });
    return {
      create: data,
      status: !!status
    };
  }
  const Store = async (values,id) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/asiento`,
      initialValues: [],
      method: 'post',
      showError: true,
      showSuccess: true,
      values: values
    });
    return {
      store: data,
      status: !!status
    };
  }
  const Editar = async (id) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/asiento/editar/${id}`,
      initialValues: [],
      method: 'get',
      showError: true,
      showSuccess: false
    });
    return {
      edit: data,
      status: !!status
    };
  }
  const Update = async (values,id) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/asiento/${id}`,
      initialValues: [],
      method: 'put',
      showError: true,
      showSuccess: true,
      values: values
    });
    return {
      update: data,
      status: !!status
    };
  }
  const onDelete = async (id) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/asiento/${id}`,
      initialValues: [],
      method: 'delete',
      showError: true,
      showSuccess: true
    });
    return {
      data: data,
      status: !!status
    };
  }

  return {
    List,
    Create,
    Store,
    Editar,
    Update,
    onDelete
  }
}

export const useAutocompleteCuenta = () => {
  const [listaAsiento, setlistaAsiento] = useState([]);
  const [openAutoCompleteAsiento, setOpenAutoCompleteAsiento] = useState(false)
  const [loadingAutoCompleteAsiento, setLoadingAutoCompleteAsiento] = useState(false)
  const { onList } = useCuenta()
  const LoadListaAsiento = async () => {
    setLoadingAutoCompleteAsiento(true)
    const { lista, status } = await onList()
    if (status) {
      setlistaAsiento(lista)
      setOpenAutoCompleteAsiento(true)
    }
    setLoadingAutoCompleteAsiento(false)
  }
  const refresListaAsiento = () => {
    setOpenAutoCompleteAsiento(false)
    setlistaAsiento([])
  }
  const isOptionEqualToValueAsiento = (option, value) => option.nombreCuenta === value.nombreCuenta
  const getOptionLabelAsiento = (option) => option.nombreCuenta

  return {
    listaAsiento,
    openAutoCompleteAsiento,
    loadingAutoCompleteAsiento,
    refresListaAsiento,
    isOptionEqualToValueAsiento,
    getOptionLabelAsiento,
    LoadListaAsiento
  }
}

export const useAutocompleteTipoProceso = () => {
  const [listaTipoProceso, setlistaTipoProceso] = useState([]);
  const [openAutoCompleteTipoProceso, setOpenAutoCompleteTipoProceso] = useState(false)
  const [loadingAutoCompleteTipoProceso, setLoadingAutoCompleteTipoProceso] = useState(false)
  const { onList } = useTipoProceso()
  const LoadListaTipoProceso = async () => {
    setLoadingAutoCompleteTipoProceso(true)
    const { lista, status } = await onList()
    if (status) {
      console.log(lista)
      setlistaTipoProceso(lista)
      setOpenAutoCompleteTipoProceso(true)
    }
    setLoadingAutoCompleteTipoProceso(false)
  }
  const refresListaTipoProceso = () => {
    setOpenAutoCompleteTipoProceso(false)
    setlistaTipoProceso([])
  }
  const isOptionEqualToValueTipoProceso = (option, value) => option.nombreTipoAsiento === value.nombreTipoAsiento
  const getOptionLabelTipoProceso = (option) => option.nombreTipoAsiento

  return {
    listaTipoProceso,
    openAutoCompleteTipoProceso,
    loadingAutoCompleteTipoProceso,
    refresListaTipoProceso,
    isOptionEqualToValueTipoProceso,
    getOptionLabelTipoProceso,
    LoadListaTipoProceso
  }
}