import React, { Component } from "react";
import { findByKeyAndRemoveError } from "./utils";
import isEqual from "lodash/isEqual";

const makeErrorState = ({ errorsFromServer: { details } }) => {
  if (details) {
    return details.reduce((acc, errorObj) => {
      acc[errorObj.dataPath] = errorObj;
      return acc;
    }, {});
  }
};

const formatErrorsState = ({ errorsState }) => {
  if (errorsState) {
    const details = Object.values(errorsState);
    return { details };
  }
};

const changeErrorsState = ({
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

  return resultErors;
};

export class FormErrorsContainer extends Component {
  state = { errorsState: null };

  shouldComponentUpdate(nextProps, nextState) {
    return Boolean(
      !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
    );
  }

  componentDidUpdate(prevProps) {
    const { errorsFromServer } = this.props;
    console.log(
      "UPDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD",
      // prevProps.errorsFromServer,
      this.state.errorsState,
      prevProps.errorsFromServer !== errorsFromServer
    );

    if (prevProps.errorsFromServer !== errorsFromServer) {
      console.log(
        "прежние errorsFromServer не равны errorsFromServer, обновляю стейт"
      );

      const updatedErrorsStateFromServer = makeErrorState({ errorsFromServer });

      this.setState({ errorsState: updatedErrorsStateFromServer });
    }
  }

  handleChangeErrors = errorsFromClient => {
    const { errorsState } = this.state;
    console.log("errorsState in handleChangeErrors", errorsState);

    console.log("handleChangeField ==================================");
    console.log("errorsFromClient in handleChangeErrors", errorsFromClient);

    const changedErrorsState = changeErrorsState({
      prevErrorsState: { ...errorsState },
      errorsFromClient
    });

    console.log("changedErrorsState in handleChangeErrors", changedErrorsState);

    // есть ошибки но прежний стейт был пуст
    if (changedErrorsState && !errorsState) {
      console.log("есть ошибки но прежний стейт был пуст");
      this.setState({ errorsState: changedErrorsState });
    }

    // есть ошибки но прежний стейт не был пуст
    if (changedErrorsState && errorsState) {
      console.log("есть ошибки но прежний стейт не был пуст");
      this.setState({ errorsState: changedErrorsState });
      // this.forceUpdate();
    }

    // нет ошибок но прежний стейт был непустой
    // if (!changedErrorsState && errorsState) {
    //   console.log("нет ошибок но прежний стейт был непустой");
    //   this.setState({ errorsState: null });
    // }
    // if (!changedErrorsState && !errorsState) {
    //   console.log("нет ошибок и прежний стейт пустой");
    // }

    ////////////////////////////////////

    // const newErrors = findByKeyAndRemoveError({
    //   schemaGetValue: values.formData,
    //   errorsFromBack: this.state.errorsState
    // });

    // const { details } = this.state.errorsState || {};

    // if (details && details.length) {
    //   const newErrors = details.filter(errorObject => {
    //     console.log("LOG", errorObject.dataPath, `.${field}`);

    //     return errorObject.dataPath !== `.${field}`;
    //   });
    //   console.log("newErrors", newErrors);
    //   const newErrorsObj = newErrors.length
    //     ? { details: newErrors, type: "serverError" }
    //     : null;

    //   this.setState({ errorsState: newErrorsObj });
    // }
  };

  render() {
    const { errorsState } = this.state;

    const formattedErrorsState = formatErrorsState({
      errorsState
    });

    return this.props.children({
      externalErrors: formattedErrorsState,
      handleChangeErrors: this.handleChangeErrors
    });
  }
}
