import { call, put, select } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { userOKRActionAsync } from "store/actions";

export default function* userOKRSaga(
  year?: number,
  quarter?: number,
  userId?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/okr/chart/${userId}${
        year && quarter ? `?year=${year}&quarter=${quarter}` : ""
      }`,
      "GET"
    );
    const { data: searchUser } = yield select(
      (state: RootState) => state.searchUser
    );
    const user = searchUser?.user?.find(
      (findUser: any) => findUser.id === userId
    );

    yield put(userOKRActionAsync.success({ ...data, user }));
  } catch (error) {
    yield put(userOKRActionAsync.failure(error));
  }
}
