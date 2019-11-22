import React from "react";
import { FormErrorsContainer } from "../../containers/formHOC";
import { FormContainer } from "./form-container";
import { FormView } from "./form-view";

export const FormModule = () => {
  return (
    <FormContainer>
      {({ submitForm, mainSchema, uiSchema, isLoading, errorsFromServer }) => (
        <FormErrorsContainer errorsFromServer={errorsFromServer}>
          {({ extraErrors, changeErrors }) => (
            <FormView
              submitForm={submitForm}
              mainSchema={mainSchema}
              uiSchema={uiSchema}
              isLoading={isLoading}
              extraErrors={extraErrors}
              handleChange={changeErrors}
            />
          )}
        </FormErrorsContainer>
      )}
    </FormContainer>
  );
};
