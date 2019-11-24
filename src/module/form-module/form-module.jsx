import React from "react";
import { FormErrorsContainer } from "../../containers/formErrorsContainer/formErrorsContainer";
import { FormContainer } from "./form-container";
import { FormViewUniforms } from "./form-view-uniforms";

export const FormModule = () => {
  return (
    <FormContainer>
      {({ submitForm, mainSchema, isLoading, errorsFromServer }) => (
        <FormErrorsContainer errorsFromServer={errorsFromServer}>
          {({ externalErrors, handleChangeErrors }) => (
            <FormViewUniforms
              submitForm={submitForm}
              mainSchema={mainSchema}
              isLoading={isLoading}
              externalErrors={externalErrors}
              handleChangeErrors={handleChangeErrors}
            />
          )}
        </FormErrorsContainer>
      )}
    </FormContainer>
  );
};
