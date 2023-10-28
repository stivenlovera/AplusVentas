import React, { useEffect, useState } from 'react';
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
import TableCell from '@mui/material/TableCell';
import MuiGrid from '@mui/material/Grid';
import Edit from '@mui/icons-material/Edit';
import Cancel from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { Box, Card } from '@mui/material';
import { HeadingWrapper } from '../almacenes';
import FlexBox from 'components/flexbox/FlexBox';
import { Link } from 'react-router-dom';
import { H5, H6 } from 'components/Typography';
import { UseDetalleAlmacen } from '../hooks/useDetalleAlmacen';
import { initialProductoAlmacen } from '../utils/almacen';
import FormDetalleSerie from './form';
import moment from 'moment';

const getRowId = row => row.detallealmacenid;

const DetailContent = ({ row, ...rest }) => {
    const {
        processValueChange,
        applyChanges,
        cancelChanges,
    } = rest;
    return (
        <FormDetalleSerie data={row} events={rest} />
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

const DetailEditCell = ({ onRefresh }) => {
    const { onUpdate } = UseDetalleAlmacen();
    return (
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
                            const applyChanges = async (values) => {
                                console.log(values);
                                const { data, status } = await onUpdate(values)
                                if (status) {
                                    onRefresh();
                                }
                                /*  toggleDetailRowExpanded({ rowId });
                                 commitChangedRows({ rowIds: [rowId] }); */
                                toggleDetailRowExpanded({ rowId });
                                console.log('save')
                            };
                            const cancelChanges = () => {
                                /*  toggleDetailRowExpanded({ rowId });
                                 cancelChangedRows({ rowIds: [rowId] }); */
                                console.log('cancel<')
                                toggleDetailRowExpanded({ rowId });
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
    )
};

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

const Homologar = ({
    productoId
}) => {
    const [producto, setProducto] = useState(initialProductoAlmacen)
    const [rows, setRows] = useState(initialProductoAlmacen);
    const [tableColumnExtensions] = useState([
        { columnName: 'fecharegistro', wordWrapEnabled: true, align: 'left' },
        { columnName: 'serie', wordWrapEnabled: true, align: 'left' },
        { columnName: 'estadoVendido', wordWrapEnabled: true, align: 'left' },
        { columnName: 'nombreAlmacen', wordWrapEnabled: true, align: 'left' }
    ]);
    const [columns] = useState([
        { name: 'fecharegistro', title: 'Fecha registro' },
        { name: 'serie', title: 'Serie' },
        { name: 'estadoVendido', title: 'Estado' },
        { name: 'nombreAlmacen', title: 'Almacen' }
    ]);
    const { onGetProductoAlmacen } = UseDetalleAlmacen();

    const commitChanges = ({ changed }) => {
        const changedRows = rows.map(row => (changed[row.detalleAlmacenId] ? { ...row, ...changed[row.detalleAlmacenId] } : row));
        setRows(changedRows);
    };
    const inizializando = async () => {
        const { data, status } = await onGetProductoAlmacen(productoId);
        if (status) {
            setProducto(data.producto)
            data.productoAlmacen.map((data)=> {return data.fecharegistro= moment().format('DD/MM/yyyy')});
            setRows(data.productoAlmacen)
        }
    }
    useEffect(() => {
        inizializando()
    }, [])

    return (
        <>
            <Box pt={2} pb={1}>
                <HeadingWrapper justifyContent="space-between" alignItems="center">
                    <FlexBox gap={0.5} alignItems="center">
                        <CropFreeIcon sx={{
                            color: "primary.main"
                        }}>

                        </CropFreeIcon>
                        <H5>Productos</H5>
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
                        <H6 color="text.secondary">Producto</H6>
                        <H5 fontWeight={500}>{producto.nombre} {producto.nombreProducto}</H5>
                    </MuiGrid>
                    <MuiGrid item md={4} xs={6}>
                        <H6 color="text.secondary">Clasificacion</H6>
                        <H5 fontWeight={500}>{producto.nombrecategoria}</H5>
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
                    <DetailEditCell onRefresh={inizializando} />
                </Grid>
            </Paper>
        </>

    );
};
export default Homologar;
