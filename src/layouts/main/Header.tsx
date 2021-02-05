import Notifications from "components/main/Notifications";
import Search from "components/main/Search";
import User from "components/main/User";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "utils/axiosUtil";
import TabItem from "../../components/main/TabItem";
import Topbar from "./Topbar";

type LayoutType = {
  children: JSX.Element[];
};

export default function Header() {
  const [on, setOn] = useState(false);
  const [showReview, setShowReiview] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  const getShowReview = async () => {
    try {
      const response = await axios("/review/showButton/info", "GET");
      if (response.responseCode === "SUCCESS") {
        setShowReiview(response.data);
        if (!response.data && pathname === "/Review") {
          history.push("/");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getShowReview();
  }, []);

  // useEffect(() => {
  //   if (!showReview && pathname === "/Review") {
  //     history.push("/");
  //   }
  // }, [pathname, showReview]);

  return (
    <div id="kt_header" className="header flex-column header-fixed">
      <div className="header-top">
        <div className="container-fluid">
          <h1 className="logo d-lg-flex align-items-center mr-3 w-100px flex-grow-1">
            <div className="mr-20 text-dark-50 h-100 d-flex align-items-center">
              <img src="http://cdn.fnf.co.kr/logos/finstagram.png" alt="Finstagram" />
              <span className="d-none">Finstagram</span>
            </div>
          </h1>
          <div className="align-items-center" id="kt_aside_mobile_toggle">
            <button
              type="button"
              className="btn p-0 burger-icon burger-icon-left"
              onClick={() => setOn(!on)}
            >
              <span />
            </button>
          </div>
          <Topbar on={on} />
        </div>
      </div>

      <div className="header-top h-auto" id="kt_header_bottom">
        <div className="container-fluid d-flex flex-column">
          <ul className="header-tabs nav flex-column-auto" role="tablist">
            <TabItem path="" />
            <TabItem path="OKR" />
            {showReview && <TabItem path="Review" />}
          </ul>
        </div>
      </div>
    </div>
  );
}
