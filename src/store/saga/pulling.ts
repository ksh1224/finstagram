import { delay, fork, select } from "redux-saga/effects";
import notificationSaga from "./notificationSaga";

export default function* pulling() {
  while (true) {
    const { error } = yield select((state: RootState) => state.notification);
    const { user } = yield select((state: RootState) => state.APIAuth);
    if (!error && user) yield fork(notificationSaga);
    yield delay(60000);
  }
}
