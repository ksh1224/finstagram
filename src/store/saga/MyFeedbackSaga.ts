import * as methods from "constant/HTTPMethods";
import { call, put, select } from "redux-saga/effects";
import { myFeedbackActionAsync } from "store/actions";
import axios from "utils/axiosUtil";

export default function* myFeedbackSaga(): Generator<any, void, ObjectType> {
  try {
    const { user } = yield select((state) => state.APIAuth);
    const { data } = yield call(
      axios,
      `/feedbacks/statistics/praise/${user.id}`,
      methods.GET
    );

    yield put(myFeedbackActionAsync.success(data));
  } catch (error) {
    yield put(myFeedbackActionAsync.failure(error));
  }
}
