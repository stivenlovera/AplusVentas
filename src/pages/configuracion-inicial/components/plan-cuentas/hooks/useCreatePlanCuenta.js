import { CrearPlanCuentaService } from "Services/api-ventas-erp/PlanCuentaService";
import { useState } from "react";

export const UseCreatePlanCuenta = () => {
    const [openModal, setOpenModal] = useState(false);

    const [create, setCreate] = useState({
        tipo: '',
        id: "",
        codigo: '',
        nombreCuenta: "",
        moneda: '1',
        valor: '1',
        codigoIdentificador: '0',
        nivel: '0',
        debe: '0',
        haber: '0',
        vPlanCuentaId: '0',
    })
    const [options, setOptions] = useState([
        { id: 0, nombreClasificacion: "Seleccione" }
    ]);

    const ApiCrearPlanCuenta = async () => {
        const { data } = await CrearPlanCuentaService(0, 0);
        setCreate({ ...create, codigo: data.data.codigo, nivel: data.data.nivel })
        setOptions(data.data.clasificaciones);
    }
    const handlerOpen = (e) => {
        setOpenModal(true);
        ApiCrearPlanCuenta()
    }
    const handlerClose = (e) => {
        setOpenModal(false);
    }
    return {
        options,
        create,
        setCreate,
        openModal,
        handlerOpen,
        handlerClose,
        data: {
            create,
            options
        }
    }
}