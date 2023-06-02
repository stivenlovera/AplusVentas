
import { EditarClasificacionService } from "Services/api-ventas-erp/categoria";
import { useState } from "react";

export const UseEditarClasificacion = (id) => {
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
        const { data } = await EditarClasificacionService(id);
        setEditar(data.data.clasificacion);
        setOptions(data.data.clasificaciones);
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