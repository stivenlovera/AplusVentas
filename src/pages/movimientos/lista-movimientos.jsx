import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management';
import FlexBox from 'components/flexbox/FlexBox';
import IconWrapper from 'components/IconWrapper';
import ShoppingBasket from 'icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { H5 } from 'components/Typography';
import Add from 'icons/Add';

function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="center"> 
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Historial
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Orden</TableCell>
                                        <TableCell align="center">Customer</TableCell>
                                        <TableCell align="center">Amount</TableCell>
                                        <TableCell align="center">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell align="center" component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell align="center">{historyRow.customerId}</TableCell>
                                            <TableCell align="center">{historyRow.amount}</TableCell>
                                            <TableCell align="center">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

const rows = [
    createData('Orden compra', 'con factura', 6.0, 0, 500)
];

export default function ListaMovimiento() {
    return (
        <Box pt={2} pb={4}>
            <HeadingWrapper justifyContent="space-between" alignItems="center">
                <FlexBox gap={0.5} alignItems="center">
                    <IconWrapper>
                        <ShoppingBasket sx={{
                            color: "primary.main"
                        }} />
                    </IconWrapper>
                    <H5>Movimientos Generales</H5>
                </FlexBox>
               
                <Link to={'/dashboard/orden-inicial/create'}>
                    <Button variant="contained" endIcon={<Add />} >
                        se
                    </Button>
                </Link>
            </HeadingWrapper>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table" >
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Fecha</TableCell>
                            <TableCell align="center">Tipo Movimiento</TableCell>
                            <TableCell align="center">Nombre Cuenta</TableCell>
                            <TableCell align="center">Debe</TableCell>
                            <TableCell align="center">Haber</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    );
}