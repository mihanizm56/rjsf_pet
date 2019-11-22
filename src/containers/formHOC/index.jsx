import React, { PureComponent } from "react";
import { findByKeyAndRemoveError } from "./utils";

export class FormErrorsContainer extends PureComponent {
  state = { extraErrors: {} };

  componentDidUpdate(prevProps, prevState) {
    console.log("UPD", this.state);

    if (prevProps.errorsFromServer !== this.props.errorsFromServer) {
      this.setState({ extraErrors: this.props.errorsFromServer });
    }
  }

  changeErrors = values => {
    const newErrors = findByKeyAndRemoveError({
      schemaGetValue: values.formData,
      errorsFromBack: this.state.extraErrors
    });

    console.log("TEST");

    this.setState({ extraErrors: null });
  };

  render() {
    return this.props.children({
      extraErrors: this.state.extraErrors,
      changeErrors: this.changeErrors
    });
  }
}
