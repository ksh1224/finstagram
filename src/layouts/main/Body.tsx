import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SVG from "utils/SVG";
import axios from "utils/axiosUtil";
import { useAuth, useModal } from "hooks/useRedux";
import { useSelector } from "react-redux";

type LayoutType = {
  children: JSX.Element[];
};

export default function Body({ children }: LayoutType) {
  const { pathname } = useLocation();
  const { user: my } = useAuth();
  const { showModal } = useModal();
  const { activeHelp, activePush } = useSelector(
    (state: RootState) => state.setting
  );
  const [guides, setGuides] = useState<
    {
      fileUrlHttps: string;
      title: string;
      uri: string;
    }[]
  >([]);
  useEffect(() => {
    (async () => {
      try {
        let url = "/guide/feedback";
        let evalData;
        if (pathname === "/OKR") url = "/guide/okr";
        else if (pathname === "/Review") url = "/guide/review";
        const { data } = await axios(url, "GET");
        if (pathname === "/Review" && my.isReviewer) {
          ({ evalData } = await axios("/guide/performance", "GET"));
        }
        if (evalData) setGuides([...evalData, ...data]);
        else setGuides(data);
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [pathname]);
  return (
    <div className="d-flex flex-row flex-column-fluid page">
      <div
        id="finsta_wrapper"
        className="d-flex flex-column flex-row-fluid wrapper p-0"
      >
        {children}
      </div>
      {activeHelp ? (
        <div className="position-fixed bottom-0 right-0 mr-5 mb-5 dropleft">
          <button
            className="btn btn-icon btn-clean btn-lg p-0"
            type="button"
            id="finstagram_help"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <a
              className="d-flex btn bg-secondary border-top w-100 h-100 p-0 align-items-center justify-content-center"
              data-toggle="tooltip"
              data-placement="top"
              data-theme="dark"
              title="도움말"
            >
              <span className="svg-icon svg-icon-2x">
                <SVG name="help" />
              </span>
            </a>
          </button>
          <div
            className="dropdown-menu w-auto"
            aria-labelledby="finstagram_help"
          >
            {guides.map(({ title, uri, fileUrlHttps }) => (
              <a
                className="dropdown-item"
                onClick={() =>
                  showModal("help", {
                    title,
                    uri,
                    fileUrlHttps,
                  })
                }
              >
                {title}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
