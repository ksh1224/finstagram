import {
  myOKRActionTypes,
  teamOKRActionTypes,
  userOKRActionTypes,
} from "store/actions";
import { takeEvery } from "redux-saga/effects";
import teamOKRSaga from "./teamOKRSaga";
import myOKRSaga from "./myOKRSaga";
import userOKRSaga from "./userOKRSaga";

export default function* watchOKR() {
  yield takeEvery(
    myOKRActionTypes.MY_OKR_REQUEST,
    ({ payload }: { type: string; payload?: ObjectType }) =>
      myOKRSaga(payload?.year, payload?.quarter)
  );
  yield takeEvery(
    userOKRActionTypes.USER_OKR_REQUEST,
    ({ payload }: { type: string; payload?: ObjectType }) =>
      userOKRSaga(payload?.year, payload?.quarter, payload?.userId)
  );
  yield takeEvery(
    teamOKRActionTypes.TEAM_OKR_REQUEST,
    ({ payload }: { type: string; payload?: ObjectType }) =>
      teamOKRSaga(payload?.year, payload?.quarter, payload?.organizationId)
  );
}
