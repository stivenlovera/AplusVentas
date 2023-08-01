import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

const TableDetalle = () => {
    const [columns] = useState([
        { name: 'codigoCuenta', title: 'Codigo cuenta' },
        { name: 'cuenta', title: 'Nombre Cuenta' },
        { name: 'debe', title: 'Debe' },
        { name: 'haber', title: 'Haber' },
    ]);
    const [rows] = useState([
        {
            codigoCuenta: "con factura",
            cuenta: "cuenta por pagar",
            debe: "0",
            haber: "500"
        }
    ]);

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