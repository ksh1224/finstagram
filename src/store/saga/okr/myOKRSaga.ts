import { call, put, select } from "redux-saga/effects";

import axios from "utils/axiosUtil";
import { myOKRActionAsync } from "store/actions";

export default function* myOKRSaga(
  year?: number,
  quarter?: number
): Generator<any, void, ObjectType> {
  try {
    const data = yield call(
      axios,
      `/okr/main/myOkr${
        year && quarter ? `?year=${year}&quarter=${quarter}` : ""
      }`,
      "GET"
    );
    let isWrite = false;
    let isModifiable = false;
    const { extraData } = data;
    if (!extraData)
      alert(
        "해당 분기 생성일 및 수정일이 입력되지 않았습니다. 관리자에게 문의해주세요"
      );
    const {
      writeStartAt,
      writeEndAt,
      modifiableStartAt,
      modifiableEndAt,
    } = extraData;
    if (!(writeStartAt && writeEndAt && modifiableStartAt && modifiableEndAt))
      return alert(
        "해당 분기 생성일 및 수정일이 입력되지 않았습니다. 관리자에게 문의해주세요"
      );
    const now = new Date();
    const [writeStart, writeEnd, modifiableStart, modifiableEnd] = [
      new Date(writeStartAt),
      new Date(writeEndAt),
      new Date(modifiableStartAt),
      new Date(modifiableEndAt),
    ];
    writeStart.setHours(0, 0, 0, 0);
    writeEnd.setHours(23, 59, 59, 999);
    modifiableStart.setHours(0, 0, 0, 0);
    modifiableEnd.setHours(23, 59, 59, 999);
    isWrite = writeStart <= now && now <= writeEnd;
    isModifiable = modifiableStart <= now && now <= modifiableEnd;
    yield put(myOKRActionAsync.success({ ...data, isWrite, isModifiable }));
  } catch (error) {
    yield put(myOKRActionAsync.failure(error));
  }
}
