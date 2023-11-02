import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { values } from 'lodash';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import { H6 } from '../Typography';
/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const AutocompleteId = ({
    label,
    options,
    labelName,
    name,
    onChange,
    defaultValue,
    disabled = false,
    hideTitle,
    onList
}) => {
    const formik = useFormikContext();
    const { values, touched, errors, handleChange, handleBlur, setFieldValue } = formik;
    const handleAutocompleteChange = (event, newValue) => {
        if (newValue) {
            setFieldValue(name, newValue[name]); // Update the value of the Autocomplete field in Formik
        }
        else {
            setFieldValue(name, undefined);
        }

    };
    const LoadLista = async () => {
        setLoading(true)
        const { lista, status } = await onList()
        if (status) {
            setLista(lista)
            setOpen(true)
        }
        setLoading(false)
    }
    const [lista, setLista] = useState(options);
    const [open, setOpen] = useState(false);
    React.useEffect(() => {

    }, [open]);
    const [loading, setLoading] = useState(false);
    return (
        <Autocomplete
            open={onList ? open : undefined}
            onOpen={onList ? LoadLista : undefined}
            size='small'
            fullWidth
            // isOptionEqualToValue={(option, value) => option[name] === value[name]}
            options={lista}
            getOptionLabel={(option) => option[labelName]}
            defaultValue={lista.find(x => x[name] === values[name]) ?? defaultValue}
            onChange={onChange ?? handleAutocompleteChange}
            // value={()=>lista.find()}
            disabled={disabled}
            loading={loading}
            onBlur={handleBlur}
            renderInput={(params) => {
                console.log(params)
                return (
                    <>
                        {hideTitle ? null : <H6 mb={1}>{label}</H6>}
                        <TextField
                            {...params}
                            error={Boolean(touched[name] && errors[name])}
                            helperText={`${errors[name] && touched[name] ? errors[name].toString() : ''}`}
                            label={label}
                            name={name}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    </>
                )
            }
            }
        />
    );
}
