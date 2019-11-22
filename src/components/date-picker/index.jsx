import React, { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

// export const DatePicker = ({
//   input,
//   meta: { touched, error },
//   fullWidth,
//   inputProps,
//   change
// }) => {
//   const handleChange = (event, value) => {
//     const initialDateValue = value.split("/");
//     const resultDateValue = `${initialDateValue[1]}/${initialDateValue[0]}/${initialDateValue[2]}`;
//     const pureValue = new Date(Date.parse(resultDateValue));

//     change(input.name, pureValue);
//   };

//   return (
//     <MuiPickersUtilsProvider utils={DateFnsUtils}>
//       <KeyboardDatePicker
//         {...input}
//         fullWidth={fullWidth}
//         disableToolbar
//         variant="inline"
//         format="dd/MM/yyyy"
//         disablePast
//         error={touched && error}
//         helperText={touched && error}
//         inputProps={inputProps}
//         onChange={handleChange}
//       />
//     </MuiPickersUtilsProvider>
//   );
// };

export const DatePicker = ({ disablePast, onChange, label, rawErrors }) => {
  const [dateState, setDate] = useState(null);

  const handleChange = (event, value) => {
    let pureValue;

    if (value) {
      const initialDateValue = value.split("/");
      const resultDateValue = `${initialDateValue[1]}/${initialDateValue[0]}/${initialDateValue[2]}`;
      pureValue = new Date(Date.parse(resultDateValue));
    }

    setDate(pureValue);
    onChange(`${pureValue}`);
  };

  const submitError = Boolean(rawErrors) && rawErrors[0];

  return (
    <div className="text-field-material">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          fullWidth
          label={label}
          disableToolbar
          format="dd/MM/yyyy"
          error={Boolean(rawErrors)}
          helperText={submitError}
          disablePast
          value={dateState}
          onChange={handleChange}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};
