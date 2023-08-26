import { useState } from "react";
import { Request } from "utils/http";

export const UseAlmacen = () => {
  const onList = async () => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/almacen`,
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
  const onCreate = async () => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/almacen/create`,
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
  const onStore = async (values) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/almacen`,
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
  const onEditar = async (id) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/almacen/${id}`,
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
  const onUpdate = async (values) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/almacen/${values.id}`,
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
      endPoint: `${process.env.REACT_APP_API}api/almacen/${id}`,
      initialValues: [],
      method: 'delete',
      showError: true,
      showSuccess: true
    });
    return {
      delete: data,
      status: !!status
    };
  }
  const onAlmacenProducto = async (idAlmacen) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/almacen/obtenerProductos/${idAlmacen}`,
      initialValues: [],
      method: 'get',
      showError: true,
      showSuccess: false
    });
    return {
      almacen: data,
      status: !!status
    };
  }
  const onProductoAlmacen = async (id) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/almacen/obtenerListadoProductosAlmacen`,
      initialValues: [],
      method: 'get',
      showError: true,
      showSuccess: false
    });
    return {
      productos: data,
      status: !!status
    };
  }
  const onMovimientoAlmacen = async (values) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/almacen/movimientoAlmacen`,
      initialValues: [],
      method: 'post',
      showError: true,
      showSuccess: false,
      values: values
    });
    return {
      data: data,
      status: !!status
    };
  }
  return {
    onList,
    onCreate,
    onStore,
    onEditar,
    onUpdate,
    onDelete,
    onProductoAlmacen,
    onAlmacenProducto,
    onMovimientoAlmacen
  }
}

export const useAutocompleteAlmacenes = () => {
  //Almacenes
  const [listaAlmacenes, setlistaAlmacenes] = useState([]);
  const [openAutoCompleteAlmacenes, setOpenAutoCompleteAlmacenes] = useState(false)
  const [loadingAutoCompleteAlmacenes, setLoadingAutoCompleteAlmacenes] = useState(false)
  const { onList } = UseAlmacen()
  const LoadListaAlmacenes = async () => {
    setLoadingAutoCompleteAlmacenes(true)
    const { lista, status } = await onList()
    if (status) {
      console.log('Todos los almacenes',lista)
      setlistaAlmacenes(lista)
      setOpenAutoCompleteAlmacenes(true)
    }
    setLoadingAutoCompleteAlmacenes(false)
  }
  const refresListaAlmacenes = () => {
    setOpenAutoCompleteAlmacenes(false)
    setlistaAlmacenes([])
  }
  const isOptionEqualToValueAlmacenes = (option, value) => option.nombreAlmacen === value.nombreAlmacen
  const getOptionLabelAlmacenes = (option) => option.nombreAlmacen

  return {
    listaAlmacenes,
    openAutoCompleteAlmacenes,
    loadingAutoCompleteAlmacenes,
    refresListaAlmacenes,
    isOptionEqualToValueAlmacenes,
    getOptionLabelAlmacenes,
    LoadListaAlmacenes
  }
}