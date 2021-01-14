/* eslint-disable import/prefer-default-export */
/* eslint-disable default-case */
import React, { createContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "pages";
import * as serviceWorker from "serviceWorker";

import configureStore from "store";
import rootSaga from "store/saga";
import AzureAD, { AuthenticationState } from "react-aad-msal";
import { authProvider } from "utils/AuthProvider";

export const AuthContext = createContext<{ logout: any; login: any }>({
  logout: null,
  login: null,
});

const store = configureStore();
store.runSaga(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <AzureAD provider={authProvider} forceLogin reduxStore={store}>
      {({ login, authenticationState, error, logout }: any) => {
        switch (authenticationState) {
          case AuthenticationState.Authenticated:
            return (
              <AuthContext.Provider value={{ logout, login }}>
                <Provider store={store}>
                  <Router>
                    <App />
                  </Router>
                </Provider>
              </AuthContext.Provider>
            );
          case AuthenticationState.Unauthenticated:
            return (
              <div className="d-flex flex-row flex-column-fluid page">
                <div
                  className="d-flex w-100 align-items-center justify-content-center"
                  style={{ flexDirection: "column" }}
                >
                  {error && (
                    <div className="font-size-h4 text-dark-75 font-weight-bolder mb-5">
                      sso 에러가 발생했습니다. 다시 로그인 해주세요.
                    </div>
                  )}
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn w-30 btn-primary"
                      onClick={() => login && login()}
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            );
          case AuthenticationState.InProgress:
            return (
              <div className="d-flex flex-row flex-column-fluid page">
                <div className="d-flex w-100 align-items-center justify-content-center">
                  <div className="spinner spinner-primary spinner-lg spinner-center w-100 h-50px" />
                </div>
              </div>
            );
        }
      }}
    </AzureAD>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
