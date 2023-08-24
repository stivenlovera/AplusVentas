import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import {
    Plugin, Template, TemplateConnector, TemplatePlaceholder, Action,
} from '@devexpress/dx-react-core';
import {
    EditingState, RowDetailState,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableRowDetail,
} from '@devexpress/dx-react-grid-material-ui';
// eslint-disable-next-line
import moment from 'moment';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import MuiGrid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import Edit from '@mui/icons-material/Edit';
import Cancel from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { Box, Card } from '@mui/material';
import { HeadingWrapper } from '../almacenes';
import FlexBox from 'components/flexbox/FlexBox';
import IconWrapper from 'components/IconWrapper';
import { Link } from 'react-router-dom';
import { H5, H6 } from 'components/Typography';


const getRowId = row => row.detalleAlmacenId;

const DetailContent = ({ row, ...rest }) => {
    const {
        processValueChange,
        applyChanges,
        cancelChanges,
    } = rest;
    console.log(processValueChange,
        applyChanges,
        cancelChanges,)
    return (
        <Box pt={2} pb={1}>
            <Paper>
                <MuiGrid container spacing={2} sx={{ p: 2 }}>
                    <MuiGrid item xs={6}>
                        <TextField
                            fullWidth
                            size='small'
                            name="estado"
                            label="Estado"
                            value={row.estado}
                            onChange={processValueChange}
                        />
                    </MuiGrid>
                    <MuiGrid item xs={6}>
                        <TextField
                            fullWidth
                            size='small'
                            name="almacen"
                            label="Almacen"
                            value={row.almacen}
                            onChange={processValueChange}
                        />
                    </MuiGrid>
                    <MuiGrid item xs={6}>
                        {/*     <TextField
                                size='small'
                                margin="normal"
                                label="Estado"
                                select
                                name="estado"
                                value={row.estado}
                                onChange={processValueChange}
                            >
                            </TextField> */}
                    </MuiGrid>
                    <MuiGrid item xs={12}>
                        <TextField
                            fullWidth
                            size='small'
                            name="almacen"
                            label="Serie"
                            value={row.serie}
                            onChange={processValueChange}
                        />
                    </MuiGrid>
                    <MuiGrid item xs={12}>
                        <MuiGrid container spacing={2} justifyContent="flex-end">
                            <MuiGrid item>
                                <Button
                                    size='small'
                                    variant='contained'
                                    onClick={cancelChanges}
                                    color="error"
                                >
                                    Cancel
                                </Button>
                            </MuiGrid>
                            <MuiGrid item>
                                <Button
                                    size='small'
                                    variant='contained'
                                    onClick={applyChanges}
                                    color="primary"
                                >
                                    Anotar
                                </Button>
                            </MuiGrid>
                        </MuiGrid>
                    </MuiGrid>
                </MuiGrid>
            </Paper>
        </Box >
    );
};

const ToggleCell = ({
    style, expanded, classes, onToggle,
    tableColumn, tableRow, row,
    className,
    ...restProps
}) => {
    const handleClick = (e) => {
        e.stopPropagation();
        onToggle();
    };
    return (
        <TableCell
            className={className}
            sx={{
                textAlign: 'center',
                textOverflow: 'initial',
                paddingTop: 0,
                paddingBottom: 0,
                pl: 1,
            }}
            style={style}
            {...restProps}
        >
            <IconButton
                onClick={handleClick}
            >
                {
                    expanded
                        ? <Cancel />
                        : <Edit />
                }
            </IconButton>
        </TableCell>
    );
};

const DetailEditCell = () => (
    <Plugin name="detailEdit">
        <Action
            name="toggleDetailRowExpanded"
            action={({ rowId }, { expandedDetailRowIds }, { startEditRows, stopEditRows }) => {
                const rowIds = [rowId];
                const isCollapsing = expandedDetailRowIds.indexOf(rowId) > -1;
                if (isCollapsing) {
                    stopEditRows({ rowIds });
                } else {
                    startEditRows({ rowIds });
                }
            }}
        />
        <Template
            name="tableCell"
            predicate={({ tableRow }) => tableRow.type === TableRowDetail.ROW_TYPE}
        >
            {params => (
                <TemplateConnector>
                    {({
                        tableColumns,
                        createRowChange,
                        rowChanges,
                    }, {
                        changeRow,
                        commitChangedRows,
                        cancelChangedRows,
                        toggleDetailRowExpanded,
                    }) => {
                        if (tableColumns.indexOf(params.tableColumn) !== 0) {
                            return null;
                        }
                        const { tableRow: { rowId } } = params;
                        const row = { ...params.tableRow.row, ...rowChanges[rowId] };

                        const processValueChange = ({ target: { name, value } }) => {
                            const changeArgs = {
                                rowId,
                                change: createRowChange(row, value, name),
                            };
                            changeRow(changeArgs);
                        };

                        const applyChanges = () => {
                            toggleDetailRowExpanded({ rowId });
                            commitChangedRows({ rowIds: [rowId] });
                        };
                        const cancelChanges = () => {
                            toggleDetailRowExpanded({ rowId });
                            cancelChangedRows({ rowIds: [rowId] });
                        };

                        return (
                            <TemplatePlaceholder params={{
                                ...params,
                                row,
                                tableRow: {
                                    ...params.tableRow,
                                    row,
                                },
                                changeRow,
                                processValueChange,
                                applyChanges,
                                cancelChanges,
                            }}
                            />
                        );
                    }}
                </TemplateConnector>
            )}
        </Template>
    </Plugin>
);

const DetailCell = ({
    children, changeRow, editingRowIds, addedRows, processValueChange,
    applyChanges, cancelChanges,
    ...restProps
}) => {
    const { row } = restProps;

    return (
        <TableRowDetail.Cell {...restProps}>
            {React.cloneElement(children, {
                row, changeRow, processValueChange, applyChanges, cancelChanges,
            })}
        </TableRowDetail.Cell>
    );
};

const Homologar = () => {
    const [columns] = useState([
        { name: 'serie', title: 'Serie' },
        { name: 'estado', title: 'Estado' },
        { name: 'almacen', title: 'Almacen' },
    ]);
    const [rows, setRows] = useState([
        {
            producto: 'producto',
            serie: 'Producto',
            stado: 'producto',
            almacen: 'Producto',
            detalleAlmacenId: 0
        },
        {
            producto: 'producto',
            serie: 'Producto',
            stado: 'producto',
            almacen: 'Producto',
            detalleAlmacenId: 1
        }
    ]);

    const commitChanges = ({ changed }) => {
        const changedRows = rows.map(row => (changed[row.detalleAlmacenId] ? { ...row, ...changed[row.detalleAlmacenId] } : row));
        setRows(changedRows);
    };

    return (
        <>
            <Box pt={2} pb={1}>
                <HeadingWrapper justifyContent="space-between" alignItems="center">
                    <FlexBox gap={0.5} alignItems="center">
                        <IconWrapper>
                            {/*   <InventoryIcon sx={{
                            color: "primary.main"
                        }} /> */}
                        </IconWrapper>
                        <H5>Almacen | producto de ejemplo</H5>
                    </FlexBox>
                    <Link to={'/dashboard/orden-inicial/create'}>
                    </Link>
                </HeadingWrapper>
            </Box>
            <Card sx={{
                padding: 4
            }}>
                <MuiGrid container mt={0}>
                    <MuiGrid item md={4} xs={6}>
                        <H6 color="text.secondary">Codigo Producto</H6>
                        <H5 fontWeight={500}>######</H5>
                    </MuiGrid>
                    <MuiGrid item md={4} xs={6}>
                        <H6 color="text.secondary">Clasificacion</H6>
                        <H5 fontWeight={500}>"########</H5>
                    </MuiGrid>
                </MuiGrid>
            </Card>
            <br />
            <Paper>
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                >
                    <RowDetailState
                        defaultExpandedRowIds={[1]}
                    />
                    <EditingState
                        defaultEditingRowIds={[1]}
                        onCommitChanges={commitChanges}
                    />
                    <Table />
                    <TableHeaderRow />
                    <TableRowDetail
                        contentComponent={DetailContent}
                        cellComponent={DetailCell}
                        toggleCellComponent={ToggleCell}
                    />
                    <DetailEditCell />
                </Grid>
            </Paper>
        </>

    );
};
export default Homologar;
