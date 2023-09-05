import { Box, Button, IconButton, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import IconWrapper from "components/IconWrapper";
import { H5 } from "components/Typography";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import QrCode2Icon from '@mui/icons-material/QrCode2';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';

import {
    DataTypeProvider,
} from '@devexpress/dx-react-grid';

import { Link } from "react-router-dom";
import { DataTablaCustomize } from "components/data-table/data-table-cuztomize";
import { UseDetalleAlmacen } from "../hooks/useDetalleAlmacen";

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
    const { onGetPendienteAlmacen } = UseDetalleAlmacen();

    const [tableColumnExtensions] = useState([
        { columnName: 'fechaCreacion', wordWrapEnabled: true, align: 'left' },
        { columnName: 'codigoOrden', wordWrapEnabled: true, align: 'left' },
        { columnName: 'nombreProducto', wordWrapEnabled: true, align: 'left' },
        { columnName: 'cantidad', wordWrapEnabled: true, align: 'left' },
        { columnName: 'ordenCompraProductoId', width: 150, wordWrapEnabled: true, align: 'left' },
    ]);
    const [columns] = useState([
        { name: 'fechaCreacion', title: 'Fecha Ingreso' },
        { name: 'codigoOrden', title: 'Orden compra' },
        { name: 'nombreProducto', title: 'Producto' },
        { name: 'cantidad', title: 'Cantidad' },
        { name: 'ordenCompraProductoId', title: 'Acciones' },
    ]);
    const [rows, setRow] = useState([]);

    /*EVENTO DE DE LISTA */
    const inizializando = async () => {
        const { data, status } = await onGetPendienteAlmacen();
        if (status) {
            setRow(data)
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
            <DataTablaCustomize
                rows={rows}
                columns={columns}
                tableColumnExtensions={tableColumnExtensions}
            >
                <CurrencyTypeProvider
                    for={['ordenCompraProductoId']}
                    onClicks={({ value, row, column }) => { console.log(value, row, column) }}
                />
            </DataTablaCustomize>
        </Box>
    );
};

export const CurrencyTypeProvider = props => {
    const { onClicks } = props;
    console.log('PROP CurrencyTypeProvider')
    return (
        <DataTypeProvider
            formatterComponent={({ value, row, column }) => CurrencyFormatter({ value, row, column, onClicks })}
            {...props}
        ></DataTypeProvider>
    )
};
export const CurrencyFormatter = ({ value, row, column, onClicks }) => {
    console.log(row)
    return (
        <Fragment>
            <Link to={`/dashboard/almacen-homologar/${row.productoId}`}>
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

export default AlmacenesListPendientes;
