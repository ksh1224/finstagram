import { combineReducers } from "redux";

import Auth from "./AuthReducer";
import feedbackMain from "./feedbackMainReducer";

const rootReducer = combineReducers({
  Auth,
  feedbackMain,
});

export default rootReducer;
