import { Label } from "@mui/icons-material";
import { styled, TextField, TextFieldProps } from "@mui/material";
import { H1, H6 } from "components/Typography";
import { useFormikContext } from "formik";
import React from "react";
import { ExtendedTextFieldProps } from "interfaces/AppTextFieldInput2";
const StyledTextField = styled(TextField)(({
  theme
}) => ({
  "& .MuiOutlinedInput-input": {
    fontWeight: 500,
    color: theme.palette.text.primary
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    borderColor: theme.palette.action.disabled
  },
  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.action.hover
  },
  "& .MuiInputLabel-root": {
    fontWeight: 500,
    color: theme.palette.text.disabled
  },
  "& .MuiInputLabel-root.Mui-focused": {
    fontWeight: 600
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.disabled
  },
  "& .MuiFormHelperText-root": {
    color: "red",
  },
}));

/**
 * @property {boolean} hideTitle - Whether to hide the title
 * @param {ExtendedTextFieldProps} props - The props for the component
 * @returns 
 * @example
*  <AppTextField2
*        name="codigoBarra"
*        placeholder="Codigo de barras"
*    />
*/
const AppTextField2 = props => {
  const formik = useFormikContext();
  const { values, touched, errors, handleChange, handleBlur } = formik;
  return (
    <>
      {props.hideTitle ? null : <H6 mb={1}>{props.placeholder}</H6>}
      <StyledTextField
        fullWidth
        size="small"
        onChange={props.onChange ?? handleChange}
        onBlur={props.onBlur ?? handleBlur}
        value={values[props.name]}
        error={Boolean(touched[props.name] && errors[props.name])}
        helperText={`${errors[props.name] && touched[props.name] ? errors[props.name].toString() : ''}`}
        {...props}
      />
    </>)
};

export default AppTextField2;