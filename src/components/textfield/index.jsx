import * as React from "react";
import TextFieldMaterial from "@material-ui/core/TextField";
// export const TextField = ({
//   input: { type, name, onChange, value },
//   placeholder,
//   meta: { touched, invalid, error, submitError },
//   formError
// }) => {
//   return (
//     <TextFieldMaterial
//       fullWidth
//       placeholder={placeholder}
//       error={Boolean((touched && invalid) || formError)}
//       helperText={(touched && (error || submitError)) || formError}
//       type={type}
//       name={name}
//       onChange={onChange}
//       value={value}
//     />
//   );
// };

// export const TextField = props => {
//   const {
//     label,
//     onChange,
//     onBlur,
//     onFocus,
//     schema: { type },
//     rawErrors
//     // options: { backendError }
//   } = props;
//   console.log("TextField props", props);
//   const error = Boolean(rawErrors && rawErrors.length);
//   const errorText = error && rawErrors[0];

//   const handleChange = ({ target: { value } }) => onChange(value);
//   const handleBlur = ({ target: { value } }) => onBlur(value);
//   const handleFocus = ({ target: { value } }) => onFocus(value);

//   return (
//     <div className="text-field-material">
//       <TextFieldMaterial
//         fullWidth
//         placeholder={label}
//         error={error}
//         helperText={errorText}
//         type={type}
//         // value={value}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         onFocus={handleFocus}
//         label={label}
//       />
//     </div>
//   );
// };

export const TextField = props => {
  const {
    onChange,
    placeholder,
    disabled,
    changed: touched,
    error,
    errorMessage,
    field: { type },
    name,
    value
  } = props;
  // console.log("TextField props", props);
  // console.log("TextField errorMessage", errorMessage);

  const handleChange = ({ target: { value } }) => {
    onChange(value);
  };

  return (
    <TextFieldMaterial
      fullWidth
      disabled={disabled}
      placeholder={placeholder}
      error={Boolean(error)}
      helperText={errorMessage}
      type={type}
      name={name}
      onChange={handleChange}
      value={value}
      autoComplete="off"
    />
  );
};
