/* eslint-disable import/prefer-default-export */
/* eslint-disable default-case */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "pages";
import * as serviceWorker from "serviceWorker";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import configureStore from "store";
import rootSaga from "store/saga";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "utils/msalConfig";
import { MsalProvider } from "@azure/msal-react";

Sentry.init({
  dsn:
    "https://19a6418d07fb4a3997fa793500e5c1ab@o252899.ingest.sentry.io/5614107",
  integrations: [new Integrations.BrowserTracing()],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 0.5,
  debug: process.env.REACT_APP_DEV === "true",
  release: process.env.REACT_APP_VERSION
    ? `Finstagram@${process.env.REACT_APP_VERSION}`
    : "Develop Mode",
});

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
