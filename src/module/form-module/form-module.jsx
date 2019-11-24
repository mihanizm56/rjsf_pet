import React from "react";
import { FormErrorsContainer } from "../../containers/formErrorsContainer/formErrorsContainer";
import { FormContainer } from "./form-container";
import { FormViewUniforms } from "./form-view-uniforms";

export const FormModule = () => {
  return (
    <FormContainer>
      {({ submitForm, mainSchema, isLoading, errorsFromServer }) => (
        <FormErrorsContainer
          errorsFromServer={errorsFromServer}
          schema={mainSchema}
        >
          {({ externalErrors, schemaValidator }) => (
            <FormViewUniforms
              submitForm={submitForm}
              schema={mainSchema}
              isLoading={isLoading}
              externalErrors={externalErrors}
              schemaValidator={schemaValidator}
            />
          )}
        </FormErrorsContainer>
      )}
    </FormContainer>
  );
};
