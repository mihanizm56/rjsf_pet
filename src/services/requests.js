import { schema, testErrors, schemaTest } from "./schema";

export const schemaRequest = page => Promise.resolve({ schema: schemaTest });

export const mockFormValuesRequest = () =>
  new Promise(res => {
    setTimeout(() => {
      res({ errors: testErrors });
    }, 2000);
  });

// export const mockFormValuesRequest = () =>
//   fetch("http://localhost:8081/test", { mode: "cors" })
//     .then(data => data.json())
//     .then(data => console.log("DATA FROM SERVER", data) || data);
