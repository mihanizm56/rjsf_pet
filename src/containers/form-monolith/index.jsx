import React, { Component } from "react";
import { connect } from "react-redux";
import Ajv from "ajv";
import { AutoForm, SubmitField } from "uniforms-material";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import { connectField } from "uniforms";
import isEqual from "lodash/isEqual";
import {
  getLoading,
  getSchema,
  getErrors,
  fetchSchemaAction,
  fetchFormValuesAction
} from "../../redux/form-module";
import { makeErrorState, formatErrorsState, changeErrorsState } from "./utils";
import { TextField } from "../../components/textfield";
import "./index.scss";

import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import { PropTypes } from "react";

const ajv = new Ajv({ allErrors: true, useDefaults: true });

const TextFieldMaterial = connectField(TextField);

const Auto = parent =>
  class Custom extends parent {
    static Auto = Auto;
    static displayName = `Auto${parent.displayName}`;

    constructor() {
      super(...arguments); // eslint-disable-line

      this.state = {
        ...this.state,
        model: this.props.model,
        modelSync: this.props.model
      };
    }

    componentWillReceiveProps({ model }) {
      super.componentWillReceiveProps(...arguments); // eslint-disable-line

      if (!isEqual(this.props.model, model)) {
        this.setState({ model, modelSync: model });
      }
    }

    func() {
      // makes whatever i need
      console.log("FOO");
    }

    getNativeFormProps() {
      const {
        onChangeModel, // eslint-disable-line no-unused-vars
        ...props
      } = super.getNativeFormProps();

      return props;
    }

    getModel(mode) {
      return mode === "form" ? this.state.modelSync : this.state.model;
    }

    onChange(key, value) {
      this.setState(
        state => ({ modelSync: set(cloneDeep(state.modelSync), key, value) }),
        () => {
          super.onChange(...arguments); // eslint-disable-line
          this.setState({ model: this.state.modelSync }, () => {
            if (this.props.onChangeModel) {
              this.props.onChangeModel(this.state.model);
            }
          });
        }
      );
    }

    onReset() {
      this.setState(() => {
        super.onReset();

        return {
          model: this.props.model,
          modelSync: this.props.model
        };
      });
    }

    onSubmit(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.func(); // func that i wanted to call

      return new Promise(resolve =>
        this.setState({ validate: true }, () =>
          resolve(this.onValidate().then(() => super.onSubmit()))
        )
      );
    }

    onValidate() {
      return this.onValidateModel(this.getChildContextModel());
    }
  };

const Test = Auto(AutoForm);

export class WrappedComponent extends Component {
  constructor() {
    super();

    this.validator = null;
    this.cachedValues = {};
    this.state = {
      errorsState: null,
      valuesAreEmpty: true
    };
  }

  componentDidMount() {
    this.props.fetchSchema();
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     console.log("shouldComponentUpdate", nextState);

  //     console.log(
  //       "shouldComponentUpdate",
  //       nextProps,
  //       this.props,
  //       Boolean(!isEqual(nextProps, this.props))
  //     );

  //     return Boolean(
  //       !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
  //     );
  //     return true;
  //   }

  //   componentDidUpdate(prevProps) {
  //     console.log("UPDATED FORM COMPONENT");
  //     console.log("NEW ERRORS STATE", this.state.errorsState);

  //     const {
  //       errorsFromServer,
  //       fullSchema: { mainSchema: schema }
  //     } = this.props;

  //     if (!this.validator && schema) {
  //       this.validator = ajv.compile(schema);
  //     }

  //     if (prevProps.errorsFromServer !== errorsFromServer) {
  //       console.log(
  //         "прежние errorsFromServer не равны errorsFromServer, обновляю стейт"
  //       );

  //       console.log(errorsFromServer);

  //       const updatedErrorsStateFromServer = makeErrorState({ errorsFromServer });

  //       this.setState({ errorsState: updatedErrorsStateFromServer });
  //     }
  //   }

  submitForm = values =>
    console.log("FETCH VALUES", values) ||
    this.props.fetchFormValues(values.formData);

  schemaValidator = values => {
    // if (!isEqual(values, this.cachedValues)) {
    // this.cachedValues = { ...values };
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

      return formattedClientErrors;

      // this.stateFormManager({
      //   clientErrors: { details: formattedClientErrors },
      //   values
      // });
    }
    // }
  };

  stateFormManager = ({ clientErrors, values: newValues }) => {
    const { errorsState } = this.state;
    const { details: errorsDetails } = clientErrors;

    console.log("stateFormManager acts=============================");
    console.log("errorsDetails in stateFormManager", errorsDetails);
    console.log("errorsState in stateFormManager", errorsState);
    console.log("newValues in stateFormManager", newValues);

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

      const changedErrorsState = changeErrorsState({
        prevErrorsState: errorsState,
        errorsFromClient: clientErrors
      });

      this.setState({ errorsState: changedErrorsState, valuesAreEmpty: false });
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
      const changedErrorsState = changeErrorsState({
        prevErrorsState: errorsState,
        errorsFromClient: clientErrors
      });
      // тут может быть кейс что есть ошибки с сервера и новые ошибки required автогенерируются тк если поля пусты
      console.log(
        !isEqual(changedErrorsState, errorsState),
        "есть прежние ошибки и новые пришли с клиента",
        errorsState,
        changedErrorsState
      );

      // ошибки не равны -> ставим новые ошибки в стейт
      if (!isEqual(changedErrorsState, errorsState)) {
        console.log("ошибки не равны -> ставим новые ошибки в стейт");

        this.setState({ errorsState: changedErrorsState });
      }
    }

    // есть прежние ошибки и новые не пришли с клиента ->
    else if (Boolean(errorsState) && errorsDetails && !errorsDetails.length) {
      console.log("есть прежние ошибки и новые не пришли с клиента");
      this.setState({ errorsState: null });
    }
  };

  render() {
    const {
      fullSchema: { mainSchema: schema },
      submitForm
    } = this.props;
    const { errorsState } = this.state;

    console.log("errorsState in render", errorsState);

    const formattedErrorsState = formatErrorsState({
      errorsState
    });

    console.log("formattedErrorsState in render", formattedErrorsState);

    const jsonSchemaBridge = schema && new JSONSchemaBridge(schema);

    function createValidator(schema) {
      const validator = ajv.compile(schema);
      return model => {
        validator(model);
        if (validator.errors && validator.errors.length) {
          return { details: validator.errors };
        } else {
          return { details: null };
        }
      };
    }

    return (
      <div className="generated-form">
        {schema && (
          <Test
            validate="onChange"
            onSubmit={submitForm}
            showInlineError={true}
            schema={jsonSchemaBridge}
            onValidate={(model, _, callback) => {
              if (formattedErrorsState) {
                console.log("//////////////////////", formattedErrorsState);
              }

              const validator = createValidator(schema);

              const { details } = validator(model);

              console.log("details", details);

              if (details) {
                callback({ details });
              } else {
                console.log("///////");

                callback(null);
              }
              //   return {};
            }}
            // validator={{ clean: true }}
          >
            <TextFieldMaterial name="firstName" />
            <TextFieldMaterial name="secondName" />
            <TextFieldMaterial name="thirdName" />
            <SubmitField />
          </Test>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isLoading: getLoading(store),
  fullSchema: getSchema(store),
  errorsFromServer: getErrors(store)
});

export const MonolithUniformForm = connect(mapStateToProps, {
  fetchSchema: fetchSchemaAction,
  fetchFormValues: fetchFormValuesAction
})(WrappedComponent);
