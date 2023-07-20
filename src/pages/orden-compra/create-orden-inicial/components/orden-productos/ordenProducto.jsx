import { Delete } from '@mui/icons-material'
import { IconButton, TableRow } from '@mui/material'
import AutocompleteAsync from 'components/AutocompleteAsync'
import AppTextField from 'components/input-fields/AppTextField'
import { BodyTableCell } from 'page-sections/accounts/account/common/StyledComponents'
import React from 'react'
import { useAutocompleteProducto } from '../../hooks/useAutoCompleteProducto'

const OrdenProducto = ({
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
                    //onChange={e => handleUpdateItem(e, item.id)}
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
                /* defaultValue={() => {
                    return {
                        id: values.productos[i].productoId,
                        nombreProducto: 'producto'
                    }
                }} */
                />
            </BodyTableCell>
            <BodyTableCell>
                <AppTextField
                    fullWidth
                    size="small"
                    name="stock"
                    label="Stock"
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
                    /* onChange={(e) => {
                        console.log('on change', e.target.value);
                        items[i].cantidad = (e.target.value);
                        items[i].precioTotal = parseInt(items[i].cantidad == '' ? 0 : items[i].cantidad) * parseFloat(items[i].precioCompra);
                        setItems([...items]);
                        onCalculoTotal()
                    }} */
                    type={'number'}
                />
            </BodyTableCell>
            <BodyTableCell>
                <AppTextField
                    fullWidth
                    size="small"
                    id="precioCompra"
                    name={dataPrecioCompra.name}
                    label={dataPrecioCompra.label}
                    value={dataPrecioCompra.value}
                    onChange={dataPrecioCompra.handleChange}
                    /* onChange={(e) => {
                        console.log('on change', e.target.value);
                        items[i].precioCompra = (e.target.value);
                        items[i].precioTotal = parseInt(items[i].cantidad == '' ? 0 : items[i].cantidad) * parseFloat(items[i].precioCompra == '' ? 0 : items[i].precioCompra);
                        setItems([...items]);
                        onCalculoTotal()
                    }} */
                    type={'number'}
                />
            </BodyTableCell>
            <BodyTableCell>
                <AppTextField
                    fullWidth
                    size="small"
                    name={dataPrecioTotal.name}
                    label={dataPrecioTotal.label}
                    value={dataPrecioTotal.value}
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

export default OrdenProducto
