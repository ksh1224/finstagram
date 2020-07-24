import { call, put } from "redux-saga/effects";

import * as methods from "../../constant/HTTPMethods";
import { actions } from "../actions";
import axios from "../../utils/axiosUtil";

export default function* userSaga(isLogIn: boolean): Generator {
  try {
    if (isLogIn) {
      const token = localStorage.getItem("AUTHTOKEN");
      if (token === null) {
        const data = yield call(axios, "/user/login", methods.POST);
        yield put(actions.logInActionAsync.(data));
      }
    } else {
      const data = yield call(
        axios,
        "/sso/oauth/auth-code?redirectUri=fnfhrapp://logout",
        methods.POST
      );
      yield put(actions.userLogOutSuccess());
    }
  } catch (error) {
    yield put(actions.userFail(error));
  }
}
