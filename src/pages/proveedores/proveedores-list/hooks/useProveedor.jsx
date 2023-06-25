import { CrearOrdenCompraService } from "Services/api-ventas-erp/ordenCompra";
import { useState } from "react";
import { useSnackbar } from "notistack";
import moment from 'moment';
import { Request } from "utils/http";
import { proveedorintial } from "../components/proveedor-fake";

export const UseProveedor = ({ refreshDataTable = false }) => {

  const List = async () => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/proveedor`,
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
      endPoint: `${process.env.REACT_APP_API}api/proveedor/create`,
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
  const Store = async (values) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/proveedor`,
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
      endPoint: `${process.env.REACT_APP_API}api/proveedor/${id}`,
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
  const Update = async (values) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/proveedor/${values.id}`,
      initialValues: [],
      method: 'put',
      showError: true,
      showSuccess: false,
      values: values
    });
    return {
      update: data,
      status: !!status
    };
  }
  const Delete = async (id) => {
    const { data, message, status } = await Request({
      endPoint: `${process.env.REACT_APP_API}api/proveedor/${id}`,
      initialValues: [],
      method: 'delete',
      showError: true,
      showSuccess: false
    });
    return {
      delete: data,
      status: !!status
    };
  }

  return {
    List,
    Create,
    Store,
    Editar,
    Update,
    Delete
  }
}