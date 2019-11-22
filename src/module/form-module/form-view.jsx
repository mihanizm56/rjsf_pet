import React, { memo } from "react";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import Button from "@material-ui/core/Button";
import classNames from "classnames/bind";
import { widgets } from "./widgets";
import "./styles/index.scss";

const Form = withTheme(MuiTheme);

const CustomFieldTemplate = ({ children }) => (
  <div className="form-fields">{children}</div>
);

const ObjectFieldTemplate = ({ properties, title, description, uiSchema }) => {
  return (
    <div
      className={classNames("object-field", {
        "object-field--direction-row": uiSchema.direction === "row",
        "object-field--direction-column": uiSchema.direction === "column",
        "object-field--with-padding": uiSchema.withPadding
      })}
    >
      {title && <h1 className="form-title">{title}</h1>}
      {description && <p className="form-description">{description}</p>}
      {properties.map(prop => (
        <div key={prop.content.key} className="field">
          {prop.content}
        </div>
      ))}
    </div>
  );
};

const transformErrors = errors =>
  errors.map(error => {
    if (error.name === "pattern") {
      error.message = "Enter the correct value";
    } else if (error.name === "required") {
      error.message = "This value is required";
    } else if (error.name === "maxLength") {
      error.message = "The value is too long";
    } else if (error.name === "minLength") {
      error.message = "The value is too short";
    } else {
      error.message = error.name;
    }

    return error;
  });

export const FormView = ({
  mainSchema,
  uiSchema,
  isLoading,
  handleChange,
  extraErrors,
  submitForm
}) => {
  console.log("TEST");

  return (
    <div className="generated-form">
      {isLoading ? (
        <p>Loading</p>
      ) : (
        console.log("GET extraErrors IN FORM COMPONENT", extraErrors) ||
        (mainSchema && (
          <Form
            widgets={widgets}
            schema={mainSchema}
            transformErrors={transformErrors}
            uiSchema={uiSchema}
            onSubmit={submitForm}
            FieldTemplate={CustomFieldTemplate}
            ObjectFieldTemplate={ObjectFieldTemplate}
            extraErrors={extraErrors}
            showErrorList={false}
            liveValidate={true}
            onChange={handleChange}
          >
            <div className="button button--send">
              <Button type="submit" color="primary" variant="contained">
                Save data
              </Button>
            </div>
          </Form>
        ))
      )}
    </div>
  );
};
