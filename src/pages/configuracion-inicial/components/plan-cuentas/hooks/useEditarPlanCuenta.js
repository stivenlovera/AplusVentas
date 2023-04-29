
import { EditarPlanCuentaService } from "Services/api-ventas-erp/PlanCuentaService";
import { useState } from "react";

export const UseEditarPlanCuenta = ( id ) => {
    const [openModal, setOpenModal] = useState(false);

    const [editar, setEditar] = useState({
        id: 0,
        nombreClasificacion: '',
        clasificacionId: 0,
        nombreClasificacionPadre: ''
    })
    const [options, setOptions] = useState([
        { id: 0, nombreClasificacion: "Seleccione" }
    ]);

    const apiEditar = async () => {
        const { data } = await EditarPlanCuentaService(id);
        setEditar(data.data.clasificacion);
    }
    const handlerOpen = (e) => {
        setOpenModal(true);
        apiEditar()
    }
    const handlerClose = (e) => {
        setOpenModal(false);
    }
    return {
        editar,
        options,
        openModal,
        handlerOpen,
        handlerClose
    }
}