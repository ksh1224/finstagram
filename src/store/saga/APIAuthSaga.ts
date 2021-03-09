import { call, put } from "redux-saga/effects";
import axios from "utils/axiosUtil";
import CustomError from "utils/errorUtil";
import {
  APILogInActionAsync,
  badgeListActionAsync,
  notificationActionAsync,
  searchUserActionAsync,
  yearQuarterActionAsync,
} from "store/actions";
import * as Sentry from "@sentry/react";

export default function* APIAuthSaga(
  accessToken: string
): Generator<any, void, ObjectType> {
  try {
    yield localStorage.setItem("accessToken", accessToken);
    yield localStorage.setItem("token", "");
    const { data: token } = yield call(
      axios,
      "/sso/oauth/access-token",
      "POST"
    );
    if (!!token && typeof token === "string") {
      yield localStorage.setItem("token", token);
      const { data: user } = yield call(axios, "/user/login", "POST");
      if (!user) {
        CustomError(user);
        throw new Error("유저 정보가 없습니다");
      }
      const {
        name,
        positionName,
        username,
        email,
        employeeNumber,
        organization,
      } = user || {};
      yield Sentry.setUser({
        name,
        positionName,
        username,
        email,
        employeeNumber,
        organization,
      });
      yield put(APILogInActionAsync.success(user));
      yield put(searchUserActionAsync.request());
      yield put(yearQuarterActionAsync.request());
      yield put(notificationActionAsync.request(null));
      yield put(badgeListActionAsync.request());
    } else {
      if (token) CustomError(token);
      throw new Error("유저 토큰이 없습니다");
    }
  } catch (error) {
    console.log("error", error);
    yield put(APILogInActionAsync.failure(error));
  }
}
