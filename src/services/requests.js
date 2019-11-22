import { schema, testErrors } from "./schema";

export const schemaRequest = page => Promise.resolve({ schema });

// export const mockFormValuesRequest = () =>
//   Promise.resolve({ errors: testErrors });

export const mockFormValuesRequest = () =>
  fetch("http://localhost:8081/test", { mode: "cors" })
    .then(data => data.json())
    .then(data => console.log("DATA FROM SERVER", data) || data);
