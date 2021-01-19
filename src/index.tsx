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
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "utils/msalConfig";
import { MsalProvider } from "@azure/msal-react";

const store = configureStore();
store.runSaga(rootSaga);
const msalInstance = new PublicClientApplication(msalConfig.msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
