
import SearchInput from 'components/input-fields/SearchInput'
import CustomTable from 'page-sections/admin-ecommerce/CustomTable'
import { useTranslation } from 'react-i18next'
import CreateProcesoModal from './components/create-proceso-modal'
import ProcesoColumns from './components/proceso-columns'
import { Context } from 'contexts/ContextDataTable'
import { UseListProceso } from './hooks/UseListaProceso'
import { UseCrearProceso } from './hooks/UseCrearProceso'

import {
    RowDetailState, PagingState,
    IntegratedSorting,
    SortingState,
    IntegratedPaging,
    DataTypeProvider,
    SearchState,
    IntegratedFiltering
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableRowDetail,
    PagingPanel,
    Toolbar,
    SearchPanel
} from '@devexpress/dx-react-grid-material-ui';

import { Add } from "@mui/icons-material";
import { Box, Button, Card, Divider, IconButton, styled } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { H3, H5, H6, Tiny } from "components/Typography";
import { Fragment, useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Edit from "icons/Edit";
import { initialAsiento, initialLisAsiento } from './utils/utilsProceso'
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management'
import { useProceso } from './hooks/useProceso'

const ProcesosList = () => {
    const [tipo, setTipo] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [asiento, setAsiento] = useState(initialAsiento)
    const { Create, Delete, Editar, List, Store, Update } = useProceso();
    const [rows, setRows] = useState(initialLisAsiento)
    const [optionTipoAsiento, setOptionTipoAsiento] = useState([]);
    const [optionPlanCuenta, setOptionPlanCuenta] = useState([]);
    const [optionRol, setOptionRol] = useState([]);

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

    const [currencyColumns] = useState(['asientoId']);
    const CurrencyFormatter = ({ value, row }) => {
        return (
            <Fragment>
                <IconButton onClick={() => { handlerOpenEditar(row.asientoId) }}>
                    <Edit sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
                <IconButton onClick={() => { }}>
                    <DeleteIcon sx={{
                        fontSize: 18,
                        color: "text.disabled"
                    }} />
                </IconButton>
            </Fragment>
        )
    };

    const CurrencyTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatter}
            {...props}
        />
    );

    const {
        t
    } = useTranslation();

    const inizialize = async () => {
        const { lista, status } = await List()
        if (status) {
            setRows(lista)
        }
    }

    const handlerOpenEditar = async (id) => {
        setTipo('editar')
        console.log('click editar')
        const { edit, status } = await Editar(id);
        console.log(edit)
        if (status) {
            setAsiento(edit)
            setOptionTipoAsiento(edit.tipoAsiento);
            setOptionPlanCuenta(edit.planCuenta);
            setOptionRol(edit.rol);
            setOpenModal(true);
        } else {

        }
    }
    const handlerOpenCreate = async () => {
        setTipo('nuevo')
        const { create, status } = await Create();
        if (status) {
            setAsiento(initialAsiento)
            setOptionTipoAsiento(create.tipoAsiento);
            setOptionPlanCuenta(create.planCuenta);
            setOptionRol(create.rol);
            setOpenModal(true);
        } else {

        }
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
                    inizialize()
                }
                break;
            case 'hijo':
                console.log('hijo', values)
                break;
            case 'editar':
                console.log('editar', values)
                break;
        }
    }

    useEffect(() => {
        inizialize()
    }, []);

    return (
        <Card sx={{
            padding: 3
        }}>
            <H5 mb={3}>Asientos frecuentes</H5>
            <Divider sx={{
                my: 2
            }} />
            <Box mt={2} mb={3}>

                <HeadingWrapper justifyCntent="space-between" sx={{ m: 0 }} alignItems="center">
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
                    <Grid
                        rows={rows}
                        columns={columns}
                    >
                        {/* data format */}
                        <CurrencyTypeProvider
                            for={currencyColumns}
                        />
                        {/* sort columns*/}
                        <SortingState
                            defaultSorting={[{ columnName: 'city', direction: 'asc' }]}
                        />
                        <IntegratedSorting />
                        {/* paggin */}
                        <PagingState
                            defaultCurrentPage={0}
                            pageSize={5}
                        />
                        <IntegratedPaging />
                        <PagingPanel />
                        {/* buscador */}
                        <SearchState defaultValue="" />
                        <IntegratedFiltering />
                        <Toolbar />
                        <SearchPanel />
                        {/* table */}
                        <Table columnExtensions={tableColumnExtensions} />
                        <TableHeaderRow showSortingControls />
                    </Grid>
                </Paper>
                <CreateProcesoModal
                    data={asiento}
                    optionTipoAsiento={optionTipoAsiento}
                    optionPlanCuenta={optionPlanCuenta}
                    optionRol={optionRol}
                    tipo={tipo}
                    open={openModal}
                    onClose={handlerClose}
                    onEnviar={handlerEnviar}
                />
            </Box>
        </Card>
    )
}

export default ProcesosList
