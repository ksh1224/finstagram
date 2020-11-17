const IN_PROGRESS = "IN_PROGRESS";
const CANCEL = "CANCEL";
const COMPLETE = "COMPLETE";

export const statusType = { IN_PROGRESS, CANCEL, COMPLETE };
export const statusToKo: ObjectType = {
  IN_PROGRESS: "진행중",
  CANCEL: "추진취소",
  COMPLETE: "추진완료",
};
