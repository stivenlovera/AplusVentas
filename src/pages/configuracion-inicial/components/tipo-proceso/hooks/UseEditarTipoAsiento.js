
import { EditarTipoAsientoService } from "Services/api-ventas-erp/tipoAsiento";
import { useState } from "react";

export const UseEditarTipoAsiento = (id) => {
    const [openModal, setOpenModal] = useState(false);
    const [editar, setEditar] = useState({
        id: 0,
        nombreTipoAsiento:''
    })
    const ApiEditarProceso = async () => {
        const { data } = await EditarTipoAsientoService(id);
        setEditar(data.data.tipoAsiento)
    }
    const handlerOpen = (e) => {
        setOpenModal(true);
        ApiEditarProceso()
    }
    const handlerClose = (e) => {
        setOpenModal(false);
    }
    return {
        editar,
        openModal,
        handlerOpen,
        handlerClose
    }
}