import { Edit } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import Delete from "icons/Delete";
import CreateProcesoModal from "./create-proceso-modal";
import { UseEditarProceso } from "../hooks/UseEditarProceso";
const ProcesoColumns = [
    {
        Header: "Clasificacion",
        accessor: "nombreTipoAsiento"
    },
    {
        Header: "Nombre asiento",
        accessor: "nombreAsiento"
    },
    {
        Header: "Acciones",
        accessor: "acciones",
        Cell: ({
            row
        }) => {
            const {
                codigo,
                nombreCuenta,
                moneda,
                valor,
                nivel,
                debe,
                haber
            } = row.original;
            const style = {
                fontSize: 19,
                transition: "color 0.3s",
                color: row.isSelected ? "white" : "text.disabled"
            };
            const [tipo, setTipo] = useState('editar');
            useEffect(() => {

            }, [tipo])
            const { editar, openModal, optionPlanCuenta, optionTipoAsiento, optionRol, handlerClose,handlerOpen } = UseEditarProceso()
            return <Fragment>
                <IconButton onClick={(e) => {
                    handlerOpen(e)
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
                <CreateProcesoModal
                    optionTipoAsiento={optionTipoAsiento}
                    optionPlanCuenta={optionPlanCuenta}
                    optionRol={optionRol}
                    tipo={tipo}
                    editProceso
                    open={openModal}
                    data={editar}
                    onClose={
                        (e) => {
                            handlerClose()
                            setTipo('')
                        }
                    }
                />
            </Fragment >;
        }
    }];
export default ProcesoColumns;