import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
    RowDetailState, PagingState,
    IntegratedSorting,
    SortingState,
    IntegratedPaging
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableRowDetail,
    PagingPanel

} from '@devexpress/dx-react-grid-material-ui';
import { Box } from '@mui/material';
import TableDetalle from './data-detalle';
import { UseMovimiento } from '../hooks/use-movimiento';

const RowDetail = ({ row }) => {
    return (
        < Box sx={{ margin: 2 }
        } >
            <TableDetalle asientoId={row.asientoId} codigo={row.codigo} />
        </Box >
    )
};

const DateTable = () => {

    const { ListGeneral } = UseMovimiento();
    const [tableColumnExtensions] = useState([
        { columnName: 'codigo', width: 150, wordWrapEnabled: true },
        { columnName: 'fecha', width: 180, wordWrapEnabled: true },
        { columnName: 'descripcion', width: 180, wordWrapEnabled: true },
        { columnName: 'para', wordWrapEnabled: true },
        { columnName: 'total', width: 80, wordWrapEnabled: true },
        { columnName: 'metodoPago', width: 200, wordWrapEnabled: true },
        { columnName: 'realizado', wordWrapEnabled: true }
    ]);
    const [columns] = useState([
        { name: 'codigo', title: 'Codigo' },
        { name: 'fecha', title: 'Fecha' },
        { name: 'descripcion', title: 'Descripcion' },
        { name: 'para', title: 'Dirigido a' },
        { name: 'total', title: 'Total' },
        { name: 'metodoPago', title: 'Metodo de Pago' },
        { name: 'realizado', title: 'Usuario' }
    ]);
    const [rows, setRow] = useState([{
        codigo: "OC#0",
        fecha: "30/07/2023",
        descripcion: "Compra demo",
        cliente: "Rojer Martinez",
        total: "3600",
        metodoPago: "Con factura",
        usuario: "Stiven Lovera"
    }]);
    const [expandedRowIds, setExpandedRowIds] = useState([2, 5]);
    const inizializando = async () => {
        const { lista } = await ListGeneral();
        setRow(lista)
    }
    useEffect(() => {
        inizializando()
    }, [])

    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
            >
                <Table columnExtensions={tableColumnExtensions} />
                <RowDetailState
                    defaultExpandedRowIds={[/* 2, 5 */]}
                />
                <TableRowDetail
                    contentComponent={RowDetail}
                />
                {/* sort columns*/}
                <SortingState
                    defaultSorting={[{ columnName: 'city', direction: 'asc' }]}
                />
                <IntegratedSorting />
                <TableHeaderRow showSortingControls />
                {/* paggin */}
                <PagingState
                    defaultCurrentPage={0}
                    pageSize={5}
                />
                <IntegratedPaging />
                <PagingPanel />

            </Grid>

        </Paper>
    );
};
export default DateTable;
