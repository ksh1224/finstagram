export const getDeadline = (dateStr: string) => {
  const today = new Date();
  const date = new Date(dateStr || "");
  date.setHours(23, 59, 59);
  date.setDate(date.getDate() - 1);
  const isWrite = date >= today;
  const dateStrArr = dateStr ? dateStr.split("-") : [];
  const deadline = `${
    Number(dateStrArr[1]) < 10 ? `0${dateStrArr[1]}` : dateStrArr[1]
  }월 ${Number(dateStrArr[2]) < 10 ? `0${dateStrArr[2]}` : dateStrArr[2]}까지`;
  return dateStr ? { deadline, isWrite } : {};
};

export const getWriteDate = (startDateStr: string, endDateStr: string) => {
  const today = new Date();
  const startDate = new Date(startDateStr || "");
  const endDate = new Date(endDateStr || "");
  startDate.setHours(0, 0, 0);
  endDate.setHours(23, 59, 59);
  let period: "BEFORE" | "Write" | "END" = "Write";
  if (endDate < today) period = "END";
  else if (today < startDate) period = "BEFORE";
  const endDateStrArr = endDateStr ? endDateStr.split("-") : [];
  const startDateStrArr = startDateStr ? startDateStr.split("-") : [];
  const periodText =
    period !== "BEFORE"
      ? `${endDateStrArr[1]}월 ${endDateStrArr[2]}일까지`
      : `${startDateStrArr[1]}월 ${startDateStrArr[2]}일 시작`;
  return startDateStr && endDateStr ? { period, periodText } : {};
};

export const setDateData = () => {};
