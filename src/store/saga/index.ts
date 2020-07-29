import { Action } from "redux";
import {
  call,
  spawn,
  put,
  takeEvery,
  take,
  select,
  all,
  cancel,
  takeLatest,
} from "redux-saga/effects";

import { actionTypes, actions } from "../actions";
import logInSaga from "./logInSaga";
import logOutSaga from "./logOutSaga";
import accessTokenSaga from "./accessTokenSaga";

function* watchClasses() {
  // type의 action이 실행되면 fetchBoardsSaga도 항상(Every) 실행한다
  yield takeEvery(actionTypes.ACCESS_TOKEN_REQUEST, accessTokenSaga);
  yield takeEvery(actionTypes.USER_LOGIN_REQUEST, logInSaga);
  yield takeEvery(actionTypes.USER_LOGOUT_REQUEST, logOutSaga);
}

export default function* root(): Generator {
  yield spawn(watchClasses);
}
