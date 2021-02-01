import Profile from "components/Profile";
import React from "react";

export type Props = {
  evaluator1st?: any;
  evaluator2nd?: any;
  evaluatorFinal?: any;
  finishedEvaluation?: boolean;
  progress?: "COMPLETE" | "IN_PROGRESS" | "NOT_STARTED" | "PENDING";
  progressNumber?: number;
  readyToEvaluate?: boolean;
  submittedAt?: string;
  user: any;
  onClick?: () => void;
};

export default function ReviewCheckItem({
  user,
  progress,
  evaluator1st,
  evaluator2nd,
  evaluatorFinal,
  progressNumber,
  onClick,
}: Props) {
  let step = 0;
  if (evaluator1st) step += 1;
  if (evaluator2nd) step += 1;
  if (evaluatorFinal) step += 1;

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      className="d-flex mx-8 py-4 border-top justify-content-between"
      role="button"
      onClick={() => onClick && progress !== "NOT_STARTED" && onClick()}
    >
      <div className="d-flex w-150px align-items-center">
        <div className="avatar symbol symbol-50 mr-4">
          <Profile user={user} />
        </div>
        <div className="overflow-hidden w-100px flex-grow-1 font-size-lg">
          <div className="font-weight-bold">{user.name}</div>
          <small className="d-block text-truncate">
            {user?.organization?.name}
          </small>
        </div>
      </div>
      {progress !== "NOT_STARTED" ? (
        <div className="d-flex flex-grow-1 flex-row">
          <div className="d-flex flex-column col-3 p-0 align-items-center justify-content-center">
            <label className="checkbox checkbox-lg">
              <input type="checkbox" name="Checkboxes3_1" checked disabled />
              <span />
            </label>
            <span className="font-size-xs text-dark-50 font-weight-bold mt-1">
              {user.name}
            </span>
          </div>
          <div className="d-flex flex-column col-3 p-0 align-items-center justify-content-center">
            {evaluator1st && (
              <label className="checkbox checkbox-lg">
                <input
                  type="checkbox"
                  name="Checkboxes3_1"
                  checked={
                    !!progressNumber &&
                    (progressNumber === -1 || progressNumber > 1)
                  }
                  disabled
                />
                <span />
              </label>
            )}
            <span className="font-size-xs text-dark-50 font-weight-bold mt-1">
              {evaluator1st?.name}
            </span>
          </div>
          <div className="d-flex flex-column col-3 p-0 align-items-center justify-content-center">
            {evaluator2nd && (
              <label className="checkbox checkbox-lg">
                <input
                  type="checkbox"
                  name="Checkboxes3_1"
                  checked={
                    !!progressNumber &&
                    (progressNumber === -1 || progressNumber > step - 1)
                  }
                  disabled
                />
                <span />
              </label>
            )}
            <span className="font-size-xs text-dark-50 font-weight-bold mt-1">
              {evaluator2nd?.name}
            </span>
          </div>
          <div className="d-flex flex-column col-3 p-0 align-items-center justify-content-center">
            <label className="checkbox checkbox-lg">
              <input
                type="checkbox"
                name="Checkboxes3_1"
                checked={
                  !!progressNumber &&
                  (progressNumber === -1 || progressNumber > step)
                }
                disabled
              />
              <span />
            </label>
            <span className="font-size-xs text-dark-50 font-weight-bold mt-1">
              {evaluatorFinal?.name}
            </span>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-grow-1 flex-row align-items-center justify-content-end">
          <span className="d-inline-block bg-secondary btn-sm">
            Self Review 미작성
          </span>
        </div>
      )}
    </div>
  );
}
