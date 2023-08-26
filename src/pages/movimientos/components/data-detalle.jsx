import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import { UseMovimiento } from '../hooks/use-movimiento';

const TableDetalle = ({
    codigo,
    asientoId
}) => {
    const { ListGeneralCuenta } = UseMovimiento();
    const [columns] = useState([
        { name: 'codigoCuenta', title: 'Codigo cuenta' },
        { name: 'nombreCuenta', title: 'Nombre Cuenta' },
        { name: 'debe', title: 'Debe' },
        { name: 'haber', title: 'Haber' },
    ]);
    const [rows, setRow] = useState([]);
    const inizializando = async () => {
        const { lista } = await ListGeneralCuenta({
            codigo,
            asientoId
        });
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
                <Table />
                <TableHeaderRow />
            </Grid>
        </Paper>
    );
};
export default TableDetalle;