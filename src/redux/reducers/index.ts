import { combineReducers } from "redux";

import user from "./user";
import accessToken from "./accessToken";

const rootReducer = combineReducers({
  user,
  accessToken,
});

export default rootReducer;
