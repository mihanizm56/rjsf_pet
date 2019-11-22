export const findKeyOfField = obj => {
  const copyObj = { ...obj };
  let pathToKey = [];

  const recursivePath = objectToFindString => {
    Object.keys(objectToFindString).forEach(key => {
      if (typeof objectToFindString[key] !== "string") {
        pathToKey.push(key);
        recursivePath(objectToFindString[key]);
      } else {
        return pathToKey.push(key);
      }
    });
  };

  recursivePath(copyObj);

  return pathToKey.join(".");
};

export const removeErrorValueByKey = ({ errorsFromBack, keyToRemove }) => {
  const resultErrors = { ...errorsFromBack };
  let keysStack = keyToRemove.split(".");

  const recursiveRemoveError = errorsObj => {
    const key = keysStack[0];
    // console.log(errorsObj[key]);

    if (Boolean(errorsObj[key]) && key) {
      // console.log("key", key);
      // console.log("1");

      keysStack.shift();
      return recursiveRemoveError(errorsObj[key]);
    } else if (!Boolean(errorsObj[key]) && Boolean(errorsObj.__errors)) {
      // console.log("2");

      delete errorsObj.__errors;
      return;
    } else {
      // console.log("3");
      return;
    }
  };

  recursiveRemoveError(resultErrors);

  return resultErrors;
};

export const findByKeyAndRemoveError = ({ schemaGetValue, errorsFromBack }) => {
  const keyToRemove = findKeyOfField(schemaGetValue);
  const result = removeErrorValueByKey({ errorsFromBack, keyToRemove });

  return result;
};
