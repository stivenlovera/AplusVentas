import { Delete } from '@mui/icons-material'
import { IconButton, TableRow } from '@mui/material'
import AutocompleteAsync from 'components/AutocompleteAsync'
import AppTextField from 'components/input-fields/AppTextField'
import { BodyTableCell } from 'page-sections/accounts/account/common/StyledComponents'
import { useAutocompleteProducto } from 'pages/orden-compra/create-orden-inicial/hooks/useAutoCompleteProducto'
import React from 'react'

const CotizacionProducto = ({
    dataCodigoProducto,
    dataProducto,
    dataStock,
    dataCantidad,
    dataPrecioCompra,
    dataPrecioTotal,
    dataAcction
}) => {
    const {
        LoadListaProductos,
        getOptionLabelProducto,
        isOptionEqualToValueProducto,
        listaProductos,
        loadingAutoCompleteProductos,
        openAutoCompleteProductos,
        refresListaProductos
    } = useAutocompleteProducto();
    return (
        <TableRow >
            <BodyTableCell>
                <AppTextField
                    fullWidth
                    size="small"
                    name={dataCodigoProducto.name}
                    label={dataCodigoProducto.label}
                    value={dataCodigoProducto.value}
                    onChange={dataCodigoProducto.handleChange}
                />
            </BodyTableCell>
            <BodyTableCell>
                <AutocompleteAsync
                    options={listaProductos}
                    loading={loadingAutoCompleteProductos}
                    open={openAutoCompleteProductos}
                    onOpen={LoadListaProductos}
                    onClose={refresListaProductos}
                    getOptionLabel={getOptionLabelProducto}
                    isOptionEqualToValue={isOptionEqualToValueProducto}
                    name={dataProducto.name}
                    label={dataProducto.label}
                    value={dataProducto.value}
                    onChange={dataProducto.handleChange}
                    helperText={dataProducto.helperText}
                    errors={dataProducto.error}
                />
            </BodyTableCell>
            <BodyTableCell>
                <AppTextField
                    fullWidth
                    size="small"
                    name={dataCantidad.name}
                    label={dataCantidad.label}
                    value={dataCantidad.value}
                    onChange={dataCantidad.handleChange}
                    type={'number'}
                    error={dataCantidad.error}
                    helperText={dataCantidad.helperText}
                />
            </BodyTableCell>
            <BodyTableCell>
                <AppTextField
                    fullWidth
                    size="small"
                    id="precioVenta"
                    name={dataPrecioCompra.name}
                    label={dataPrecioCompra.label}
                    value={dataPrecioCompra.value}
                    onChange={dataPrecioCompra.handleChange}
                    type={'number'}
                    error={dataPrecioCompra.error}
                    helperText={dataPrecioCompra.helperText}
                />
            </BodyTableCell>
            <BodyTableCell>
                <AppTextField
                    fullWidth
                    size="small"
                    id="precioTotal"
                    name={dataPrecioTotal.name}
                    label={dataPrecioTotal.label}
                    value={dataPrecioTotal.value}
                    error={dataPrecioTotal.error}
                    helperText={dataPrecioTotal.helperText}
                />
            </BodyTableCell>
            <BodyTableCell>
                <IconButton onClick={dataAcction.delete}>
                    <Delete sx={{
                        color: "text.disabled"
                    }} />
                </IconButton>
            </BodyTableCell>
        </TableRow>
    )
}

export default CotizacionProducto
