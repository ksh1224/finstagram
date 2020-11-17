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

import { APILogInActionTypes, searchUserActionTypes } from "store/actions";
import APIAuthSaga from "./APIAuthSaga";
import AuthSaga from "./AuthSaga";
import watchFeedback from "./feedback";
import watchOKR from "./okr";
import searchUserSaga from "./searchUserSaga";

function* watchCommon() {
  // type의 action이 실행되면 fetchBoardsSaga도 항상(Every) 실행한다
  yield takeEvery(AuthenticationActions.LoginSuccess, AuthSaga);
  yield takeEvery(APILogInActionTypes.API_LOGIN_REQUEST, APIAuthSaga);
  yield takeEvery(searchUserActionTypes.SEARCH_USER_REQUEST, searchUserSaga);
}

export default function* root(): Generator {
  yield spawn(watchCommon);
  yield spawn(watchFeedback);
  yield spawn(watchOKR);
}
