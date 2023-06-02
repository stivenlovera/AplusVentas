import { Edit, Style } from "@mui/icons-material";
import { IconButton, Rating, Tooltip } from "@mui/material";
import { Fragment, useContext, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateClasificacionModal from "./create-clasificacion";
import AddIcon from '@mui/icons-material/Add';
import { Request } from "utils/http";
import ModalDelete from "components/modal-delete/modal-delete";
import { Context } from "contexts/ContextDataTable";
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import AtributoModal from "./modal-atributos";
import { initialEtiquetaForm } from "../utils/utils-clasificacion";
const ClasificacionColumns = [
    {
        Header: "#",
        accessor: "num"
    },
    {
        Header: "Nombre",
        accessor: "nombre"
    },
    {
        Header: "Acciones",
        accessor: "categoriaId",
        Cell: ({
            row
        }) => {
            const style = {
                fontSize: 19,
                transition: "color 0.3s",
                color: row.isSelected ? "white" : "text.disabled"
            };
            const [context, setContext] = useContext(Context);
            const [openModal, setOpenModal] = useState(false);
            const [modalEliminar, setModalEliminar] = useState(false)
            const [modalAtributo, setModalAtributo] = useState(false)
            const [editar, setEditar] = useState(false);
            const [hijo, setHijo] = useState(false);

            /*METODOS */
            const handlerOpenAtributo = () => {
                setModalAtributo(true);
            }
            const handlerOpenEditar = () => {
                setEditar(true);
                setHijo(false);
                setOpenModal(true);
            }
            const handlerOpenHijo = () => {
                console.log({
                    categoriaId: row.original.categoriaId,
                    nombre: row.original.nombre
                })
                setEditar(false);
                setHijo(true);
                setOpenModal(true);
            }
            const handlerOpenEliminar = () => {
                setModalEliminar(true)
            }
            const hanlderEliminar = async () => {
                const { data, message, status } = await Request({
                    endPoint: `${process.env.REACT_APP_API}api/categoria/${row.original.categoriaId}`,
                    initialValues: [],
                    method: 'delete',
                    showError: true,
                    showSuccess: true
                });
                if (!!status) {
                    setContext(true);
                    setModalEliminar(false);
                }
            }
            /*API */
            return <Fragment>
                <IconButton onClick={handlerOpenEditar}>
                    <Tooltip title="Editar Clasificacion" arrow>
                        <Edit sx={{
                            fontSize: 20,
                            color: "text.disabled"
                        }} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={handlerOpenHijo}>
                    <Tooltip title="Añadir Subclasificacion" arrow>
                        <AddIcon sx={{
                            fontSize: 20,
                            color: "text.disabled"
                        }} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={handlerOpenEliminar}>
                    <Tooltip title="Eliminar" arrow>
                        <DeleteIcon sx={{
                            fontSize: 20,
                            color: "text.disabled"
                        }} />
                    </Tooltip>
                </IconButton>
                <IconButton onClick={handlerOpenAtributo}>
                    <Tooltip title="Ver atributos" arrow>
                        <EditAttributesIcon sx={{
                            fontSize: 20,
                            color: "text.disabled"
                        }} />
                    </Tooltip>
                </IconButton>
                <CreateClasificacionModal
                    hijo={hijo}
                    editClasificacion={editar}
                    open={openModal}
                    data={{
                        categoriaId: row.original.categoriaId,
                        nombre: row.original.nombre
                    }}
                    onClose={() => { setOpenModal(false) }}
                />
                <ModalDelete
                    onClose={() => { setModalEliminar(false) }}
                    open={modalEliminar}
                    onSave={hanlderEliminar}
                    disabledButton={!modalEliminar}
                />
                <AtributoModal
                    data={initialEtiquetaForm}
                    onClose={() => { setModalAtributo(false) }}
                    open={modalAtributo}
                />
            </Fragment>;
        }
    }];
export default ClasificacionColumns;