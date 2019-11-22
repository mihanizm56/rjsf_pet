import React, { PureComponent } from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "rjsf-material-ui";
import Button from "@material-ui/core/Button";
import { widgets } from "../../module/form-module/widgets";

import "./index.scss";
import {
  getLoading,
  getSchema,
  getErrors,
  fetchSchemaAction,
  fetchFormValuesAction
} from "../../redux/form-module";

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

const transformErrors = errors => {
  // console.log("/////////////////////////////////////////////", errors);

  return errors.map(error => {
    // console.log("error name", error.name);

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
};

export class WrappedForm extends PureComponent {
  render() {
    const {
      fullSchema: { mainSchema, uiSchema },
      isLoading,
      errors
    } = this.props;
    const { extraErrors } = this.state;

    console.log("extraErrors", extraErrors);

    return (
      <div className="generated-form">
        {mainSchema && (
          <Form
            widgets={widgets}
            safeRenderCompletion={true}
            schema={mainSchema}
            transformErrors={transformErrors}
            uiSchema={uiSchema}
            onSubmit={this.submitFormValues}
            FieldTemplate={CustomFieldTemplate}
            ObjectFieldTemplate={ObjectFieldTemplate}
            extraErrors={extraErrors && extraErrors}
            showErrorList={false}
            liveValidate={true}
            // onError={error => console.log("onError", error)}
            onChange={this.handleChange.bind(this)}
          >
            <div className="button button--send">
              <Button type="submit" color="primary" variant="contained">
                Save data
              </Button>
            </div>
          </Form>
        )}
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  isLoading: getLoading(store),
  fullSchema: getSchema(store),
  extraErrors: getErrors(store)
});

export const GeneratedForm = connect(mapStateToProps, {
  fetchSchema: fetchSchemaAction,
  fetchFormValues: fetchFormValuesAction
});
