import { call, put } from "redux-saga/effects";

import * as methods from "../../constant/HTTPMethods";
import { actions } from "../actions";
import axios from "../../utils/axiosUtil";

export default function* logOutSaga(): Generator<any, void, ObjectType> {
  try {
    yield call(axios, "/user/logout", methods.POST);
    yield put(actions.logOutActionAsync.success());
  } catch (error) {
    yield put(actions.logOutActionAsync.failure(error));
  }
}
