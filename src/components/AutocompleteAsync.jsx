import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const AutocompleteAsync = ({
    onOpen,
    onClose,
    label,
    values,
    open,
    loading,
    isOptionEqualToValue,
    getOptionLabel
}) => {
    React.useEffect(() => {
       
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            size='small'
            fullWidth
            open={open}
            onOpen={onOpen}
            onClose={onClose}
            isOptionEqualToValue={isOptionEqualToValue}
            getOptionLabel={getOptionLabel}
            options={values}
            loading={loading}
            renderInput={(params) => (
                <TextField
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
