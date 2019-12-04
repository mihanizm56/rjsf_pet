import React, { memo, useMemo } from "react";
import "./index.scss";

const mapErrors = errorsIbObj =>
  Object.keys(errorsIbObj).reduce((acc, errorField) => {
    const error = { errorField, errorValue: errorsIbObj[errorField] };
    acc.push(error);

    return acc;
  }, []);

const ErrorsList = memo(({ errors }) => (
  <ul className="errors-list">
    {errors.map((error, index) => (
      <li className="errors-list__list-item" key={`${index}-${new Date()}`}>
        <span className="error-key">{error.errorField}</span>
        <span className="error-value">{error.errorValue}</span>
      </li>
    ))}
  </ul>
));

export const ErrorBox = memo(({ serverErrors }) => {
  const errors = useMemo(() => mapErrors(serverErrors), [serverErrors]);
  console.log("errors", errors);

  return (
    <div className="errors-box-container">
      <h3 className="errors-box-title">Errors</h3>
      {<ErrorsList errors={errors} />}
    </div>
  );
});
