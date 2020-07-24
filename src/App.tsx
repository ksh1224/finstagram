import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useParams,
  useHistory,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { actions } from "./redux/actions";
import { RootState } from "./redux";

import LogIn from "./components/LogIn";

export default function App(): JSX.Element {
  const history = useHistory();

  useEffect(() => {
    const authToken = localStorage.getItem("AUTHTOKEN");
    if (!authToken) history.replace("LogIn");
  }, [history]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div />
        </Route>
        <Route path="/LogIn">
          <LogIn />
        </Route>
        <Route path="/Test">
          <div className="App">
            <header className="App-header">
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}
