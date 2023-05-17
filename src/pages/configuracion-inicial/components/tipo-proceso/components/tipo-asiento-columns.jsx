import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Fragment, useState } from "react";
import Delete from "icons/Delete";
import { UseEditarTipoAsiento } from "../hooks/UseEditarTipoAsiento";
import CreateTipoAsientoModal from "./create-tipo-asiento-modal";
const ClasificacionColumns = [
    {
        Header: "Clasificación asiento",
        accessor: "nombreTipoAsiento"
    },
    {
        Header: "Acciones",
        accessor: "id",
        Cell: ({
            row
        }) => {
            const style = {
                fontSize: 19,
                transition: "color 0.3s",
                color: row.isSelected ? "white" : "text.disabled"
            };
            const [tipo, setTipo] = useState('');
            const { openModal, editar, handlerClose, handlerOpen } = UseEditarTipoAsiento(row.original.id);
            return <Fragment>
                <IconButton onClick={() => {
                    setTipo('editar')
                    handlerOpen()
                }}>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <IconButton onClick={() => { alert('funcion pendiente') }}>
                    <Delete sx={style} />
                </IconButton>
                <CreateTipoAsientoModal
                    editProceso
                    open={openModal}
                    data={editar}
                    onClose={
                        (e) => {
                            handlerClose()
                            setTipo('')
                        }
                    }
                    id={row.original.id}
                    tipo={tipo} />
            </Fragment>;
        }
    }];
export default ClasificacionColumns;