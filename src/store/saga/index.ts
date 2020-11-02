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

import {
  feedbackMainActionTypes,
  APILogInActionTypes,
  searchUserActionTypes,
  feedRecentActionTypes,
} from "store/actions";
import APIAuthSaga from "./APIAuthSaga";
import AuthSaga from "./AuthSaga";
import feedbackMainSaga from "./feedbackMainSaga";
import feedRecentSaga from "./feedRecentSaga";
// import feedRecentSaga from "./feedRecentSaga";
import searchUserSaga from "./searchUserSaga";
// import accessTokenSaga from "./accessTokenSaga";

function* watchClasses() {
  // type의 action이 실행되면 fetchBoardsSaga도 항상(Every) 실행한다
  yield takeEvery(AuthenticationActions.LoginSuccess, AuthSaga);
  yield takeEvery(APILogInActionTypes.API_LOGIN_REQUEST, APIAuthSaga);
  yield takeEvery(
    feedbackMainActionTypes.FEEDBACK_MAIN_REQUEST,
    feedbackMainSaga
  );
  yield takeEvery(searchUserActionTypes.SEARCH_USER_REQUEST, searchUserSaga);
  yield takeEvery(
    feedRecentActionTypes.FEED_RECENT_REQUEST,
    ({ payload }: { type: typeof feedRecentActionTypes; payload: number }) =>
      feedRecentSaga(payload)
  );
}

export default function* root(): Generator {
  yield spawn(watchClasses);
}
