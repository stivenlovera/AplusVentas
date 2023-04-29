import { CrearProcesoService } from "Services/api-ventas-erp/procesoService";
import { useState } from "react";

export const UseCrearProceso = () => {
    const [openModal, setOpenModal] = useState(false);
    const [create, setCreate] = useState({
        nombreAsiento: '',
        id: 0,
        tipoAsientoId: 0,
        nombreTipoAsiento:'',
        cuentas:[]
    })
    const [optionTipoAsiento, setOptionTipoAsiento] = useState([]);
    const [optionPlanCuenta, setOptionPlanCuenta] = useState([]);
    const [optionRol, setOptionRol] = useState([]);

    const ApiCrearProceso = async () => {
        const { data } = await CrearProcesoService();
        setOptionTipoAsiento(data.data.tipoAsiento);
        setOptionPlanCuenta(data.data.planCuenta);
        setOptionRol(data.data.rol);
    }
    const handlerOpen = (e) => {
        setOpenModal(true);
        ApiCrearProceso()
    }
    const handlerClose = (e) => {
        setOpenModal(false);
    }
    return {
        optionTipoAsiento,
        optionPlanCuenta,
        optionRol,
        create,
        setCreate,
        openModal,
        handlerOpen,
        handlerClose
    }
}