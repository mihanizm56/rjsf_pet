import React from "react";
import { AutoForm, SubmitField } from "uniforms-material";
import { JSONSchemaBridge } from "uniforms-bridge-json-schema";
import { connectField } from "uniforms";
import { TextField } from "../../components/textfield";
import Ajv from "ajv";
import "./styles/index.scss";

const ajv = new Ajv({ allErrors: true, useDefaults: true });

const createValidator = schema => {
  const validator = ajv.compile(schema);

  return model => {
    validator(model);

    console.log("GET VALIDATOR", validator.errors);

    if (validator.errors && validator.errors.length) {
      const details = validator.errors.map(error => {
        switch (error.keyword) {
          case "pattern":
            return { ...error, message: "enter the correct data" };
          case "required":
            return { ...error, message: "this field is required" };

          default:
            return error;
        }
      });

      // console.log("details", details);

      throw { details };
    }
  };
};

const TextFieldMaterial = connectField(TextField);

export const FormViewUniforms = ({
  mainSchema,
  uiSchema,
  isLoading,
  handleChangeField,
  externalErrors,
  submitForm
}) => {
  console.log("externalErrors", externalErrors);

  const schemaValidator = mainSchema && createValidator(mainSchema);

  const jsonSchemaBridge =
    mainSchema && new JSONSchemaBridge(mainSchema, schemaValidator);

  return (
    <div className="generated-form">
      {isLoading || !mainSchema ? (
        <p>Loading</p> /// можно не ререндерить тут, но я думаю что всё же тут будет лоадер и поля сохранять не надо
      ) : (
        <AutoForm
          validate="onChange"
          onSubmit={submitForm}
          onChange={handleChangeField}
          error={externalErrors}
          showInlineError={true}
          schema={jsonSchemaBridge}
        >
          <TextFieldMaterial name="firstName" />
          <TextFieldMaterial name="secondName" />
          <SubmitField />
        </AutoForm>
      )}
    </div>
  );
};
