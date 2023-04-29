
import { CrearClasificacionService, GuardarClasificacionService } from "Services/api-ventas-erp/clasificacionService";
import { useState } from "react";

export const UseCreateClasificacion = () => {
    const [openModal, setOpenModal] = useState(false);

    const [create, setCreate] = useState({
        id: 0,
        nombreClasificacion: '',
        clasificacionId: 0,
        nombreClasificacionPadre: ''
    })
    const [options, setOptions] = useState([
        { id: 0, nombreClasificacion: "Seleccione" }
    ]);

    const ApiCrear = async () => {
        const { data } = await CrearClasificacionService();
        console.log('de api', data.data.clasificaciones)
        setOptions(data.data.clasificaciones);
    }
   
    const handlerOpen = (e) => {
        setOpenModal(true);
        ApiCrear()
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
        data:{
            create,
            options
        }
    }
}