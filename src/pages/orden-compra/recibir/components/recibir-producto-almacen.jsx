import { FormControl, InputLabel, MenuItem, Select, TableRow, TextField } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import AppTextField from 'components/input-fields/AppTextField'
import { BodyTableCell } from 'page-sections/accounts/account/common/StyledComponents'
import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AutocompleteAsync from 'components/AutocompleteAsync'
import { useAutocompleteAlmacenes } from 'pages/almacenes/hooks/useAlmacenes'
const RecibirProductoAlmacen = ({
    dataProducto,
    dataFechaVencimiento,
    dataAlmacen,
    dataLote,
    dataCantidad,
    dataPrecioCompra,
    dataPrecioTotal,
}) => {
    //almacen
    const {
        LoadListaAlmacenes,
        getOptionLabelAlmacenes,
        isOptionEqualToValueAlmacenes,
        listaAlmacenes,
        loadingAutoCompleteAlmacenes,
        openAutoCompleteAlmacenes,
        refresListaAlmacenes
    } = useAutocompleteAlmacenes();

    const [almacen, setAlmacen] = useState('');
    const handleChangeAlmacen = (event) => {
        setAlmacen(event.target.value);
    };
    const [value, setValue] = useState(null);
    return (
        <TableRow >
            <BodyTableCell>
                <AppTextField
                    //onChange={e => handleUpdateItem(e, item.id)}
                    fullWidth
                    size="small"
                    name={dataProducto.name}
                    label={dataProducto.label}
                    value={dataProducto.value}
                    onChange={dataProducto.handleChange}
                    disabled={dataFechaVencimiento.disabled}
                />
            </BodyTableCell>
            <BodyTableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        name={dataFechaVencimiento.name}
                        label={dataFechaVencimiento.label}
                        value={dataFechaVencimiento.value}
                        inputFormat="DD/MM/YYYY"
                        onChange={dataFechaVencimiento.handleChange}
                        renderInput={
                            (params) =>
                                <TextField
                                    size='small'
                                    fullWidth
                                    {...params}
                                />}
                        disabled={dataFechaVencimiento.disabled}
                    />
                </LocalizationProvider>
            </BodyTableCell>
            <BodyTableCell>
                <AutocompleteAsync
                    options={listaAlmacenes}
                    loading={loadingAutoCompleteAlmacenes}
                    open={openAutoCompleteAlmacenes}
                    onOpen={LoadListaAlmacenes}
                    onClose={refresListaAlmacenes}
                    getOptionLabel={getOptionLabelAlmacenes}
                    isOptionEqualToValue={isOptionEqualToValueAlmacenes}
                    name={dataAlmacen.name}
                    label={dataAlmacen.label}
                    value={dataAlmacen.value}
                    onChange={dataAlmacen.handleChange}
                    helperText={dataAlmacen.helperText}
                    errors={dataAlmacen.error}
                    defaultValue={dataAlmacen.defaultValue}
                    disabled={dataAlmacen.disabled}
                />
            </BodyTableCell>
            <BodyTableCell>
                <AppTextField
                    //onChange={e => handleUpdateItem(e, item.id)}
                    fullWidth
                    size="small"
                    name={dataLote.name}
                    label={dataLote.label}
                    value={dataLote.value}
                    onChange={dataLote.handleChange}
                    disabled={dataAlmacen.disabled}
                />
            </BodyTableCell>
            <BodyTableCell>
                <AppTextField
                    //onChange={e => handleUpdateItem(e, item.id)}
                    fullWidth
                    size="small"
                    name={dataCantidad.name}
                    label={dataCantidad.label}
                    value={dataCantidad.value}
                    onChange={dataCantidad.handleChange}
                    disabled={dataFechaVencimiento.disabled}
                />
            </BodyTableCell>
            <BodyTableCell>
                <AppTextField
                    //onChange={e => handleUpdateItem(e, item.id)}
                    fullWidth
                    size="small"
                    name={dataPrecioCompra.name}
                    label={dataPrecioCompra.label}
                    value={dataPrecioCompra.value}
                    onChange={dataPrecioCompra.handleChange}
                    disabled={dataFechaVencimiento.disabled}
                />
            </BodyTableCell>
            <BodyTableCell>
                <AppTextField
                    //onChange={e => handleUpdateItem(e, item.id)}
                    fullWidth
                    size="small"
                    name={dataPrecioTotal.name}
                    label={dataPrecioTotal.label}
                    value={dataPrecioTotal.value}
                    onChange={dataPrecioTotal.handleChange}
                    disabled={dataFechaVencimiento.disabled}
                />
            </BodyTableCell>
        </TableRow>
    )
}

export default RecibirProductoAlmacen
