import { Edit, Style } from "@mui/icons-material";
import { IconButton, Rating } from "@mui/material";
import { Fragment, useState } from "react";
import Delete from "icons/Delete";
import CreateClasificacionModal from "./create-clasificacion";
import { UseEditarClasificacion } from "../hooks/UserEditarClasificacion";
const ClasificacionColumns = [
    {
        Header: "#",
        accessor: "id"
    },
    {
        Header: "Nombre",
        accessor: "nombreClasificacion"
    },
    {
        Header: "Pertenece a:",
        accessor: "nombreClasificacionPadre"
    },
    {
        Header: "Acciones",
        accessor: "acciones",
        Cell: ({
            row
        }) => {
            const style = {
                fontSize: 19,
                transition: "color 0.3s",
                color: row.isSelected ? "white" : "text.disabled"
            };
            const [tipo, setTipo] = useState('');

            const {openModal, editar, handlerClose, handlerOpen, options } = UseEditarClasificacion(row.original.id);
            return <Fragment>
                <IconButton onClick={() => {
                    handlerOpen()
                    setTipo('editar')
                }}>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <IconButton onClick={() => { alert('funcion pendiente') }}>
                    <Delete sx={style} />
                </IconButton>
                <CreateClasificacionModal
                    editClasificacion
                    open={openModal}
                    data={editar}
                    id={row.original.id}
                    options={options}
                    onClose={
                        (e) => {
                            handlerClose()
                            setTipo('')
                        }
                    }
                    tipo={tipo} />
            </Fragment>;
        }
    }];
export default ClasificacionColumns;