import { useState } from "react";
import { Request } from "utils/http";

export const useCuenta = () => {
    const onList = async () => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/plan-cuenta`,
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
    const onCreate = async (nivel, vPlanCuentaId) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/plan-cuenta/create?nivel=${nivel}&padre=${vPlanCuentaId}`,
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
    const onStore = async ({ codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vPlanCuentaId }) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/plan-cuenta`,
            initialValues: [],
            method: 'post',
            showError: true,
            showSuccess: true,
            values: { codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vPlanCuentaId }
        });
        return {
            store: data,
            status: !!status
        };
    }
    const onStorehijo = async (id, codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vPlanCuentaId) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/plan-cuenta`,
            initialValues: [],
            method: 'post',
            showError: true,
            showSuccess: true,
            values: { id, codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vPlanCuentaId }
        });
        return {
            store: data,
            status: !!status
        };
    }

    const onEditar = async (id) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/plan-cuenta/${id}`,
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
    const onUpdate = async ({id, codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vPlanCuentaId}) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/plan-cuenta/${id}`,
            initialValues: [],
            method: 'put',
            showError: true,
            showSuccess: true,
            values: { id, codigo, nombreCuenta, moneda, valor, codigoIdentificador, nivel, debe, haber, vPlanCuentaId }
        });
        return {
            update: data,
            status: !!status
        };
    }
    const onDelete = async (id) => {
        const { data, message, status } = await Request({
            endPoint: `${process.env.REACT_APP_API}api/plan-cuenta/${id}`,
            initialValues: [],
            method: 'delete',
            showError: true,
            showSuccess: true
        });
        return {
            destroy: data,
            status: !!status
        };
    }
    return {
        onStorehijo,
        onList,
        onCreate,
        onStore,
        onEditar,
        onUpdate,
        onDelete
    }
}
