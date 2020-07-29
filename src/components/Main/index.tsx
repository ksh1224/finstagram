import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import useUser from "../../hook/useUser";
import useAccessToken from "../../hook/useAccessToken";

export default function Main(): JSX.Element {
  const { isFetching, requestLogIn, userInfo } = useUser();
  const { url } = useAccessToken();

  useEffect(() => {
    requestLogIn();
  }, [requestLogIn]);
  if (userInfo)
    return (
      <div className="App">
        <header className="App-header">
          <p>first Page</p>
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
    );
  return (
    <Redirect
      to={{
        pathname: "/login",
        // , state: { from: location }
      }}
    />
  );
}
