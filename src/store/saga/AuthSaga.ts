import { put } from "redux-saga/effects";
import { authProvider } from "utils/AuthProvider";
import { APILogInActionAsync } from "store/actions";

export default function* AuthSaga(): Generator<any, void, ObjectType> {
  try {
    const tokenResponse = yield authProvider.getAccessToken();
    if (!!tokenResponse && !!tokenResponse.accessToken) {
      yield localStorage.setItem("token", tokenResponse.accessToken);
      yield localStorage.setItem("accessToken", "");
      yield put(APILogInActionAsync.request());
    } else throw new Error("엑세스 토큰이 없습니다");
  } catch (error) {
    yield console.log(error);
  }
}
