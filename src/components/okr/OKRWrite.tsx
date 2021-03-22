/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from "react";
import { statusType } from "constant/progress";
import axios from "utils/axiosUtil";
import { useMyOKR, useRefreshOKRData } from "hooks/useOKRRedux";
import { useModal } from "hooks/useRedux";
import KeyResultWriteItem from "./KeyResultWriteItem";
import ObjectiveWriteItem from "./ObjectiveWriteItem";

const { IN_PROGRESS } = statusType;

type OKRWriteType = {
  type?: "write" | "add" | "update";
  show?: boolean;
  close: () => void;
  year?: number;
  quarter?: number;
  updateOKRId?: number;
};

export default function OKRWrite({
  type = "write",
  show = false,
  close = () => {},
  year,
  quarter,
  updateOKRId,
}: OKRWriteType) {
  const { showModal } = useModal();
  const { refreshOKRData } = useRefreshOKRData();
  const { data: responseData = {} } = useMyOKR();
  const [objectives, setObjectives] = useState<ObjectiveType[]>([]);
  const [keyResults, setKeyResults] = useState<KeyResultType[]>([]);
  const [multiMetaUpdatable, setMultiMetaUpdatable] = useState(false);
  const [prevOKR, setPrevOKR] = useState<ObjectiveType>();
  const [isClick, setIsClick] = useState(false);

  const { isWrite } = responseData;

  // index 부여
  const indexNumber: number[] = [];
  const createIndex = () => {
    while (true) {
      const random = Math.floor(Math.random() * 10000);
      if (!indexNumber.includes(random)) {
        indexNumber.push(random);
        return random;
      }
    }
  };

  // 작성 타입 별 텍스트
  const typeSwitch = (typeName?: typeof type) => {
    switch (typeName) {
      case "add":
        return {
          title: "OKR 추가하기",
          button: "추가하기",
          url: `/okr/update?year=${year}&quarter=${quarter}`,
        };
      case "update":
        return {
          title: "OKR Update",
          button: "수정하기",
          url: `/okr/update?year=${year}&quarter=${quarter}`,
        };
      default:
        return {
          title: "OKR 작성하기",
          button: "작성하기",
          url: `/okr/new?year=${year}&quarter=${quarter}`,
        };
    }
  };

  // 초기 렌더링
  useEffect(() => {
    if (show) {
      if (type !== "update") {
        const objectiveIndex = createIndex();
        setObjectives([
          {
            description: "",
            progress: 0,
            updateValues: {
              historyDescription: "",
              status: IN_PROGRESS,
            },
            index: objectiveIndex,
            multiMeta: false,
            multiMetaDuration: 0,
          },
        ]);
        setKeyResults([
          ...[1, 2, 3].map(() => ({
            description: "",
            updateValues: {
              historyDescription: "",
              progress: 0,
              status: IN_PROGRESS,
            },
            objectiveIndex,
            index: createIndex(),
          })),
        ]);
      } else {
        (async () => {
          try {
            const res = await axios(
              `/okr/updateData/${updateOKRId}?year=${year}&quarter=${quarter}`,
              "GET"
            );
            if (res.responseCode === "SUCCESS") {
              const objectiveIndex = createIndex();
              const objective = {
                ...res.data,
                keyResult: [],
                updateValues: {
                  historyDescription: "",
                  status: res.data.status,
                },
                index: objectiveIndex,
              };
              setMultiMetaUpdatable(res.data.multiMetaUpdatable);
              const kesultArray = res.data.keyResult.map((kr: any) => ({
                ...kr,
                updateValues: {
                  historyDescription: "",
                  progress: kr.progress,
                  status: kr.status,
                },
                objectiveIndex,
                index: createIndex(),
              }));

              setPrevOKR({
                ...objective,
                keyResult: kesultArray,
              });
              setObjectives([objective]);
              setKeyResults(kesultArray);
            }
          } catch (error) {
            console.log("error", error);
          }
        })();
      }
    } else {
      setObjectives([]);
      setKeyResults([]);
    }
  }, [show]);

  // 버튼 활성화
  useEffect(() => {
    setIsClick(false);
    let boolean = true;
    for (const { description } of objectives) {
      if (!description || description.trim() === "") {
        boolean = false;
        break;
      }
    }
    for (const { description } of keyResults) {
      if (!description || description.trim() === "") {
        boolean = false;
        break;
      }
    }
    if (type !== "update") setIsClick(boolean);
    else {
      if (prevOKR && objectives[0]) {
        const objective = { ...objectives[0], keyResult: keyResults };
        if (JSON.stringify(objective) === JSON.stringify(prevOKR))
          boolean = false;
      } else boolean = false;

      setIsClick(boolean);
    }
  }, [objectives, keyResults]);

  // OKR 추가/제거
  const addObjective = () => {
    const objectiveIndex = createIndex();
    setObjectives([
      ...objectives,
      {
        description: "",
        progress: 0,
        keyResult: [],
        updateValues: {
          historyDescription: "",
          status: IN_PROGRESS,
        },
        index: objectiveIndex,
        multiMeta: false,
        multiMetaDuration: 0,
      },
    ]);
    setKeyResults([
      ...keyResults,
      ...[1, 2, 3].map(() => ({
        description: "",
        updateValues: {
          historyDescription: "",
          progress: 0,
          status: IN_PROGRESS,
        },
        objectiveIndex,
        index: createIndex(),
      })),
    ]);
  };
  const addKeyResult = (objectiveIndex: number) => {
    let findIndex = keyResults.length;
    keyResults.forEach(({ objectiveIndex: index }, i) => {
      if (index === objectiveIndex) findIndex = i;
    });
    setKeyResults([
      ...keyResults.slice(0, findIndex + 1),
      {
        description: "",
        updateValues: {
          historyDescription: "",
          progress: 0,
          status: IN_PROGRESS,
        },
        objectiveIndex,
        index: createIndex(),
      },
      ...keyResults.slice(findIndex + 1),
    ]);
  };
  const deleteKeyResult = (selectIndex: number) => {
    setKeyResults([...keyResults.filter(({ index }) => index !== selectIndex)]);
  };

  const deleteObjective = (selectIndex: number) => {
    setObjectives([...objectives.filter(({ index }) => index !== selectIndex)]);
    setKeyResults([
      ...keyResults.filter(
        ({ objectiveIndex }) => objectiveIndex !== selectIndex
      ),
    ]);
  };

  // OKR 데이터 삽입
  const objectiveChangeHandler: OKRChangeHandler = (index, value) => {
    const {
      description,
      progress,
      status,
      historyDescription,
      multiMetaDuration,
    } = value;
    setObjectives([
      ...objectives.map((obj) =>
        obj.index === index
          ? {
              ...obj,
              ...(description !== undefined && { description }),
              updateValues: {
                ...obj.updateValues,
                ...(typeof progress === "number" && { progress }),
                ...(typeof status === "string" && { status }),
                ...(typeof historyDescription === "string" && {
                  historyDescription,
                }),
              },
              ...(typeof multiMetaDuration === "number" && {
                multiMetaDuration,
                multiMeta: multiMetaDuration > 0,
              }),
            }
          : obj
      ),
    ]);
  };
  const keyResultChangeHandler: OKRChangeHandler = (
    index,
    value,
    objectiveIndex
  ) => {
    const { description, progress, status, historyDescription } = value;
    setKeyResults([
      ...keyResults.map((kr) =>
        objectiveIndex === kr.objectiveIndex && index === kr.index
          ? {
              ...kr,
              ...(description !== undefined && { description }),
              updateValues: {
                ...kr.updateValues,
                ...(progress !== undefined && { progress }),
                ...(status !== undefined && { status }),
                ...(historyDescription !== undefined && { historyDescription }),
              },
            }
          : kr
      ),
    ]);
  };

  // OKR 데이터 패치
  const onWrite = async () => {
    try {
      const data = objectives.map((objective) => ({
        ...objective,
        keyResult: keyResults.filter(
          ({ objectiveIndex }) => objectiveIndex === objective.index
        ),
      }));
      const res = await axios(
        typeSwitch(type).url,
        type === "write" ? "POST" : "PUT",
        JSON.stringify(data)
      );
      if (res.responseCode === "SUCCESS") {
        refreshOKRData();
        close();
      }
    } catch (error) {
      console.log("error", error);
      alert("실패!");
    }
  };
  const onUpdate = async () => {
    try {
      const data = objectives.map((objective) => ({
        ...objective,
        keyResult: keyResults.filter(
          ({ objectiveIndex }) => objectiveIndex === objective.index
        ),
      }));
      const res = await axios(
        `/okr/update?year=${year}&quarter=${quarter}`,
        "PUT",
        JSON.stringify(data)
      );
      if (res.responseCode === "SUCCESS") {
        refreshOKRData();
        close();
      }
    } catch (error) {
      console.log("error", error);
      alert("실패!");
    }
  };

  return (
    <div id="layer_createOKR" className={`layer fade ${show ? "show" : ""}`}>
      <div className="modal-content">
        <div className="modal-header justify-content-center px-0 border-0">
          <h5 className="modal-title">
            <span className="font-weight-bolder">{typeSwitch(type).title}</span>
          </h5>
        </div>
        <div className="modal-body px-7 pt-0 mt-n2">
          <div className="div-table table-edit-okr">
            <div className="table-head">
              <div className="table-row">
                <div className="table-cell">구분</div>
                <div className="table-cell">내용</div>
                <div className="table-cell">진척도</div>
              </div>
            </div>
            <div className="table-body">
              {objectives.map((obj, i) => (
                <>
                  <ObjectiveWriteItem
                    {...obj}
                    count={i}
                    length={objectives.length}
                    onChange={objectiveChangeHandler}
                    addObjective={addObjective}
                    deleteObjective={deleteObjective}
                    type={type}
                    keyResults={keyResults}
                    multiMetaUpdatable={multiMetaUpdatable}
                  />
                  {keyResults
                    .filter(
                      ({ objectiveIndex }) => objectiveIndex === obj.index
                    )
                    .map((kr, j) => (
                      <KeyResultWriteItem
                        {...kr}
                        count={j}
                        length={
                          keyResults.filter(
                            ({ objectiveIndex }) => objectiveIndex === obj.index
                          ).length
                        }
                        onChange={keyResultChangeHandler}
                        addKeyResult={addKeyResult}
                        deleteKeyResult={deleteKeyResult}
                        type={type}
                      />
                    ))}
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer border-0 p-0">
          <button
            type="button"
            className="btn btn-lg btn-secondary w-50 m-0 rounded-0"
            data-dismiss="layer"
            aria-label="닫기"
            onClick={() => close()}
          >
            취소하기
          </button>
          <button
            type="button"
            className={`btn btn-lg w-50 m-0 rounded-0 ${
              isClick ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() =>
              isClick &&
              // eslint-disable-next-line no-nested-ternary
              (type === "update"
                ? isWrite
                  ? showModal("confirm", {
                      onConfirm: () => onUpdate(),
                      isCancel: true,
                      text: <>수정하시겠습니까?</>,
                    })
                  : showModal("okrUpdate", {
                      objectives,
                      keyResults,
                      prevOKR,
                      close,
                    })
                : onWrite())
            }
          >
            {typeSwitch(type).button}
          </button>
        </div>
      </div>
    </div>
  );
}
