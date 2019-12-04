import { schema } from "./schema";

export const testErrors = {
  cvv: "test cvv error",
  "expired-date": "test date error"
};

export const schemaRequest = page => Promise.resolve({ schema });

export const mockFormValuesRequest = () =>
  Promise.resolve().then(() => ({
    errors: testErrors
  }));

// export const mockFormValuesRequest = () =>
//   fetch("http://localhost:8081/test", { mode: "cors" })
//     .then(data => data.json())
//     .then(data => console.log("DATA FROM SERVER", data) || data);
