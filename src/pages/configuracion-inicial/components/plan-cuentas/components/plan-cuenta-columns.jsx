import { Edit } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import Delete from "icons/Delete";
import CreatePlanCuentaModal from "./create-plan-cuenta-modal";
import { UseEditarPlanCuenta } from "../hooks/useEditarPlanCuenta";
const PlanCuentaColumns = [
    {
        Header: "Codigo",
        accessor: "codigo"
    },
    {
        Header: "Nombre",
        accessor: "nombreCuenta"
    },
    {
        Header: "Moneda",
        accessor: "moneda"
    },
    {
        Header: "Valor",
        accessor: "valor"
    },
    {
        Header: "Nivel",
        accessor: "nivel"
    },
    {
        Header: "Debe",
        accessor: "debe"
    },
    {
        Header: "Haber",
        accessor: "haber"
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
            const [tipo, setTipo] = useState('');
            const {openModal, editar, handlerClose, handlerOpen, options } = UseEditarPlanCuenta(row.original.id);
            return <Fragment>
                <IconButton
                    onClick={() => {
                        setTipo('hijo')
                       
                    }}
                >
                    <AddCircleIcon sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <IconButton onClick={handlerOpen}>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <IconButton onClick={() => { alert('funcion pendiente') }}>
                    <Delete sx={style} />
                </IconButton>
                <CreatePlanCuentaModal editPlanCuenta tipo={tipo} open={openModal} data={row.original} onClose={handlerClose} />
            </Fragment >;
        }
    }];
export default PlanCuentaColumns;