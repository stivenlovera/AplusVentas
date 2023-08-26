import { Add } from "@mui/icons-material";
import { Box, Button, IconButton, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import DeleteIcon from '@mui/icons-material/Delete';
import InventoryIcon from '@mui/icons-material/Inventory';
import { H5 } from "components/Typography";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';

import Paper from '@mui/material/Paper';
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
import { UseAlmacen } from "../hooks/useAlmacenes";
import Edit from "icons/Edit";
import { Link } from "react-router-dom";
import { initialAlmacen } from "../utils/almacen";
import ModalDelete from "components/modal-delete/modal-delete";
import ModalAlmacen from "../almacenes-list/components/modal-almacen/modal-almacen";

export const HeadingWrapper = styled(FlexBox)(({
    theme
}) => ({
    marginBottom: 20,
    flexWrap: "wrap",
    [theme.breakpoints.down(530)]: {
        "& .MuiButton-root": {
            width: "100%"
        },
        "& .MuiInputBase-root": {
            maxWidth: "100%",
            marginBottom: 15
        }
    }
}));

const AlmacenesListPendientes = () => {
    const {
        t
    } = useTranslation();
    const [openModalAlmacen, setOpenModalAlmacen] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [btnCreate, setBtnCreate] = useState(false);
    const [almacen, setAlmacen] = useState(initialAlmacen);
    const [editar, setEditar] = useState(false)
    const { onList, onStore, onCreate, onUpdate, onEditar, onDelete } = UseAlmacen();

    const [tableColumnExtensions] = useState([
        { columnName: 'fechaIngreso', width: 200, wordWrapEnabled: true, align: 'left' },
        { columnName: 'codigoOrden', width: 220, wordWrapEnabled: true, align: 'left' },
        { columnName: 'nombreProducto', width: 180, wordWrapEnabled: true, align: 'left' },
        { columnName: 'nombreAlmacen', width: 180, wordWrapEnabled: true, align: 'left' },
        { columnName: 'cantidad', wordWrapEnabled: true, align: 'left' },
        { columnName: 'ordencompraproductoId', width: 150, wordWrapEnabled: true, align: 'left' },
    ]);
    const [columns] = useState([
        { name: 'fechaIngreso', title: 'Fecha Ingreso' },
        { name: 'codigoOrden', title: 'Orden compra' },
        { name: 'nombreProducto', title: 'Producto' },
        { name: 'nombreAlmacen', title: 'Almacen' },
        { name: 'cantidad', title: 'Cantidad' },
        { name: 'ordencompraproductoId', title: 'Acciones' },
    ]);
    const [rows, setRow] = useState([]);

    const [currencyColumns] = useState(['ordencompraproductoId']);
    const CurrencyFormatter = ({ value, row }) => {
        return (
            <Fragment>
                <Link to={`/dashboard/almacen-homologar/${row.id}/${row.id}`}>
                    <IconButton >
                        <FormatListNumberedRtlIcon sx={{
                            fontSize: 18,
                            color: "text.disabled"
                        }} />
                    </IconButton>
                </Link>
            </Fragment>
        )
    };

    const CurrencyTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={CurrencyFormatter}
            {...props}
        />
    );

    /*EVENTO DE DE LISTA */
    const inizializando = async () => {
        const { lista } = await onList();
        setRow(lista)
    }
    const handlerCreate = async () => {
        const { create, status } = await onCreate();
        if (status) {
            setAlmacen(create)
            setOpenModalAlmacen(true)
        }
    }
    const handlerEditar = async (data) => {
        setEditar(true);
        setAlmacen(data);
        setOpenModalAlmacen(true)
    }
    const handlerSubmit = async (values) => {
        if (editar) {
            const { update, status } = await onUpdate(values);
            if (status) {
                setEditar(false);
                setOpenModalAlmacen(false);
                inizializando()
            }
        } else {
            const { store, status } = await onStore(values);
            if (status) {
                setOpenModalAlmacen(false);
                inizializando()
            }
        }
    }
    const handlerDelete = (row) => {
        setAlmacen(row)
        setOpenModalDelete(true)
    }
    const onDeleteAlmacen = async (data) => {
        const { status } = await onDelete(data.id)
        if (status) {
            setOpenModalDelete(false);
            inizializando()
        }
    }

    useEffect(() => {
        inizializando()
    }, [])

    return (
        <Box pt={2} pb={4}>
            <HeadingWrapper justifyContent="space-between" alignItems="center">
                <FlexBox gap={0.5} alignItems="center">
                    <IconWrapper>
                        <QrCode2Icon sx={{
                            color: "primary.main"
                        }} />
                    </IconWrapper>
                    <H5>Entradas pendientes </H5>
                </FlexBox>
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
            <ModalAlmacen
                open={openModalAlmacen}
                data={almacen}
                editProduct={editar}
                onClose={() => { setOpenModalAlmacen(false) }}
                onSubmit={handlerSubmit}
            />
            <ModalDelete
                disabledButton={false}
                onClose={() => setOpenModalDelete(false)}
                onSave={onDeleteAlmacen}
                open={openModalDelete}
                data={almacen}
            />
        </Box>
    );
};

export default AlmacenesListPendientes;
