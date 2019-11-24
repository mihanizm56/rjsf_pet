import React, { Component } from "react";
import { AutoForm, SubmitField } from "uniforms-material";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import { connectField } from "uniforms";
import { TextField } from "../../components/textfield";
import isEqual from "lodash/isEqual";
import Ajv from "ajv";
import "./styles/index.scss";

const ajv = new Ajv({ allErrors: true, useDefaults: true });

const createValidator = ({ schema, handleChangeErrors }) => {
  const validator = ajv.compile(schema);

  return model => {
    validator(model);

    if (validator.errors && validator.errors.length) {
      const details = validator.errors.reduce((acc, error) => {
        if (error.keyword === "pattern") {
          const pathParamsName = [...error.dataPath.split(".")].pop();

          error.field = pathParamsName;
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

      console.log("GET VALIDATOR details", details);

      return handleChangeErrors({ details });
    } else {
      return handleChangeErrors({ details: [] });
    }
  };
};

const TextFieldMaterial = connectField(TextField);

export class FormViewUniforms extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return Boolean(
      !isEqual(nextProps, this.props) || !isEqual(nextState, this.state)
    );
  }

  render() {
    const {
      mainSchema,
      // uiSchema,
      // isLoading,
      handleChangeErrors,
      externalErrors,
      submitForm
    } = this.props;

    console.log("externalErrors", externalErrors);

    const schemaValidator =
      mainSchema && createValidator({ schema: mainSchema, handleChangeErrors });

    const jsonSchemaBridge =
      mainSchema && new JSONSchemaBridge(mainSchema, schemaValidator);

    return (
      <div className="generated-form">
        {mainSchema && (
          <AutoForm
            validate="onChange"
            onSubmit={submitForm}
            // onChange={handleChangeErrors}
            error={externalErrors}
            showInlineError={true}
            schema={jsonSchemaBridge}
          >
            <TextFieldMaterial name="firstName" />
            <TextFieldMaterial name="secondName" />
            <TextFieldMaterial name="thirdName" />
            <SubmitField />
          </AutoForm>
        )}
      </div>
    );
  }
}
