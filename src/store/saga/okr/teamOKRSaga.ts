import { call, put, select } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { teamOKRActionAsync } from "store/actions";

export default function* teamOKRSaga(
  year?: number,
  quarter?: number,
  organizationId?: number
): Generator<any, void, ObjectType> {
  try {
    const { user } = yield select((state: RootState) => state.APIAuth);
    const data = yield call(
      axios,
      `/okr/main/teamOkr?user_id=${user.id}${
        year && quarter ? `&year=${year}&quarter=${quarter}` : ""
      }${organizationId ? `&organization_id=${organizationId}` : ""}`,
      "GET"
    );
    yield put(teamOKRActionAsync.success(data));
  } catch (error) {
    yield put(teamOKRActionAsync.failure(error));
  }
}
