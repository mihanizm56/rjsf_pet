import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";
import { enableBatching } from "redux-batched-actions";

export const createAppStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    enableBatching(rootReducer),
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : f => f
    )
  );

  sagaMiddleware.run(rootSaga);
  return store;
};
