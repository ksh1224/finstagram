/* eslint-disable import/prefer-default-export */
import { Configuration } from "msal";
import { MsalAuthProvider, LoginType } from "react-aad-msal";

// Msal Configurations
const config: Configuration = {
  auth: {
    authority: process.env.REACT_APP_AUTHORITY,
    clientId: process.env.REACT_APP_CLIENT_ID || "",
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

// Authentication Parameters
const authenticationParameters = {
  scopes: ["openid", "profile", "User.Read"],
};

// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: `${window.location.origin}`,
};

export const authProvider = new MsalAuthProvider(
  config,
  authenticationParameters,
  options
);
