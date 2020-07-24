import { call, put } from "redux-saga/effects";

import * as methods from "../../constant/HTTPMethods";
import { actions } from "../actions";
import axios from "../../utils/axiosUtil";

export default function* accessTokenSaga(): Generator {
  try {
    if (true) {
      const data = yield call(
        axios,
        "/sso/oauth/auth-code?redirectUri=fnfhrapp://login",
        methods.POST
      );
      yield put(actions.userLogInSuccess(data));
    }
    yield put(actions.userLogOutSuccess());
  } catch (error) {
    yield put(actions.userFail(error));
  }
}
