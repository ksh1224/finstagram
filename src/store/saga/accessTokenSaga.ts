import { call, put } from "redux-saga/effects";

import * as methods from "../../constant/HTTPMethods";
import { actions } from "../actions";
import axios from "../../utils/axiosUtil";

export default function* accessTokenSaga(): Generator<any, void, any> {
  try {
    const data: string = yield call(
      axios,
      "/sso/oauth/auth-code?redirectUri=fnfhrapp://login",
      methods.GET
    );
    if (data.match("https://sso.fnf.co.kr/oauth/Authorization.do")) {
      const token = yield call(
        axios,
        `sso/oauth/access-token`,
        methods.POST,
        null,
        data
      );
      if (token.responseCode === "401")
        yield call(
          axios,
          "/sso/oauth/access-token?code=" +
            "https://sso.fnf.co.kr/exsignon/sso/logout.jsp?RelayState=fnfhrapp://login",
          methods.GET,
          null,
          "https://sso.fnf.co.kr/exsignon/sso/logout.jsp?RelayState=fnfhrapp://login"
        );
      // yield put(actions.logOutActionAsync.request());
    } else yield put(actions.accessTokenActionAsync.success(data));
  } catch (error) {
    yield put(actions.accessTokenActionAsync.failure(error));
  }
}
