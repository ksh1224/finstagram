import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";

import Main from "./components/Main";
import LogIn from "./components/LogIn";

export default function App(): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
      </Switch>
    </Router>
  );
}
