import { Backdrop, Button, Card, CircularProgress, IconButton, TableContainer } from '@mui/material'
import { Grid as GridMaterial } from '@mui/material'
import { Box } from '@mui/system'
import IconWrapper from 'components/IconWrapper'
import { H4, H5, H6 } from 'components/Typography'
import FlexBox from 'components/flexbox/FlexBox'
import InventoryIcon from '@mui/icons-material/Inventory';
import { HeadingWrapper } from 'pages/admin-ecommerce/product-management'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UseAlmacen } from '../hooks/useAlmacenes'
import { useParams } from 'react-router-dom';
import { initialAlmacen, initialStateStockProducto } from '../utils/almacen'
import { UseDetalleAlmacen } from '../hooks/useDetalleAlmacen'
import { DataTablaCustomize } from 'components/data-table/data-table-cuztomize'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import ModalHomologar from './modal-homologar'

const CurrencyFormatter = ({ value, row, column, onClicks }) => {
    return (
        <Fragment>
            <IconButton onClick={() => onClicks({ value, row, column })} >
                <FormatListNumberedRtlIcon sx={{
                    fontSize: 18,
                    color: "text.disabled"
                }} />
            </IconButton>
        </Fragment>
    )
};

const CurrencyTypeProvider = props => {
    const { onClicks } = props;
    return (
        <DataTypeProvider
            formatterComponent={({ value, row, column }) => CurrencyFormatter({ value, row, column, onClicks })}
            {...props}
        ></DataTypeProvider>
    )
};

const AlmacenProducto = () => {
    const { almacenId } = useParams();
    const [loading, setLoading] = useState(true)
    const [almacen, setAlmacen] = useState(initialAlmacen);

    const { onGetStockProducto } = UseDetalleAlmacen();
    const { onEditar } = UseAlmacen()
    const [producto, setProducto] = useState(initialStateStockProducto);
    const [openModalHomologar, setOpenModalHomologar] = useState(false)
    /*TABLE  */
    const [tableColumnExtensions] = useState([
        { columnName: 'almacenid', wordWrapEnabled: true, align: 'left' },
        { columnName: 'nombreProducto', wordWrapEnabled: true, align: 'left' },
        { columnName: 'cantidad', wordWrapEnabled: true, align: 'left' },
        { columnName: 'productoid', width: 180, wordWrapEnabled: true, align: 'left' }
    ]);
    const [columns] = useState([
        { name: 'almacenid', title: 'Producto maestro' },
        { name: 'nombreProducto', title: 'Producto' },
        { name: 'cantidad', title: 'Stock' },
        { name: 'productoid', title: 'Acciones' },
    ]);
    const [rows, setRow] = useState([]);

    /*Eventos */
    const inizializeListaStock = async () => {
        const { data, status } = await onGetStockProducto(almacenId, 0);
        setRow(data)
        setLoading(false);
    }
    const inizializeAlmacen = async () => {
        const { edit, status } = await onEditar(almacenId);
        setAlmacen(edit)
        setLoading(false);
    }
    useEffect(() => {
        inizializeListaStock();
        inizializeAlmacen();
    }, [])
    const handlerHomologar = ({ value, row, column }) => {
        setProducto(row)
        setOpenModalHomologar(true)
    }
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
                            <H6 color="text.secondary">Almacen </H6>
                            <H5 fontWeight={500}>{almacen.nombreAlmacen}</H5>
                        </GridMaterial>
                        <GridMaterial item md={4} xs={6}>
                            <H6 color="text.secondary">Direccion</H6>
                            <H5 fontWeight={500}>{almacen.dirrecion}</H5>
                        </GridMaterial>
                    </GridMaterial>
                </Card>
                <br />
                <DataTablaCustomize
                    rows={rows}
                    columns={columns}
                    tableColumnExtensions={tableColumnExtensions}
                >
                    <CurrencyTypeProvider
                        for={['productoid']}
                        onClicks={handlerHomologar}
                    />
                </DataTablaCustomize>
                <ModalHomologar
                    productoId={producto.productoid}
                    open={openModalHomologar}
                    onClose={() => { setOpenModalHomologar(false) }}
                >
                </ModalHomologar>
            </Box>
        </>
    )
}
export default AlmacenProducto;


