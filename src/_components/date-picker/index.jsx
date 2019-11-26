import React, { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export const DatePicker = ({ disablePast, onChange, label, rawErrors }) => {
  console.log("error in DatePicker", rawErrors);

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
