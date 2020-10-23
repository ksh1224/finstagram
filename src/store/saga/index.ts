import { AuthenticationActions } from "react-aad-msal";
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

import { feedbackMainActionTypes } from "store/actions";
import AuthSaga from "./AuthSaga";
// import accessTokenSaga from "./accessTokenSaga";

function* watchClasses() {
  // type의 action이 실행되면 fetchBoardsSaga도 항상(Every) 실행한다
  yield takeEvery(AuthenticationActions.LoginSuccess, AuthSaga);
}

export default function* root(): Generator {
  yield spawn(watchClasses);
}
