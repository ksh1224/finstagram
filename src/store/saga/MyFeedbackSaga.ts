import { call, put, select } from "redux-saga/effects";
import axios from "utils/axiosUtil";

export default function* MyFeedbackSaga() {
  try {
    const { user } = yield select((state) => state.APIauth);
    const { data } = yield call(
      axios,
      `/feedbacks/statistics/praise/${user.id}`,
      "GET"
    );

    yield put();
  } catch (error) {
    console.log(error);
  }
}
