import { createSelector } from "reselect";

const schemaStorageSelector = store => store.schemaStorage;

export const getLoading = createSelector(
  [schemaStorageSelector],
  schemaStorage => schemaStorage.isLoading
);

export const getSchema = createSelector(
  [schemaStorageSelector],
  schemaStorage => schemaStorage.schema
);

export const getErrors = createSelector(
  [schemaStorageSelector],
  schemaStorage => schemaStorage.errors
);
