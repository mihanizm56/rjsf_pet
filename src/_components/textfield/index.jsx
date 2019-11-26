import React from "react";
import TextFieldMaterial from "@material-ui/core/TextField";

export const TextField = props => {
  const {
    label,
    onChange,
    onBlur,
    onFocus,
    schema: { type },
    rawErrors,
    value
  } = props;
  const error = Boolean(rawErrors && rawErrors.length);
  const errorText = error && rawErrors[0];

  const handleChange = ({ target: { value } }) => onChange(value);
  const handleBlur = ({ target: { value } }) => onBlur(value);
  const handleFocus = ({ target: { value } }) => onFocus(value);

  return (
    <div className="text-field-material">
      <TextFieldMaterial
        fullWidth
        placeholder={label}
        error={error}
        helperText={errorText}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        label={label}
      />
    </div>
  );
};
