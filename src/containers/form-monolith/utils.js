export const makeErrorState = ({ errorsFromServer: { details } }) => {
  if (details) {
    return details.reduce((acc, errorObj) => {
      acc[errorObj.dataPath] = errorObj;
      return acc;
    }, {});
  }
};

export const formatErrorsState = ({ errorsState }) =>
  errorsState && { details: Object.values(errorsState) };

export const changeErrorsState = ({
  prevErrorsState,
  errorsFromClient: { details }
}) => {
  console.log("prevErrorsState in changeErrorsState", prevErrorsState);
  console.log("details in changeErrorsState", details);

  let resultErors = null;

  if (details && details.length) {
    const mappedErrors = details.reduce(
      (acc, errorObj) => {
        if (errorObj && errorObj.field) {
          acc[errorObj.field] = errorObj;
        }

        return acc;
      },
      Boolean(prevErrorsState) ? prevErrorsState : {}
    );

    resultErors = Object.keys(mappedErrors).length ? mappedErrors : null;
  } else if (details && !details.length && !prevErrorsState) {
    resultErors = null;
  } else {
    resultErors = Object.keys(prevErrorsState).length ? prevErrorsState : null;
  }

  console.log("resultErors", resultErors);

  return resultErors;
};
