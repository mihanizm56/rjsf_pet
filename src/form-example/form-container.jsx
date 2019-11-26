import React, { memo, useState, useCallback, useEffect } from "react";
import get from "lodash/get";
import omit from "lodash/omit";
import transform from "lodash/transform";
import isEqual from "lodash/isEqual";
import isObject from "lodash/isObject";
import { WrappedForm } from "./form-component";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoading,
  getSchema,
  getErrors,
  fetchSchemaAction,
  fetchFormValuesAction
} from "../redux/form-module";

const getDiff = (object, base) => {
  const changes = (object, base) => {
    return transform(object, function(result, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] =
          isObject(value) && isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  };
  return changes(object, base);
};

const getChangedPath = formData => {
  const firstKey = Object.keys(formData)[0];
  return `${firstKey}${
    typeof formData[firstKey] === "object"
      ? "." + getChangedPath(formData[firstKey])
      : ""
  }`;
};

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
  const [formData, setFormData] = useState();
  const [extraErrors, setExtraErrors] = useState();

  const dispatch = useDispatch();
  const isLoading = useSelector(state => getLoading(state));
  const fullSchema = useSelector(state => getSchema(state));
  const errorsFromServer = useSelector(state => getErrors(state));

  const mainSchema = fullSchema && fullSchema.mainSchema;
  const uiSchema = fullSchema && fullSchema.uiSchema;

  console.log("isLoading in FormExample", isLoading);

  const onChange = useCallback(
    ({ formData, edit }) => {
      // console.log("ONCHANGE");
      // console.log(e);
      const ifFormDataHasValues = checkIfObjectHasStringValues(formData);

      // поле e.edit есть только при первом рендере - потом при изменении формы его нет
      if (edit && edit === false) {
        console.log("INITIAL RENDERING");
        return;
      }

      if (formData) {
        // Объект изменения поля
        const changedObj = getDiff(formData, formData);
        // Путь до измененного поля
        const changedPath = getChangedPath(changedObj);

        // Если поле есть в extraErrors
        if (extraErrors && get(extraErrors, changedPath)) {
          // Убираем поле из extraErrors
          const newExtraErrors = omit(extraErrors, [changedPath]);
          setExtraErrors(newExtraErrors);
        }
      }

      // проверяем есть ли любые поля со строками в formData при самом первом вызове формы
      if (ifFormDataHasValues) {
        // console.log("FORMDATA HAS ANY VALUE AND NOT INITIAL", e.formData);

        setFormData(formData);
      }
    },
    [extraErrors]
  );

  const onSubmit = useCallback(
    ({ formData }) => {
      console.log("ONSUBMIT");
      console.log(formData);

      const formHasErrors = checkIfObjectHasStringValues(extraErrors);

      if (!formHasErrors) {
        dispatch(fetchFormValuesAction(formData));
      }
    },
    [dispatch, extraErrors]
  );

  useEffect(() => {
    dispatch(fetchSchemaAction());
  }, []); // eslint-disable-line

  useEffect(() => {
    if (errorsFromServer) {
      console.log("errorsFromServer updated", errorsFromServer);

      setExtraErrors({ ...errorsFromServer });
    }
  }, [errorsFromServer]);

  return (
    <WrappedForm
      schema={mainSchema}
      uiSchema={uiSchema}
      formData={formData}
      extraErrors={extraErrors}
      onChange={onChange}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
});
