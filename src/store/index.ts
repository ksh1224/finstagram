import {
  createStore,
  applyMiddleware,
  compose,
  Store,
  StoreEnhancer,
} from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware, { END } from "redux-saga";
import * as Sentry from "@sentry/react";
import rootReducer from "./reducers";

const sentryReduxEnhancer: StoreEnhancer<
  Record<string, unknown>,
  RootState
> = Sentry.createReduxEnhancer({
  // Optionally pass options
});

const saga = createSagaMiddleware();
const configureStore = (preloadedState?: any) => {
  const store: Store & ObjectType = createStore(
    rootReducer,
    preloadedState,
    compose<any>(
      process.env.REACT_APP_DEV
        ? applyMiddleware(saga, createLogger())
        : applyMiddleware(saga),
      sentryReduxEnhancer
    )
  );
  store.runSaga = saga.run;
  store.close = () => store.dispatch(END);
  return store;
};

export default configureStore;
