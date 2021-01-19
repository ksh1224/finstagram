import * as msal from "@azure/msal-browser";

export type MsalMinimalSilentRequestConfig = {
  scopes: Array<string>;
  claims?: string;
  autority?: string;
  forceRquest?: boolean;
  redirectUri?: string;
};

export type MsalProviderRedirectConfig = {
  type: "redirect";
  msalConfig: msal.Configuration;
  silentRequestConfig: MsalMinimalSilentRequestConfig;
  endSessionRequestConfig?: msal.EndSessionRequest;
  redirectRequestConfig?: msal.RedirectRequest;
};

const scopes = ["openid", "profile", "User.Read"];

const redirectUri = process.env.REACT_APP_REDIRECT_URI || "";

export const msalConfig: MsalProviderRedirectConfig = {
  type: "redirect",
  msalConfig: {
    auth: {
      clientId: process.env.REACT_APP_CLIENT_ID || "",
      authority: process.env.REACT_APP_AUTHORITY || "",
      redirectUri,
    },
    cache: {
      cacheLocation: "localStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
      loggerOptions: {
        loggerCallback: process.env.REACT_APP_DEV
          ? (level, message, containsPii): void => {
              if (containsPii) {
                return;
              }
              // eslint-disable-next-line default-case
              switch (level) {
                case msal.LogLevel.Error:
                  console.error(message);
                  return;
                case msal.LogLevel.Info:
                  console.info("info", message);
                  return;
                case msal.LogLevel.Verbose:
                  console.debug("Verbose", message);
                  return;
                case msal.LogLevel.Warning:
                  console.warn("Warning", message);
              }
            }
          : undefined,
        piiLoggingEnabled: false,
      },
    },
  },
  silentRequestConfig: {
    scopes,
    redirectUri,
  },
  endSessionRequestConfig: {
    postLogoutRedirectUri: redirectUri,
  },
  redirectRequestConfig: {
    scopes,
  },
};
