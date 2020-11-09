/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import "scrollbar.css";
import Profile from "components/Profile";
import { useModal, useSearchUser, useAuth, useFeedback } from "hooks/useRedux";
import React, { useEffect, useState, createRef } from "react";
import { searchList } from "utils/searchUtil";
import SVG from "utils/SVG";
import { Modal } from "react-bootstrap";

type UserType = {
  id?: number;
  name?: string;
  nickname?: string;
  organizationId?: number;
  organizationName?: string;
  position?: string;
  profileImageUrl?: string;
};

export default function FeedbackRequestModal() {
  const fileRef = createRef<HTMLInputElement>();
  const textLimit = 100;
  const { APIAuth } = useAuth();
  const { user } = APIAuth;
  const { modals, closeModal } = useModal();
  const [users, setUsers] = useState<UserType[]>();
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState<UserType[]>([]);
  const [show, setShow] = useState(false);
  const [contents, setContents] = useState("");
  const [file, setFile] = useState<any>(null);
  const { data } = useSearchUser();
  const { feedbackRequest } = useFeedback();

  const requestFeedbackModal = modals.find(
    (modal) => modal.name === "requestFeedback"
  );

  const feedbackUser = requestFeedbackModal?.param;

  useEffect(() => {
    if (searchText && searchText.trim() !== "") {
      setShow(true);
      const search = searchText.trim();
      if (!data) return;
      const searchData = searchList(data.user, search, [user, feedbackUser]);
      setList(searchData);
    } else setShow(false);
  }, [searchText]);

  function deleteUser(userData: UserType) {
    if (users) {
      const filterData = users.filter((value) => userData.id !== value.id);
      setUsers([...filterData]);
    }
  }

  function addUser(userData: UserType) {
    if (users) setUsers([...users, userData]);
    else setUsers([userData]);
  }

  function sendFeedback() {
    if (requestFeedbackModal) {
      feedbackRequest(
        users ? [feedbackUser, ...users] : [feedbackUser],
        contents,
        file && file[0]
      );
      closeModal("requestFeedback");
    }
  }

  return (
    <Modal
      show={!!requestFeedbackModal}
      animation
      centered
      onHide={() => closeModal("requestFeedback")}
    >
      <div className="modal-content">
        <div className="modal-header border-0 mb-n12 justify-content-end">
          <button
            type="button"
            className="close position-relative zindex-1"
            data-dismiss="modal"
            aria-label="닫기"
            onClick={() => closeModal("requestFeedback")}
          >
            <i aria-hidden="true" className="ki ki-close" />
          </button>
        </div>
        <div className="modal-body">
          <div className="d-flex flex-column align-items-center">
            <div
              className="quick-search quick-search-has-result input-group input-group-solid mb-10 w-225px w-xxl-250px"
              data-toggle="search"
              data-list="#layer_rq_srchList"
            >
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <span className="svg-icon svg-icon-lg">
                    <SVG name="search" />
                  </span>
                </span>
              </div>
              <input
                type="text"
                className="form-control py-4 h-auto"
                placeholder="팀 또는 이름을 입력해 주세요."
                value={searchText}
                onChange={({ target }) => setSearchText(target.value)}
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i
                    className="quick-search-close ki ki-close icon-sm text-muted"
                    style={{
                      display: searchText.length !== 0 ? "block" : "none",
                    }}
                    onClick={() => setSearchText("")}
                  />
                </span>
              </div>
              <div
                id="layer_rq_srchList"
                className={`dropdown-menu dropdown-menu-left dropdown-menu-md dropdown-menu-anim-up ${
                  show && "show"
                }`}
                style={{ height: "350px", overflowY: "scroll" }}
                x-placement="bottom-start"
              >
                <div className="quick-search-wrapper">
                  <div className="quick-search-result">
                    {list.map((userData) => {
                      const include = !!users?.find(
                        (obj) => userData.id === obj.id
                      );
                      return (
                        <div
                          key={userData.id}
                          className="d-flex align-items-center bg-hover-light cursor-pointer px-5 py-4"
                          style={
                            include ? { backgroundColor: "#9993" } : undefined
                          }
                          onClick={() =>
                            include ? deleteUser(userData) : addUser(userData)
                          }
                        >
                          <Profile width={40} user={userData} />
                          <div className="w-100px flex-grow-1 ml-5">
                            <div className="font-weight-bolder text-dark-75 font-size-md">
                              {`${userData.position} ${userData.name}`}
                            </div>
                            <div className="text-dark-50 m-0 flex-grow-1 font-size-sm">
                              {userData.organizationName}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex max-w-100 overflow-x-auto">
              <div className="mx-3 text-center">
                <Profile user={feedbackUser} type="feedbackModal" />
                <div className="font-weight-bolder text-dark-75 font-size-lg m-0 pt-1">
                  {feedbackUser?.name}
                </div>
              </div>
              {users?.map((userData) => (
                <div key={userData.id} className="mx-3 text-center">
                  <span className="symbol-label position-relative bg-transparent">
                    <Profile
                      onClick={() => deleteUser(userData)}
                      user={userData}
                      type="feedbackModal"
                    />
                    <button
                      type="button"
                      className="label label-danger position-absolute bottom-0 right-0 mr-n2 mb-1 border-0"
                      onClick={() => deleteUser(userData)}
                    >
                      <span className="svg-icon svg-icon-white">
                        <SVG name="delete" />
                      </span>
                    </button>
                  </span>
                  <div className="font-weight-bolder text-dark-75 font-size-lg m-0 pt-1">
                    {userData?.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="separator separator-solid my-6 w-100" />

            <div className="d-flex justify-content-between">
              <p>피드백 받고 싶은 내용을 작성해주세요.</p>
              <span className="text-muted font-size-sm">{`${contents.length}/${textLimit}`}</span>
            </div>

            <textarea
              className="form-control resize-none"
              id="exampleTextarea"
              rows={5}
              placeholder="피드백 받는 내용이 '칭찬'일 경우 전체 공개가 되며 '조언'일 경우 개인에게만 공개가 됩니다."
              value={contents}
              onChange={({ target }) =>
                setContents(
                  target.value.length <= textLimit
                    ? target.value
                    : target.value.substr(0, textLimit)
                )
              }
            />

            <ol
              className="p-0 mt-2 mb-0 font-size-sm text-black-50"
              style={{ listStylePosition: "inside" }}
            >
              <li>업무와 관련 모든 내용에 대해 자유롭게 요청해주세요.</li>
              <li>필요 시, 파일을 첨부 할 수 있습니다.</li>
            </ol>

            <input
              ref={fileRef}
              type="file"
              onChange={({ target }) => setFile(target.files)}
              style={{ display: "none" }}
            />
            <div className="dropzone dropzone-multi mt-6 attch_file">
              <div className="dropzone-panel mb-lg-0 mb-2">
                <a
                  className="dropzone-select btn btn-light-primary font-weight-bold btn-sm"
                  onClick={() => fileRef.current?.click()}
                >
                  파일 첨부
                </a>
              </div>
              <div className="dropzone-items">
                {!!file && !!file[0] && (
                  <div className="dropzone-item">
                    <div className="dropzone-file">
                      <div className="dropzone-filename" title={file[0].name}>
                        <span data-dz-name="">{file[0].name}</span>
                        <strong>
                          (
                          <span data-dz-size={file[0].size}>
                            {`${file[0].size}KB`}
                          </span>
                          )
                        </strong>
                      </div>
                      <div className="dropzone-error" data-dz-errormessage="" />
                    </div>
                    <div className="dropzone-progress">
                      <div className="progress">
                        <div
                          className="progress-bar bg-primary"
                          role="progressbar"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={0}
                          data-dz-uploadprogress=""
                        />
                      </div>
                    </div>
                    <div className="dropzone-toolbar">
                      <span className="dropzone-delete" data-dz-remove="">
                        <i
                          className="flaticon2-cross"
                          onClick={() => setFile(null)}
                        />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer border-0 p-0 mt-5">
          <button
            type="button"
            className="btn btn-lg btn-primary w-100 m-0 rounded-0"
            onClick={() => sendFeedback()}
          >
            요청하기
          </button>
        </div>
      </div>
    </Modal>
  );
}
