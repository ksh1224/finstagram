import SVG from "utils/SVG";
import React, { createRef, useEffect, useState } from "react";
import Profile from "components/Profile";
import { useModal, useNotification } from "hooks/useRedux";
import useOutsideClick from "hooks/useOutsideClick";
import Scroll from "components/Scroll";

export default function Notifications() {
  const { data, isFetching, currentPage, totalPages } = useNotification();
  const { showModal } = useModal();
  const [show, setShow] = useState(false);
  const divRef = createRef<HTMLDivElement>();
  useOutsideClick(divRef, () => {
    if (show) setShow(false);
  });

  return (
    <div className="dropdown">
      <div className="topbar-item mr-3">
        <div
          className="btn btn-icon btn-secondary pulse pulse-white"
          onClick={() => setShow(!show)}
        >
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
            transform: "translate3d(-349px, 41px, 0px)",
          }}
        >
          <Scroll
            className="ps p-8 h-auto max-h-500px"
            style={{ height: "500px", overflow: "hidden" }}
          >
            <div className="d-flex flex-column flex-center py-10 bg-secondary rounded-top bg-light mt-n8 mx-n8">
              <h4 className="text-dark font-weight-bold">공지사항</h4>
              <span className="btn btn-success btn-sm font-weight-bold font-size-sm mt-2">
                확인하기
              </span>
            </div>
            {data &&
              data.map(({ entityId, user, title, createdAt, sender }: any) => {
                return (
                  <div
                    className="d-flex align-items-center cursor-pointer mx-n8 p-8 bg-hover-secondary-o-1 cursor-pointer"
                    onClick={() => {
                      showModal("feedback", entityId);
                      setShow(false);
                    }}
                  >
                    {sender ? (
                      <div className="avatar symbol symbol-50">
                        <Profile user={sender} />
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
              })}

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
