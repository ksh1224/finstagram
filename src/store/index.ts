import { createStore, applyMiddleware, compose, Store } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware, { END } from "redux-saga";
import rootReducer from "./reducers";

const saga = createSagaMiddleware();

const configureStore = (preloadedState?: any) => {
  const store: Store & ObjectType = createStore(
    rootReducer,
    preloadedState,
    compose<any>(applyMiddleware(saga, createLogger()))
  );
  store.runSaga = saga.run;
  store.close = () => store.dispatch(END);
  return store;
};

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore;
