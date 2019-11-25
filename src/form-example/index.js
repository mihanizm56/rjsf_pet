import * as React from "react";
import get from "lodash/get";
import omit from "lodash/omit";
import transform from "lodash/transform";
import isEqual from "lodash/isEqual";
import isObject from "lodash/isObject";
import { WrappedForm } from "./wrapped-form";
import { schema, testErrors } from "../services/schema";

// dp eql in recursion => on my gosh
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

// fkin amazing
const getChangedPath = formData => {
  const firstKey = Object.keys(formData)[0];
  return `${firstKey}${
    typeof formData[firstKey] === "object"
      ? "." + getChangedPath(formData[firstKey])
      : ""
  }`;
};

const checkIfFormDataHasValues = formData => {
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

export const FormExample = React.memo(() => {
  const [formData, setFormData] = React.useState();
  const [extraErrors, setExtraErrors] = React.useState();

  const onChange = React.useCallback(
    e => {
      console.log("ONCHANGE");
      console.log(e);
      const ifFormDataHasValues = checkIfFormDataHasValues(e.formData);
      console.log("ifFormDataHasValues", ifFormDataHasValues);

      if (formData) {
        // Объект изменения поля
        const changedObj = getDiff(e.formData, formData);
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
        setFormData(e.formData);
      }
    },
    [extraErrors, formData]
  );

  const onSubmit = React.useCallback(e => {
    console.log("ONSUBMIT");
    console.log(e);
    return new Promise(() => {
      setTimeout(() => {
        setExtraErrors({ ...testErrors });
      }, 1000);
    });
  }, []);

  return (
    <WrappedForm
      schema={schema.mainSchema}
      uiSchema={schema.uiSchema}
      formData={formData}
      extraErrors={extraErrors}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
});
