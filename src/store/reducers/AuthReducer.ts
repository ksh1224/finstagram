// import { AuthenticationActions } from "react-aad-msal";

// type State = {
//   logInResponse: any;
//   accessTokenResponse: any;
//   initialized: boolean;
//   initializing: boolean;
// };

// const initialState: State = {
//   logInResponse: null,
//   accessTokenResponse: null,
//   initialized: false,
//   initializing: false,
// };
const AuthReducer = (
  state = {},
  action: {
    type: any;
    payload: any;
  }
) => {
  //   switch (action.type) {
  //     case "AAD_INITIALIZING":
  //       return {
  //         ...state,
  //         initialized: false,
  //         initializing: true,
  //         logInResponse: null,
  //         accessTokenResponse: null,
  //       };
  //     case "AAD_LOGIN_SUCCESS":
  //       return {
  //         ...state,
  //         logInResponse: action.payload,
  //       };
  //     case "AAD_ACQUIRED_ACCESS_TOKEN_SUCCESS":
  //       return {
  //         ...state,
  //         accessTokenResponse: action.payload,
  //       };
  //     case "AAD_INITIALIZED":
  //       return {
  //         ...state,
  //         initialized: true,
  //         initializing: false,
  //       };
  //     default:
  //       return state;
  //   }
};

export default AuthReducer;
