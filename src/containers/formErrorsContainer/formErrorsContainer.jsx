import React, { Component } from "react";
import { findByKeyAndRemoveError } from "./utils";
import isEqual from "lodash/isEqual";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true, useDefaults: true });

const makeErrorState = ({ errorsFromServer: { details } }) => {
  if (details) {
    return details.reduce((acc, errorObj) => {
      acc[errorObj.dataPath] = errorObj;
      return acc;
    }, {});
  }
};

const formatErrorsState = ({ errorsState }) => {
  console.log("STATE BEFORE TO FORMAT", errorsState);

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

const EMPTY_ERROR = { details: [] };

export class FormErrorsContainer extends Component {
  state = {
    errorsState: null,
    valuesAreExist: false
    // errorsState: {
    //   firstName: { dataPath: ".firstName", message: "default error" }
    // }
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(
  //     "shouldComponentUpdate",
  //     nextState,
  //     this.state,
  //     Boolean(!isEqual(nextState, this.state))
  //   );

  //   return Boolean(
  //     !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
  //   );
  // }

  componentDidUpdate(prevProps) {
    const { errorsFromServer, schema } = this.props;
    console.log("UPDATED FormErrorsContainer");
    console.log("NEW ERRORS STATE", this.state.errorsState);

    if (!this.validator && schema) {
      this.validator = ajv.compile(schema);
    }

    if (prevProps.errorsFromServer !== errorsFromServer) {
      console.log(
        "прежние errorsFromServer не равны errorsFromServer, обновляю стейт"
      );

      console.log(errorsFromServer);

      const updatedErrorsStateFromServer = makeErrorState({ errorsFromServer });

      this.setState({ errorsState: updatedErrorsStateFromServer });
    }
  }

  handleChangeErrors = errorsFromClient => {
    const { errorsState } = this.state;
    console.log("errorsState in handleChangeErrors", errorsState);

    console.log("handleChangeErrors =========================================");
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

  validator = null;

  schemaValidator = values => {
    console.log("schemaValidator acts", values);

    if (this.validator) {
      this.validator(values);
      const errors = this.validator.errors;

      let formattedClientErrors;
      console.log("validator errors", errors);

      // есть ошибки валидации
      if (errors && errors.length) {
        console.log("есть ошибки валидации");

        formattedClientErrors = errors.reduce((acc, error) => {
          if (error.keyword === "pattern") {
            const pathParamsFieldName = [...error.dataPath.split(".")].pop();

            error.field = pathParamsFieldName;
            error.message = "enter the correct data";
            acc.push(error);
          }

          if (error.keyword === "required") {
            error.field = error.params.missingProperty;
            error.message = "this value is required";
            acc.push(error);
          }

          if (error.keyword === "minLength") {
            const pathParamsName = [...error.dataPath.split(".")].pop();

            error.field = pathParamsName;
            error.message = "this value is too short";
            acc.push(error);
          }

          return acc;
        }, []);
      }
      // нет ошибок валидации
      else if (!this.validator.errors) {
        console.log("нет ошибок валидации");

        formattedClientErrors = [];
      }
      // исключение
      else {
        console.log("///////////////////////////////////");
      }

      this.stateFormManager({
        clientErrors: { details: formattedClientErrors },
        values
      });
    }
  };

  stateFormManager = ({ clientErrors, values: newValues }) => {
    const { errorsState } = this.state;
    const { details: errorsDetails } = clientErrors;

    console.log("stateFormManager acts=============================");
    console.log("errorsDetails in stateFormManager", errorsDetails);
    console.log("errorsState in stateFormManager", errorsState);
    console.log("newValues in stateFormManager", newValues);

    const changedErrorsState = changeErrorsState({
      prevErrorsState: errorsState,
      errorsFromClient: clientErrors
    });

    // console.log("changedErrorsState", changedErrorsState);

    // нет прежних ошибок и новые пришли с клиента
    // и есть значения в полях формы
    if (
      !Boolean(errorsState) &&
      errorsDetails &&
      errorsDetails.length &&
      newValues &&
      Object.keys(newValues).length
    ) {
      console.log(
        "нет прежних ошибок и новые пришли с клиента и есть значения в полях формы"
      );

      this.setState({ errorsState: changedErrorsState, valuesAreExist: true });
    }

    // нет прежних ошибок и новые пришли с клиента
    // но нет значений в полях формы
    else if (!Boolean(errorsState) && errorsDetails && errorsDetails.length) {
      console.log(
        "нет прежних ошибок и новые пришли с клиента и нет значений в полях формы"
      );
    }

    // нет прежних ошибок и новые не пришли с клиента
    // -> ничего не обновляем
    else if (!Boolean(errorsState) && errorsDetails && !errorsDetails.length) {
      console.log("нет прежних ошибок и новые не пришли с клиента");
    }

    // есть прежние ошибки и новые пришли с клиента
    else if (
      Boolean(errorsState) &&
      errorsDetails &&
      errorsDetails.length &&
      newValues &&
      Object.keys(newValues).length
    ) {
      // тут может быть кейс что есть ошибки с сервера и новые ошибки required автогенерируются тк если поля пусты
      console.log(
        "есть прежние ошибки и новые пришли с клиента",
        errorsDetails
      );

      console.log(
        "changedErrorsState!!!!!!!!!!!!!!!!!!!!!",
        changedErrorsState
      );

      // ошибки не равны -> ставим новые ошибки в стейт
      console.log(
        "TEST",
        isEqual(changedErrorsState, errorsState),
        changedErrorsState,
        errorsState
      );

      if (!isEqual(changedErrorsState, errorsState)) {
        console.log("ошибки не равны -> ставим новые ошибки в стейт");

        this.setState({ errorsState: changedErrorsState });
      }
    }

    // есть прежние ошибки и новые не пришли с клиента ->
    else if (Boolean(errorsState) && errorsDetails && !errorsDetails.length) {
      console.log("есть прежние ошибки и новые не пришли с клиента");
      // this.setState({ errorsState: null });
    }
  };
  render() {
    const { errorsState, valuesAreExist } = this.state;
    const { schema } = this.props;

    const formattedErrorsState = formatErrorsState({
      errorsState
    });

    return this.props.children({
      externalErrors: !valuesAreExist ? EMPTY_ERROR : formattedErrorsState,
      schemaValidator: schema && this.schemaValidator
    });
  }
}
