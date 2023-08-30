import { Delete } from '@mui/icons-material'
import { FormControl, IconButton, InputLabel, MenuItem, Select, TableRow } from '@mui/material'
import AutocompleteAsync from 'components/AutocompleteAsync'
import AppTextField from 'components/input-fields/AppTextField'
import { BodyTableCell } from 'page-sections/accounts/account/common/StyledComponents'
import React from 'react'
import { useAutocompleteCuenta } from '../hooks/useProceso'

const AsientoCuenta = ({
    dataCodigo,
    asientoPlanCuenta,
    dataRol,
    dataAcction
}) => {
    const {
        LoadListaAsiento,
        getOptionLabelAsiento,
        isOptionEqualToValueAsiento,
        listaAsiento,
        loadingAutoCompleteAsiento,
        openAutoCompleteAsiento,
        refresListaAsiento
    } = useAutocompleteCuenta();
    return (
        <TableRow >
            <BodyTableCell>
                <AppTextField
                    //onChange={e => handleUpdateItem(e, item.id)}
                    fullWidth
                    size="small"
                    name={dataCodigo.name}
                    label={dataCodigo.label}
                    value={dataCodigo.value}
                    onChange={dataCodigo.handleChange}
                />
            </BodyTableCell>
            <BodyTableCell>
                <AutocompleteAsync
                    options={listaAsiento}
                    loading={loadingAutoCompleteAsiento}
                    open={openAutoCompleteAsiento}
                    onOpen={LoadListaAsiento}
                    onClose={refresListaAsiento}
                    getOptionLabel={getOptionLabelAsiento}
                    isOptionEqualToValue={isOptionEqualToValueAsiento}
                    name={asientoPlanCuenta.name}
                    label={asientoPlanCuenta.label}
                    value={asientoPlanCuenta.value}
                    onChange={asientoPlanCuenta.handleChange}
                    helperText={asientoPlanCuenta.helperText}
                    errors={asientoPlanCuenta.error}
                    defaultValue={asientoPlanCuenta.defaultValue}
                    disabled={asientoPlanCuenta.disabled}
                />
            </BodyTableCell>
            <BodyTableCell>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Rol</InputLabel>
                    <Select
                        size='small'
                        value={dataRol.value}
                        label={dataRol.label}
                        onChange={dataRol.handleChange}
                    >
                        <MenuItem value={'Haber'}>Haber</MenuItem>
                        <MenuItem value={'Debe'}>Debe</MenuItem>
                    </Select>
                </FormControl>
            </BodyTableCell>
            <BodyTableCell>
                <IconButton onClick={dataAcction.delete} disabled={asientoPlanCuenta.disabled}>
                    <Delete sx={{
                        color: "text.disabled"
                    }} />
                </IconButton>
            </BodyTableCell>
        </TableRow>
    )
}

export default AsientoCuenta
