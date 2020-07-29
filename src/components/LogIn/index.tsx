import React, { useEffect, useRef } from "react";

import useAccessToken from "../../hook/useAccessToken";

export default function Login(): JSX.Element {
  const { requestAccessToken, url } = useAccessToken();

  useEffect(() => {
    requestAccessToken();
  }, [requestAccessToken]);

  return (
    <div>
      <iframe
        style={{ width: "100vw", height: "100vh" }}
        title="This is a unique title"
        src={url}
        onLoad={(e) => {
          console.log("iframeE", e);
        }}
      />
    </div>
  );
}
