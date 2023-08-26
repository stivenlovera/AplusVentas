import { Backdrop, Button, Card, CircularProgress, TableContainer } from '@mui/material'
import { Grid as GridMaterial } from '@mui/material'
import { Box } from '@mui/system'
import IconWrapper from 'components/IconWrapper'
import { H4, H5, H6 } from 'components/Typography'
import FlexBox from 'components/flexbox/FlexBox'
import InventoryIcon from '@mui/icons-material/Inventory';
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UseAlmacen } from '../hooks/useAlmacenes'
import { useParams } from 'react-router-dom';
import { initialAlmacen } from '../utils/almacen'
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
    SearchPanel,
    Toolbar

} from '@devexpress/dx-react-grid-material-ui';
const AlmacenProducto = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [almacen, setAlmacen] = useState(initialAlmacen);

    const { onMovimientoAlmacen, onProductoAlmacen, onAlmacenProducto, onEditar } = UseAlmacen();

    /*TABLE  */
    const [tableColumnExtensions] = useState([
        { columnName: 'producto', wordWrapEnabled: true, align: 'left' },
        { columnName: 'cantidad', wordWrapEnabled: true, align: 'left' },
        { columnName: 'estado', width: 180, wordWrapEnabled: true, align: 'left' },
        { columnName: 'stockDiponible', width: 180, wordWrapEnabled: true, align: 'left' },
        { columnName: 'detalleAlmacenId', width: 180, wordWrapEnabled: true, align: 'left' }
        /*       { columnName: 'id', width: 150, wordWrapEnabled: true, align: 'left' }, */
    ]);
    const [columns] = useState([
        { name: 'producto', title: 'Producto' },
        { name: 'cantidad', title: 'Cantidad' },
        { name: 'estado', title: 'Estado' },
        { name: 'stockDiponible', title: 'Stock  Disponible' },
        { name: 'detalleAlmacenId', title: 'Acciones' },
    ]);
    const [rows, setRow] = useState([]);

    /*Eventos */
    const inizializeLista = async () => {
        const { almacen, status } = await onAlmacenProducto(id);
        setRow(almacen)
        setLoading(false);
    }
    const inizializeAlmacen = async () => {
        const { edit, status } = await onEditar(id);
        setAlmacen(edit)
        setLoading(false);
    }
    useEffect(() => {
        inizializeLista();
        inizializeAlmacen();
    }, [])

    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Box pt={2} pb={4}>
                <HeadingWrapper justifyContent="space-between" alignItems="center">
                    <FlexBox gap={0.5} alignItems="center">
                        <IconWrapper>
                            <InventoryIcon sx={{
                                color: "primary.main"
                            }} />
                        </IconWrapper>
                        <H5>Almacen | {almacen.nombreAlmacen}</H5>
                    </FlexBox>
                    <Link to={'/dashboard/orden-inicial/create'}>
                    </Link>
                </HeadingWrapper>
                <Card sx={{
                    padding: 4
                }}>
                    <GridMaterial container mt={0}>
                        <GridMaterial item md={4} xs={6}>
                            <H6 color="text.secondary">Codigo</H6>
                            <H5 fontWeight={500}>{almacen.codigoAlmacen}</H5>
                        </GridMaterial>
                        <GridMaterial item md={4} xs={6}>
                            <H6 color="text.secondary">Direccion</H6>
                            <H5 fontWeight={500}>{almacen.dirrecion}</H5>
                        </GridMaterial>
                    </GridMaterial>
                </Card>
                <br />
                <Paper>
                    <Grid
                        rows={rows}
                        columns={columns}
                    >
                        {/* data format */}
                        {/*   <CurrencyTypeProvider
                            for={currencyColumns}
                        /> */}
                        {/* sort columns*/}
                        <SortingState
                            defaultSorting={[{ columnName: 'nombre', direction: 'asc' }]}
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
            </Box>
        </>
    )
}

export default AlmacenProducto
