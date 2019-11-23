import React, { PureComponent } from "react";
import { findByKeyAndRemoveError } from "./utils";

export class FormErrorsContainer extends PureComponent {
  state = { extraErrors: null };

  componentDidUpdate(prevProps, prevState) {
    console.log("UPD", this.props);

    if (prevProps.errorsFromServer !== this.props.errorsFromServer) {
      this.setState({ extraErrors: this.props.errorsFromServer });
    }
  }

  handleChangeField = field => {
    // const newErrors = findByKeyAndRemoveError({
    //   schemaGetValue: values.formData,
    //   errorsFromBack: this.state.extraErrors
    // });
    console.log("handleChangeField goes", field, this.state.extraErrors);

    const { details } = this.state.extraErrors || {};

    if (details && details.length) {
      const newErrors = details.filter(errorObject => {
        console.log("LOG", errorObject.dataPath, `.${field}`);

        return errorObject.dataPath !== `.${field}`;
      });
      console.log("newErrors", newErrors);
      const newErrorsObj = newErrors.length ? { details: newErrors } : null;

      this.setState({ extraErrors: newErrorsObj });
    }
  };

  render() {
    return this.props.children({
      extraErrors: this.state.extraErrors,
      handleChangeField: this.handleChangeField
    });
  }
}
