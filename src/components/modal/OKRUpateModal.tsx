import { Modal } from "react-bootstrap";
import { useModal } from "hooks/useRedux";
import React, { useEffect, useState, createRef } from "react";
import SVG from "utils/SVG";
import { useMyOKR, useRefreshOKRData } from "hooks/useOKRRedux";
import { statusToKo } from "constant/progress";
import axios from "utils/axiosUtil";

export default function OKRUpateModal() {
  const { data: myOKRData = {} } = useMyOKR();
  const { refreshOKRData } = useRefreshOKRData();
  const { modals, closeModal } = useModal();
  const [upDateObjectives, setUpDateObjectives] = useState<ObjectiveType[]>([]);
  const [upDateKeyResults, setUpDateKeyResults] = useState<KeyResultType[]>([]);
  const [isClick, setIsClick] = useState(false);

  const { year, quarter } = myOKRData;

  const [historyOKR, setHistoryOKR] = useState<
    {
      prev: ObjectiveType & KeyResultType;
      current: ObjectiveType & KeyResultType;
      isObj?: boolean;
    }[]
  >([]);

  const okrUpdateModal = modals.find(
    (modal: any) => modal.name === "okrUpdate"
  );

  const { objectives, keyResults, prevOKR, close: writeClose } =
    okrUpdateModal?.param || {};

  function close() {
    closeModal("okrUpdate");
  }

  useEffect(() => {
    if (objectives && keyResults && prevOKR) {
      setUpDateObjectives(objectives);
      setUpDateKeyResults(keyResults);
      const array = [];
      if (
        prevOKR?.updateValues?.status !== objectives[0]?.updateValues?.status ||
        prevOKR?.description !== objectives[0]?.description
      )
        array.push({ prev: prevOKR, current: objectives[0], isObj: true });
      prevOKR?.keyResult.forEach((kr: any, i: number) => {
        if (
          kr?.updateValues?.status !== keyResults[i].updateValues?.status ||
          kr?.updateValues?.progress !== keyResults[i].updateValues?.progress ||
          kr?.description !== keyResults[i].description
        )
          array.push({ prev: kr, current: keyResults[i] });
      });
      setHistoryOKR(array);
    } else {
      setUpDateObjectives([]);
      setUpDateKeyResults([]);
    }
  }, [objectives, keyResults]);

  useEffect(() => {
    if (upDateObjectives && upDateKeyResults && historyOKR) {
      let boolean = true;
      historyOKR.forEach(({ current, isObj }) => {
        if (isObj) {
          const objectiveHistoryDescription =
            upDateObjectives[0]?.updateValues?.historyDescription;
          if (
            !objectiveHistoryDescription ||
            objectiveHistoryDescription.trim() === ""
          )
            boolean = false;
        } else {
          const keyResultHistoryDescription = upDateKeyResults.find(
            ({ index }) => index === current.index
          )?.updateValues?.historyDescription;
          if (
            !keyResultHistoryDescription ||
            keyResultHistoryDescription.trim() === ""
          )
            boolean = false;
        }
      });

      setIsClick(boolean);
    }
  }, [upDateObjectives, upDateKeyResults]);

  // OKR 데이터 삽입
  const objectiveChangeHandler = (
    index: number,
    historyDescription: string
  ) => {
    setUpDateObjectives([
      ...upDateObjectives.map((obj: any) =>
        obj.index === index
          ? {
              ...obj,
              updateValues: {
                ...obj.updateValues,
                ...(historyDescription !== undefined && { historyDescription }),
              },
            }
          : obj
      ),
    ]);
  };
  const keyResultChangeHandler = (
    index: number,
    historyDescription: string
  ) => {
    setUpDateKeyResults([
      ...upDateKeyResults.map((kr: any) =>
        index === kr.index
          ? {
              ...kr,
              updateValues: {
                ...kr.updateValues,
                ...(historyDescription !== undefined && { historyDescription }),
              },
            }
          : kr
      ),
    ]);
  };

  // 데이터 패치
  const onUpdate = async () => {
    try {
      const data = upDateObjectives.map((objective) => ({
        ...objective,
        keyResult: upDateKeyResults,
      }));
      const res = await axios(
        `/okr/update?year=${year}&quarter=${quarter}`,
        "PUT",
        JSON.stringify(data)
      );
      if (res.responseCode === "SUCCESS") {
        refreshOKRData();
        writeClose();
        close();
      }
    } catch (error) {
      // const aaa = await error.toJSON();
      // console.log("error", aaa);
      alert("실패!");
    }
  };

  return (
    <Modal
      show={!!okrUpdateModal}
      size="lg"
      animation
      centered
      onHide={() => close()}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            수정 사유를 조직장과 논의 후, 작성해주세요.
          </h5>
        </div>
        <div
          className="overflow-hidden overflow-y-auto"
          style={{ maxHeight: "600px" }}
        >
          {historyOKR.map(({ prev, current, isObj }, i) => (
            <div className="modal-body">
              <h5 className="font-size-h6 mb-5">
                {isObj
                  ? `Objective ${
                      myOKRData?.data?.objective?.findIndex(
                        ({ id: objectiveId }: { id: any }) =>
                          objectiveId === prev?.id
                      ) + 1 || 1
                    }`
                  : `Key-Result ${
                      upDateKeyResults.findIndex(
                        ({ index }) => index === prev.index
                      ) + 1
                    }`}
              </h5>
              <div className="d-flex align-items-center">
                <div className="w-100px flex-grow-1">
                  <div>수정 전</div>
                  <div className="d-flex flex-wrap mx-n2 mt-2">
                    <span className="label label-xl label-rounded label-inline w-100px flex-grow-1 mx-2">
                      {prev?.updateValues?.status
                        ? statusToKo[prev?.updateValues?.status]
                        : ""}
                    </span>
                    <span className="label label-xl label-rounded label-inline w-100px flex-grow-1 mx-2">
                      {prev?.updateValues?.progress
                        ? prev.updateValues.progress
                        : current?.updateValues?.progress}
                    </span>
                  </div>
                  <div className="border mt-3 p-3 h-100px overflow-y-auto rounded">
                    {prev?.description}
                  </div>
                </div>

                <span className="svg-icon svg-icon-primary svg-icon-2x mx-5">
                  <SVG name="dubleArrow" />
                </span>
                <div className="w-100px flex-grow-1">
                  <div>수정 후</div>
                  <div className="d-flex flex-wrap mx-n2 mt-2">
                    <span className="label label-xl label-rounded label-inline w-100px flex-grow-1 mx-2 font-weight-bolder">
                      {current?.updateValues?.status
                        ? statusToKo[current?.updateValues?.status]
                        : ""}
                    </span>
                    <span className="label label-xl label-rounded label-inline w-100px flex-grow-1 mx-2 font-weight-bolder">
                      {isObj
                        ? (
                            keyResults?.reduce((acc: any, value: any) => {
                              return acc + (value?.updateValues?.progress || 0);
                            }, 0) / keyResults?.length
                          ).toFixed(1)
                        : current?.updateValues?.progress}
                    </span>
                  </div>
                  <div className="border mt-3 p-3 h-100px overflow-y-auto rounded font-weight-bolder">
                    {current?.description}
                  </div>
                </div>
              </div>
              <textarea
                className="form-control resize-none mt-3"
                placeholder="수정 사유를 작성해주세요."
                value={
                  isObj
                    ? upDateObjectives.find(
                        ({ index }) => index === current.index
                      )?.updateValues?.historyDescription
                    : upDateKeyResults.find(
                        ({ index }) => index === current.index
                      )?.updateValues?.historyDescription
                }
                onChange={({ target }) => {
                  if (isObj && current?.index && objectiveChangeHandler)
                    objectiveChangeHandler(current.index, target.value);
                  else if (current?.index && keyResultChangeHandler)
                    keyResultChangeHandler(current.index, target.value);
                }}
              />

              {historyOKR.length - 1 !== i && (
                <div className="separator separator-solid my-6" />
              )}
            </div>
          ))}
        </div>
        <div className="modal-footer border-0 p-0">
          <button
            type="button"
            className={`btn btn-lg w-50 m-0 rounded-0 ${
              isClick ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => isClick && onUpdate()}
          >
            확인
          </button>
          <button
            type="button"
            className="btn btn-lg btn-secondary w-50 m-0 rounded-0"
            onClick={() => close()}
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}
