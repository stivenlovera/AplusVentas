import { Edit } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, Rating } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import Delete from "icons/Delete";
import CreatePlanCuentaModal from "./create-plan-cuenta-modal";
import { UseEditarPlanCuenta } from "../hooks/useEditarPlanCuenta";
import { UseCreatePlanCuenta } from "../hooks/useCreatePlanCuenta";
import { UseGuardarHijoPlanCuenta } from "../hooks/useGuardarHIjoPlanCuenta";
import ModalDelete from "components/modal-delete/modal-delete";
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
            const [openModal, setOpenModal] = useState(false);
            const [openModalDelete, setOpenModalDelete] = useState(false);

            const { editar, apiEditar } = UseEditarPlanCuenta(row.original.nivel, row.original.id);
            const { create, apiCreate } = UseCreatePlanCuenta(row.original.nivel, row.original.id);

            const handlerOpenHijo = async () => {
                setTipo('nuevo');
                const open = await apiCreate();
                if (open) {
                    setOpenModal(true)
                }
            }
            const handlerCloseHijo = () => {

            }
            const handlerOpenEditar = async () => {
                setTipo('editar');
                const open = await apiEditar();
                if (open) {
                    setOpenModal(true)
                }
            }
            const handlerCloseEditar = () => {

            }
            const handlerOpenEliminar = async () => {
                setOpenModalDelete(true)
            }
            const handlerCloseEliminar = () => {
                setOpenModalDelete(false)
            }
            useEffect(() => {
            }, [tipo])

            return <Fragment>
                <IconButton
                    onClick={handlerOpenHijo}
                >
                    <AddCircleIcon sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <IconButton onClick={handlerOpenEditar}>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <IconButton onClick={() => { handlerOpenEliminar() }}>
                    <Delete sx={style} />
                </IconButton>
                <CreatePlanCuentaModal editPlanCuenta tipo={tipo} open={openModal} data={tipo == 'editar' ? editar : create} onClose={() => {
                    setOpenModal(false)
                }} />
                <ModalDelete onClose={handlerCloseEliminar} open={openModalDelete} />
            </Fragment >;
        }
    }];
export default PlanCuentaColumns;