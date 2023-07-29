import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { values } from 'lodash';

const AutocompleteAsync = ({
    onOpen,
    onClose,
    label,
    options,
    open,
    loading,
    isOptionEqualToValue,
    getOptionLabel,
    handleChange,
    name,
    value,
    onChange,
    defaultValue
}) => {
    React.useEffect(() => {

    }, [open]);

    return (
        <Autocomplete
            size='small'
            fullWidth
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            options={options}
            loading={loading}
            defaultValue={defaultValue}
            onChange={onChange}
            //onChange={handleChange}
            renderInput={(params) => (
                <TextField
                  /*   error={true}
                    helperText={'error'} */
                    name={name}
                    value={value}
                    {...params}
                    label={label}
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
            )}
        />
    );
}
export default AutocompleteAsync
