import { call, put } from "redux-saga/effects";
import axios from "utils/axiosUtil";
import CustomError from "utils/errorUtil";
import {
  APILogInActionAsync,
  badgeListActionAsync,
  searchUserActionAsync,
} from "store/actions";

export default function* APIAuthSaga(): Generator<any, void, ObjectType> {
  try {
    const { data: token } = yield call(
      axios,
      "/sso/oauth/access-token",
      "POST"
    );
    if (!!token && typeof token === "string") {
      yield localStorage.setItem("accessToken", token);
      const { data: user } = yield call(axios, "/user/login", "POST");
      yield put(APILogInActionAsync.success(user));
      yield put(searchUserActionAsync.request());
      yield put(badgeListActionAsync.request());
    } else {
      if (token) CustomError(token);
      throw new Error("유저 토큰이 없습니다");
    }
  } catch (error) {
    yield put(APILogInActionAsync.failure(error));
  }
}
