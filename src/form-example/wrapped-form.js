import React from "react";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { TextField } from "../components/textfield";
import Button from "@material-ui/core/Button";

const Form = withTheme(MuiTheme);

const widgets = {
  text: TextField
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

const CustomFieldTemplate = ({ children }) => (
  <div className="form-fields">{children}</div>
);

const ObjectFieldTemplate = ({ properties, title, description, uiSchema }) => {
  return (
    <div>
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

export const WrappedForm = React.memo(
  ({ schema, uiSchema, formData, extraErrors, onChange, onSubmit }) => {
    console.log("RENDER VIEW FORM", formData);

    return (
      <div style={{ margin: "40px" }}>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          extraErrors={extraErrors}
          showErrorList={false}
          widgets={widgets}
          liveValidate={true}
          FieldTemplate={CustomFieldTemplate}
          ObjectFieldTemplate={ObjectFieldTemplate}
          transformErrors={transformErrors}
          onChange={onChange}
          onSubmit={onSubmit}
        >
          <div className="button button--send">
            <Button type="submit" color="primary" variant="contained">
              Save data
            </Button>
          </div>
        </Form>
      </div>
    );
  }
);
