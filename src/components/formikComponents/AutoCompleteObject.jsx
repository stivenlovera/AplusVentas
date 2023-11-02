import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import { H6 } from 'components/Typography';

/**
 * Componente AutocompleteObject.
 *
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.label - La etiqueta para el campo Autocomplete.
 * @param {string} props.labelUndefined - La etiqueta para mostrar cuando la opción seleccionada es indefinida.
 * @param {Array} props.options - El array de opciones para el campo Autocomplete.
 * @param {string} props.labelName - El nombre de la propiedad a utilizar como etiqueta para cada opción.
 * @param {string} props.name - El nombre del campo en el formulario.
 * @param {function} [props.onChange] - La función de devolución de llamada que se llamará cuando cambie el valor del campo Autocomplete.
 * @param {any} [props.defaultValue] - El valor predeterminado para el campo Autocomplete.
 * @param {boolean} [props.disabled=false] - Si el campo Autocomplete está deshabilitado o no.
 * @param {boolean} [props.hideTitle] - Si se debe ocultar la etiqueta de título o no.
 * @param {function} [props.onList] - La función de devolución de llamada que se llamará cuando se abra el campo Autocomplete.
 * @returns {JSX.Element} El componente AutocompleteObject.
 *
 * @description
 * El componente AutocompleteObject es un campo de autocompletado que permite al usuario seleccionar una opción de una lista desplegable. Proporciona una interfaz de usuario intuitiva para seleccionar opciones de manera eficiente.
 *
 * @example
 * // Ejemplo de uso del componente AutocompleteObject
    <AutocompleteObject
        label='Selecione un producto maestro (opcional)'
        name='productoMaestro'
        options={productosMaestros}
        labelName='nombre'
    />
 */
export const AutocompleteObject = ({
    label,
    labelUndefined,
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
            setFieldValue(name, newValue); // Update the value of the Autocomplete field in Formik
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
            getOptionLabel={(option) => option[labelName] ?? labelUndefined}
            defaultValue={lista.find(x => x[name] === values[name]) ?? defaultValue}
            onChange={onChange ?? handleAutocompleteChange}
            value={values[name]}
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
