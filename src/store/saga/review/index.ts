import { takeEvery } from "redux-saga/effects";
import {
  reviewMainActionTypes,
  reviewOKRListActionTypes,
  reviewPeerEvalListActionTypes,
  reviewPeerListActionTypes,
  reviewTeamListActionTypes,
} from "store/actions";
import reviewMainSaga from "./reviewMainSaga";
import reviewOKRListSaga from "./reviewOKRListSaga";
import reviewPeerEvalListSaga from "./reviewPeerEvalListSaga";
import reviewPeerListSaga from "./reviewPeerListSaga";
import reviewTeamListSaga from "./reviewTeamListSaga";

export default function* watchOKR() {
  yield takeEvery(
    reviewMainActionTypes.REVIEW_MAIN_REQUEST,
    ({ payload }: { type: string; payload?: number }) => reviewMainSaga(payload)
  );
  yield takeEvery(
    reviewTeamListActionTypes.REVIEW_TEAM_LIST_REQUEST,
    ({ payload }: { type: string; payload?: number }) =>
      reviewTeamListSaga(payload)
  );
  yield takeEvery(
    reviewPeerListActionTypes.REVIEW_PEER_LIST_REQUEST,
    ({ payload }: { type: string; payload?: number }) =>
      reviewPeerListSaga(payload)
  );
  yield takeEvery(
    reviewPeerEvalListActionTypes.REVIEW_PEER_EVAL_LIST_REQUEST,
    ({ payload }: { type: string; payload?: number }) =>
      reviewPeerEvalListSaga(payload)
  );
  yield takeEvery(
    reviewOKRListActionTypes.REVIEW_OKR_LIST_REQUEST,
    ({ payload }: { type: string; payload?: number }) =>
      reviewOKRListSaga(payload)
  );
}
