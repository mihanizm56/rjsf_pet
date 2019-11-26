import React from "react";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";

// export const MaskedInput = ({
//   input,
//   label,
//   inputProps,
//   meta: { touched, invalid, error }
// }) => (
//   // eslint-disable-next-line
//   <InputMask mask="9999 9999 9999 9999" {...input} maskChar=" ">
//     {() => (
//       <TextField
//         fullWidth
//         label={label}
//         placeholder={label}
//         error={touched && invalid}
//         helperText={touched && error}
//         inputProps={inputProps}
//       />
//     )}
//   </InputMask>
// );

export const MaskedInput = ({
  label,
  onChange,
  onBlur,
  onFocus,
  rawErrors
}) => {
  const submitError = Boolean(rawErrors) && rawErrors[0];

  const handleChange = ({ target: { value } }) => onChange(value);
  const handleBlur = ({ target: { value } }) => onBlur(value);
  const handleFocus = ({ target: { value } }) => onFocus(value);

  const inputProps = {
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus
  };

  return (
    <div className="text-field-material">
      <InputMask mask="9999 9999 9999 9999" maskChar=" " {...inputProps}>
        {() => (
          <TextField
            fullWidth
            label={label}
            placeholder={label}
            error={Boolean(rawErrors)}
            helperText={submitError}
          />
        )}
      </InputMask>
    </div>
  );
};
