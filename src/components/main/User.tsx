import SVG from "utils/SVG";
import React, { useEffect } from "react";
import Profile from "components/Profile";
import { useAuth } from "hooks/useRedux";
import { useDispatch, useSelector } from "react-redux";
import { setActiveHelp } from "store/actions";
import { useMsal } from "@azure/msal-react";

export default function User() {
  const { user: my } = useAuth();
  const { instance } = useMsal();
  const { activeHelp, activePush } = useSelector(
    (state: RootState) => state.setting
  );
  const dispatch = useDispatch();
  const version = localStorage.getItem("version");

  useEffect(() => {
    const isHelp = localStorage.getItem("help");
    const isPush = localStorage.getItem("push");
    if (isHelp === null) {
      localStorage.setItem("help", "show");
      dispatch(setActiveHelp(true));
    } else if (isHelp !== "show") dispatch(setActiveHelp(false));
    else dispatch(setActiveHelp(true));
  }, []);

  useEffect(() => {
    if (activeHelp) localStorage.setItem("help", "show");
    else localStorage.setItem("help", "");
  }, [activeHelp]);

  const logOut = async () => {
    try {
      await instance.logout();
    } catch (error) {
      console.log("error", error);
    } finally {
      await localStorage.setItem("accessToken", "");
      await localStorage.setItem("token", "");
    }
  };

  return (
    <div className="dropdown">
      <div className="topbar-item" data-toggle="dropdown" data-offset="0px,0px">
        <div className="btn btn-icon btn-clean h-40px w-40px btn-dropdown">
          <span className="svg-icon svg-icon-lg">
            <SVG name="user" />
          </span>
        </div>
      </div>
      <div
        className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-md p-0"
        x-placement="bottom-end"
        style={{
          position: "absolute",
          transform: "translate3d(-210px, 40px, 0px)",
          top: "0px",
          left: "0px",
          willChange: "transform",
        }}
      >
        <div className="d-flex flex-column align-items-center p-8 rounded-top">
          <div className="avatar symbol symbol-100">
            <Profile
              user={my}
              className="symbol-label position-relative bg-transparent"
            />
          </div>
          <div className="font-weight-bolder text-dark-75 font-size-h4 m-0 pt-3">
            {my?.name}
          </div>
          <div className="text-dark-75 m-0 flex-grow-1 font-size-lg">
            {my?.organization.name}
          </div>
          <span
            className="btn btn-primary btn-sm font-weight-bold font-size-sm mt-2"
            onClick={() => logOut()}
          >
            Log Out
          </span>
        </div>
        <div className="separator separator-solid" />
        <form className="form p-8">
          {/* <div className="form-group row justify-content-between">
            <label className="col-form-label">푸시알림</label>
            <div>
              <span className="switch switch-brand">
                <label>
                  <input type="checkbox" name="select" />
                  <span />
                </label>
                <span />
              </span>
            </div>
          </div> */}
          <div className="form-group row justify-content-between mb-0">
            <label className="col-form-label">도움말</label>
            <div>
              <span className="switch switch-brand">
                <label>
                  <input
                    type="checkbox"
                    name="select"
                    checked={activeHelp}
                    onChange={({ target }) => {
                      dispatch(setActiveHelp(target.checked));
                    }}
                  />
                  <span />
                </label>
                <span />
              </span>
            </div>
          </div>
        </form>
        <div className="separator separator-solid" />
        <div className="d-flex justify-content-between text-muted px-8 py-5">
          <span className="font-weight-bold">Version</span>
          <span className="opacity-70">
            {process.env.REACT_APP_DEV ? version : "DEV MODE"}
          </span>
        </div>
      </div>
    </div>
  );
}
