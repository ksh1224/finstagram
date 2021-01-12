import { createStore, applyMiddleware, compose, Store } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware, { END } from "redux-saga";
import rootReducer from "./reducers";

const saga = createSagaMiddleware();
const configureStore = (preloadedState?: any) => {
  const store: Store & ObjectType = createStore(
    rootReducer,
    preloadedState,
    compose<any>(
      process.env.REACT_APP_DEV
        ? applyMiddleware(saga, createLogger())
        : applyMiddleware(saga)
    )
  );
  store.runSaga = saga.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default configureStore;
