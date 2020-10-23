import { call, put, select } from "redux-saga/effects";
import axios from "utils/axiosUtil";
import * as methods from "constant/HTTPMethods";
import { authProvider } from "utils/AuthProvider";

export default function* AuthSaga(): Generator<any, void, ObjectType> {
  try {
    const tokenResponse = yield authProvider.getAccessToken();
    if (tokenResponse && tokenResponse.accessToken)
      localStorage.setItem("token", tokenResponse.accessToken);
  } catch (error) {
    yield console.log(error);
  }
}
