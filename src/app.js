import React, { Component } from "react";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import { FormModule } from "./module/form-module/form-module";
import "./app.css";

const schema = {
  type: "object",
  properties: {
    onlyNumbersString: { type: "string", pattern: "^\\d*$" }
  }
};

function transformErrors(errors) {
  console.log("transformErrors", errors);
  return errors.map(error => {
    if (error.name === "pattern") {
      error.message = "Only digits are allowed";
    }
    return error;
  });
}

const MyCustomWidget = props => {
  console.log("MyCustomWidget prop", props);
  const error = props.rawErrors && props.rawErrors[0];
  console.log("error", error);

  return (
    <>
      <input
        type="text"
        className="custom"
        value={props.value}
        required={props.required}
        onChange={event => props.onChange(event.target.value)}
      />
      <p>my error {error}</p>
    </>
  );
};

function CustomFieldTemplate(props) {
  const {
    id,
    classNames,
    label,
    help,
    required,
    description,
    errors,
    children
  } = props;
  return (
    <div className={classNames}>
      <label htmlFor={id}>
        {label}
        {required ? "*" : null}
      </label>
      {description}
      {children}
      {/* {errors} */}
      {/* {help} */}
    </div>
  );
}

const extraErrors = {
  onlyNumbersString: {
    __errors: ["some error that got added as a prop"]
  }
};

const uiSchema = {
  onlyNumbersString: {
    "ui:widget": MyCustomWidget
  }
};

const Form = withTheme(MuiTheme);

const log = type => console.log("check");

// export const App = () => (
//   <Form
//     schema={schema}
//     transformErrors={transformErrors}
//     uiSchema={uiSchema}
//     onChange={() => log("changed")}
//     onSubmit={() => log("submitted")}
//     FieldTemplate={CustomFieldTemplate}
//     // extraErrors={extraErrors}
//     showErrorList={false}
//     liveValidate={true}
//   />
// );

export const App = () => (
  <div className="app-wrapper">
    <FormModule />
  </div>
);
