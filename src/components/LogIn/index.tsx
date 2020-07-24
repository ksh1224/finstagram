import React, { useEffect } from "react";

export default function Login(): JSX.Element {
  useEffect(() => {}, []);
  return (
    <div>
      <iframe
        title="This is a unique title"
        src={`${process.env.REACT_APP_HOST}/sso/oauth/auth-code?redirectUri=fnfhrapp://login`}
      />
      <text>{process.env.NODE_ENV}</text>
    </div>
  );
}
