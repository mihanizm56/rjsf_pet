import React, { memo, useCallback, useEffect, useState } from "react";
import { FormComponent } from "./form-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoading,
  getSchema,
  getErrors,
  fetchSchemaAction,
  fetchFormValuesAction,
  removeErrorsAction
} from "../redux/form-module";

const checkIfObjectHasStringValues = formData => {
  let result = false;

  const recursiveCheck = obj => {
    Object.values(obj).forEach(objValue => {
      if (typeof objValue === "object") {
        recursiveCheck(objValue);
      } else if (typeof objValue === "string") {
        result = true;
      }
    });
  };

  recursiveCheck(formData);

  return result;
};

export const FormExample = memo(() => {
  // redux block
  const dispatch = useDispatch();
  const isLoading = useSelector(state => getLoading(state));
  const fullSchema = useSelector(state => getSchema(state));
  const serverErrors = useSelector(state => getErrors(state));

  // state block
  const [formData, setFormData] = useState();

  // lifecycle block
  useEffect(() => {
    dispatch(fetchSchemaAction());
  }, []); // eslint-disable-line

  // methods block
  const onSubmit = useCallback(
    ({ formData }) => {
      dispatch(fetchFormValuesAction(formData));
    },
    [dispatch]
  );

  const onChange = useCallback(
    ({ formData, edit }) => {
      const ifFormDataHasValues = checkIfObjectHasStringValues(formData);

      // поле e.edit есть только при первом рендере - потом при изменении формы его нет
      if (edit && edit === false) {
        console.log("INITIAL RENDERING");
        return;
      }

      // проверяем есть ли любые поля со строками в formData при самом первом вызове формы
      if (ifFormDataHasValues) {
        setFormData(formData);
        dispatch(removeErrorsAction());
      }
    },
    [dispatch]
  );

  return (
    <FormComponent
      serverErrors={serverErrors}
      schema={fullSchema && fullSchema.mainSchema}
      uiSchema={fullSchema && fullSchema.uiSchema}
      onSubmit={onSubmit}
      isLoading={isLoading}
      onChange={onChange}
      formData={formData}
    />
  );
});
