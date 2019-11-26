import React from "react";
import TextField from "@material-ui/core/TextField";

export const PasswordInput = props => {
  const { label, onChange, onBlur, onFocus, rawErrors, value } = props;
  const error = Boolean(rawErrors && rawErrors.length);
  const errorText = error && rawErrors[0];

  const handleChange = ({ target: { value } }) => onChange(value);
  const handleBlur = ({ target: { value } }) => onBlur(value);
  const handleFocus = ({ target: { value } }) => onFocus(value);

  return (
    <div className="text-field-material">
      <TextField
        type="password"
        fullWidth
        placeholder={label}
        error={error}
        helperText={errorText}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        label={label}
      />
    </div>
  );
};
