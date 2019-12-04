import React from "react";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import classNames from "classnames/bind";
import Button from "@material-ui/core/Button";
import { LoadingSpinner } from "../_components/loading-spinner";
import { ErrorBox } from "./errors-box";
import { widgets } from "./widgets";
import "./index.scss";

const Form = withTheme(MuiTheme);

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

export const FormComponent = React.memo(
  ({
    schema,
    uiSchema,
    formData,
    serverErrors,
    onChange,
    onSubmit,
    isLoading
  }) => (
    <div className="generated-form">
      {schema && (
        <Form
          formData={formData}
          schema={schema}
          uiSchema={uiSchema}
          showErrorList={false}
          widgets={widgets}
          liveValidate={true}
          FieldTemplate={CustomFieldTemplate}
          ObjectFieldTemplate={ObjectFieldTemplate}
          transformErrors={transformErrors}
          onSubmit={onSubmit}
          onChange={onChange}
        >
          <div className="button button--send">
            <Button type="submit" color="primary" variant="contained">
              Save data
            </Button>
          </div>
        </Form>
      )}

      {serverErrors && <ErrorBox serverErrors={serverErrors} />}

      {isLoading && (
        <div className="loading-spinner-container">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
);
