/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import SVG from "utils/SVG";
import React, { createRef, useEffect, useState } from "react";
import Profile from "components/Profile";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useModal, useNotification } from "hooks/useRedux";
import useOutsideClick from "hooks/useOutsideClick";
import Scroll from "components/Scroll";
import axios from "utils/axiosUtil";
import DataValidationContainer from "layouts/DataValidationContainer";

export default function Notifications() {
  const {
    data,
    isFetching,
    currentPage,
    totalPages,
    notiCount,
    request,
  } = useNotification();
  const location = useLocation();
  const history = useHistory();
  const { showModal, modals } = useModal();
  const [show, setShow] = useState(false);
  const divRef = createRef<HTMLDivElement>();

  useOutsideClick(divRef, () => {
    if (show && modals.length === 0)
      setTimeout(async () => {
        setShow(false);
        await axios("/noti/read/all", "POST");
        await request();
      }, 100);
  });

  useEffect(() => {
    if (location.search.includes("showmethenoti")) {
      setShow(true);
      history.push(location.pathname);
    }
  }, []);

  return (
    <div className="dropdown">
      <div className="topbar-noti topbar-item mr-3">
        <div
          className={`btn btn-icon btn-secondary ${
            typeof notiCount === "number" && notiCount !== 0
              ? "pulse pulse-white"
              : ""
          }`}
          onClick={() => !show && setShow(true)}
        >
          {typeof notiCount === "number" && notiCount !== 0 && (
            <span className="position-absolute notification-count badge badge-primary rounded-lg px-2">
              {notiCount}
            </span>
          )}
          <span className="svg-icon svg-icon-lg">
            <SVG name="notification" />
          </span>
          <span className="pulse-ring" />
        </div>
        <div
          ref={divRef}
          className={`dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-xl ${
            show ? "show" : ""
          }`}
          x-placement="bottom-end"
          style={{
            position: "absolute",
            willChange: "transform",
            top: "0px",
            left: "0px",
            transform: "translate3d(calc(-100% + 38px), 41px, 0px)",
          }}
        >
          <Scroll
            className="ps px-8 pb-8 h-auto max-h-500px"
            style={{ height: "500px", overflow: "hidden" }}
            callback={() => {
              if (
                typeof totalPages === "number" &&
                typeof currentPage === "number" &&
                totalPages > currentPage
              )
                request(currentPage + 1);
            }}
          >
            {/* <div className="d-flex flex-column flex-center py-10 bg-secondary rounded-top bg-light mx-n8">
              <h4 className="text-dark font-weight-bold">공지사항</h4>
              <span className="btn btn-success btn-sm font-weight-bold font-size-sm mt-2">
                확인하기
              </span>
            </div> */}
            <DataValidationContainer
              noDataView={
                <div className="d-flex align-items-center mx-n8 p-8 mt-8 justify-content-center">
                  <div className="text-dark-50 mb-1">알람이 없습니다</div>
                </div>
              }
            >
              {data?.map(
                ({
                  entityId,
                  title,
                  createdAt,
                  sender,
                  targetEntity,
                  targetEntityDescription,
                  hasRead,
                }: any) => {
                  return (
                    <div
                      key={entityId}
                      className="d-flex align-items-center cursor-pointer mx-n8 p-8 bg-hover-secondary-o-1 cursor-pointer"
                      style={
                        hasRead
                          ? { opacity: "60%", backgroundColor: "#9991" }
                          : undefined
                      }
                      onClick={() => {
                        switch (targetEntityDescription) {
                          case "FEEDBACK":
                            showModal("feedback", entityId);
                            break;
                          case "KEY_RESULT":
                            showModal("keyResult", entityId);
                            break;
                          default:
                            break;
                        }
                      }}
                    >
                      {sender ? (
                        <div className="avatar symbol symbol-50">
                          <Profile
                            user={sender}
                            onClick={() => {
                              switch (targetEntity) {
                                case "FEEDBACK":
                                  showModal("feedback", entityId);
                                  break;
                                case "KEY_RESULT":
                                  showModal("keyResult", entityId);
                                  break;
                                default:
                                  break;
                              }
                            }}
                          />
                          <div className="feedback-icon position-absolute w-30px h-30px bottom-0 right-0">
                            {/* <span className="position-absolute w-100 h-100 bg-light-light rounded-circle" />
                          class="position-relative" svg */}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div className="d-flex flex-column font-weight-bold ml-8">
                        <div className="text-dark-50 mb-1">{title}</div>
                        <span className="text-muted font-size-sm">
                          {createdAt?.split("T").join(" ")}
                        </span>
                      </div>
                    </div>
                  );
                }
              )}
            </DataValidationContainer>

            <div className="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
              <div
                className="ps__thumb-x"
                tabIndex={0}
                style={{ left: "0px", width: "0px" }}
              />
            </div>
            <div
              className="ps__rail-y"
              style={{ top: "0px", right: "0px", height: "500px" }}
            >
              <div
                className="ps__thumb-y"
                tabIndex={0}
                style={{ top: "0px", height: "300px" }}
              />
            </div>
          </Scroll>
        </div>
      </div>
    </div>
  );
}
