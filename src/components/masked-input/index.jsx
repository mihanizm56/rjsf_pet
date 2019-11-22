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
  schema: { type },
  rawErrors
}) => {
  const submitError = Boolean(rawErrors) && rawErrors[0];

  const handleChange = event => {
    const value = event.target.value;

    onChange(value);
  };

  const handleBlur = event => {
    const value = event.target.value;

    onBlur(value);
  };

  const handleFocus = event => {
    const value = event.target.value;

    onFocus(value);
  };

  return (
    <div className="text-field-material">
      <InputMask mask="9999 9999 9999 9999" maskChar=" ">
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
