import { call, put } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { searchUserActionAsync } from "store/actions";

export default function* searchUserSaga(): Generator<any, void, ObjectType> {
  try {
    const { data } = yield call(axios, "/user/searchData/", "GET");
    yield put(searchUserActionAsync.success(data));
  } catch (error) {
    yield put(searchUserActionAsync.failure(error));
  }
}
