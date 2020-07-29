import { call, put } from "redux-saga/effects";

import * as methods from "../../constant/HTTPMethods";
import { actions } from "../actions";
import axios from "../../utils/axiosUtil";

export default function* logInSaga(): Generator<any, void, ObjectType> {
  try {
    const data = yield call(axios, "/user/login", methods.POST);
    yield put(actions.logInActionAsync.success(data));
  } catch (error) {
    yield put(actions.logInActionAsync.failure(error));
  }
}
