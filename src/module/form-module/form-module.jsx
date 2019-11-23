import React from "react";
import { FormErrorsContainer } from "../../containers/formHOC";
import { FormContainer } from "./form-container";
import { FormViewUniforms } from "./form-view-uniforms";

export const FormModule = () => {
  return (
    <FormContainer>
      {({ submitForm, mainSchema, isLoading, errorsFromServer }) => (
        <FormErrorsContainer errorsFromServer={errorsFromServer}>
          {({ extraErrors, handleChangeField }) => (
            <FormViewUniforms
              submitForm={submitForm}
              mainSchema={mainSchema}
              isLoading={isLoading}
              externalErrors={extraErrors}
              handleChangeField={handleChangeField}
            />
          )}
        </FormErrorsContainer>
      )}
    </FormContainer>
  );
};
