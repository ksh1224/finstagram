import { combineReducers } from "redux";

import user from "./userReducer";
import accessToken from "./accessTokenReducer";

const rootReducer = combineReducers({
  user,
  accessToken,
});

export default rootReducer;
