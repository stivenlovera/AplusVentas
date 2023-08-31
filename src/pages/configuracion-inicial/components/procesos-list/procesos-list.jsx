import CreateProcesoModal from './components/create-proceso-modal'
import { Add } from "@mui/icons-material";
import { Box, Button, Card, Divider, IconButton, styled } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { H3, H5, H6, Tiny } from "components/Typography";
import { Fragment, useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Edit from "icons/Edit";
import { initialAsiento, initialListAsiento } from './utils/utilsProceso'
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management'
import { useProceso } from './hooks/useProceso'
import { DataTablaStandar } from 'components/data-table/data-table-standar'
import ModalDelete from 'components/modal-delete/modal-delete';

const ProcesosList = () => {
    const [tipo, setTipo] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [asiento, setAsiento] = useState(initialAsiento)
    const { Create, onDelete, Editar, List, Store, Update } = useProceso();
    const [rows, setRows] = useState(initialListAsiento)
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [id, setId] = useState(0);

    const [tableColumnExtensions] = useState([
        { columnName: 'nombreTipoAsiento', wordWrapEnabled: true, align: 'left' },
        { columnName: 'tipoAsientoId', wordWrapEnabled: true, align: 'left' },
        { columnName: 'nombreAsiento', wordWrapEnabled: true, align: 'left' },
        { columnName: 'asientoId', width: 120, wordWrapEnabled: true, align: 'left' }
    ]);
    const [columns] = useState([
        { name: 'nombreTipoAsiento', title: 'Clasificacion' },
        { name: 'nombreAsiento', title: 'Nombre asiento' },
        { name: 'asientoId', title: 'Acciones' }
    ]);
    const inizialize = async () => {
        const { lista, status } = await List()
        if (status) {
            setRows(lista)
        }
    }
    const handlerOpenEditar = async (id) => {
        setTipo('editar')
        const { edit, status } = await Editar(id);
        if (status) {
            setAsiento(edit)
            setOpenModal(true);
        }
    }
    const handlerOpenCreate = async () => {
        setTipo('nuevo')
        const { create, status } = await Create();
        if (status) {
            setAsiento(initialAsiento)
            setOpenModal(true);
        }
    }
    const handlerDelete = async (asientoId) => {
        setId(asientoId)
        setOpenModalDelete(true)
    }
    const handlerClose = async () => {
        setOpenModal(false)
    }
    const handlerEnviar = async (values) => {
        switch (tipo) {
            case 'nuevo':
                var { status, store } = await Store(values);
                if (status) {
                    setOpenModal(false);
                    inizialize();
                }
                break;
            case 'editar':
                var { status, update } = await Update(values, values.asiento.id);
                if (status) {
                    setOpenModal(false);
                    inizialize();
                }
                break;
        }
    }
    const handlerCloseEliminar = () => {
        setOpenModalDelete(false)
    }
    const handlerOpenEliminar = () => {
        setOpenModalDelete(true)
    }
    const hadlerEliminar = async (id) => {
        var { status, data } = await onDelete(id);
        if (status) {
            setOpenModalDelete(false);
            inizialize();
        }
    }

    useEffect(() => {
        inizialize()
    }, []);

    const onClicks = [
        {
            nombre: 'Editar',
            onClick: (row) => { handlerOpenEditar(row.asientoId) },
            icon: (
                <Edit sx={{
                    fontSize: 18,
                    color: "text.disabled"
                }} />
            ),
        },
        {
            nombre: 'Eliminar',
            onClick: (row) => { handlerDelete(row.asientoId) },
            icon: (
                <DeleteIcon sx={{
                    fontSize: 18,
                    color: "text.disabled"
                }} />
            )
        }
    ];
    return (
        <Card sx={{
            padding: 3
        }}>
            <H5 mb={3}>Asientos frecuentes</H5>
            <Divider sx={{
                my: 2
            }} />
            <Box mt={2} mb={3}>
                <HeadingWrapper justifyContent="space-between" sx={{ m: 0 }} alignItems="center">
                    <Tiny lineHeight={1.8} >
                        Crea un asiento que será utilizado frecuentemente Ej: compra efectivom venta efectivo, etc.
                    </Tiny>
                    <Button
                        variant="contained"
                        endIcon={<Add />}
                        onClick={handlerOpenCreate}
                        disabled={false}
                    >
                        Añadir Asiento
                    </Button>
                </HeadingWrapper>
                <Paper>
                    <DataTablaStandar
                        AccionColumn={'asientoId'}
                        columns={columns}
                        onClicks={onClicks}
                        rows={rows}
                        tableColumnExtensions={tableColumnExtensions}
                    >

                    </DataTablaStandar>
                </Paper>
                <CreateProcesoModal
                    data={asiento}
                    tipo={tipo}
                    open={openModal}
                    onClose={handlerClose}
                    onEnviar={handlerEnviar}
                />
                <ModalDelete
                    onClose={handlerCloseEliminar}
                    data={id}
                    open={openModalDelete}
                    onSave={hadlerEliminar}
                />
            </Box>
        </Card>
    )
}

export default ProcesosList
