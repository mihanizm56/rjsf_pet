import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  getLoading,
  getSchema,
  getErrors,
  fetchSchemaAction,
  fetchFormValuesAction
} from "../../redux/form-module";

export class WrappedFormContainer extends PureComponent {
  componentDidMount() {
    this.props.fetchSchema();
  }

  submitForm = values => this.props.fetchFormValues(values.formData);

  render() {
    const {
      children,
      errorsFromServer,
      isLoading,
      fullSchema: { mainSchema, uiSchema }
    } = this.props;

    return children({
      submitForm: this.submitForm,
      mainSchema,
      uiSchema,
      isLoading,
      errorsFromServer
    });
  }
}

const mapStateToProps = store => ({
  isLoading: getLoading(store),
  fullSchema: getSchema(store),
  errorsFromServer: getErrors(store)
});

export const FormContainer = connect(mapStateToProps, {
  fetchSchema: fetchSchemaAction,
  fetchFormValues: fetchFormValuesAction
})(WrappedFormContainer);
