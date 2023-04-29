import { useState } from "react";

export const UseCrearTipoAsiento = () => {
    const [openModal, setOpenModal] = useState(false);
    const [create, setCreate] = useState({
        id: 0,
        nombreTipoAsiento:''
    })

    const ApiCrearProceso = async () => {
        //const { data } = await CrearProcesoService();
        //console.log(data.data)
    }
    const handlerOpen = (e) => {
        setOpenModal(true);
        ApiCrearProceso()
    }
    const handlerClose = (e) => {
        setOpenModal(false);
    }
    return {
        create,
        setCreate,
        openModal,
        handlerOpen,
        handlerClose
    }
}