import SVG from "utils/SVG";
import React, { useEffect, useState } from "react";
import { useAuth, useModal, useSearchUser } from "hooks/useRedux";
import { searchListUser } from "utils/searchUtil";
import SearchListItem from "components/item/SearchListItem";
import axios from "utils/axiosUtil";

type Props = {
  on?: boolean;
};

export default function Search({ on }: Props) {
  const { showModal } = useModal();
  const { user: my } = useAuth();
  const [isTest, setIsTest] = useState(false);
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [list, setList] = useState<SearchItemType[]>([]);
  const { data } = useSearchUser();

  useEffect(() => {
    if (text && text.trim().length > 1) {
      if (text === process.env.REACT_APP_TEST_ON) {
        setIsTest(true);
        setText("");
      }
      if (text === process.env.REACT_APP_TEST_OFF) {
        localStorage.setItem("testUser", "");
        window.location.href = window.location.origin;
      }
      setShow(true);
      const search = text.trim();
      if (!data) return;
      const searchData = searchListUser(data.user, search);
      setList(searchData);
    } else setShow(false);
  }, [text]);

  useEffect(() => {
    if (!on) setText("");
  }, [on]);

  const close = () => {
    setText("");
    setShow(false);
  };

  const changeUser = async (id: number) => {
    try {
      const { data: user } = await axios(`/user/${id}`, "GET");
      localStorage.setItem("testUser", user.username);
      window.location.href = window.location.origin;
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="topbar-item mr-3 w-100 w-lg-auto justify-content-start">
      <div
        className="quick-search quick-search-inline quick-search-has-result w-auto w-lg-200px"
        data-toggle="search"
        data-list="#layer_srchList"
      >
        <form method="get" className="quick-search-form">
          <div className="input-group rounded bg-secondary">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="svg-icon svg-icon-lg">
                  <SVG name="search" />
                </span>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder={isTest ? "Test User..." : "Search..."}
              value={text}
              onChange={({ target }) => setText(target.value)}
            />
            <div className="input-group-append">
              <span className="input-group-text">
                <i
                  className="quick-search-close ki ki-close icon-sm"
                  onClick={() => setText("")}
                  style={{ display: text.length > 0 ? "block" : "none" }}
                />
              </span>
            </div>
            <div
              id="layer_srchList"
              className={`dropdown-menu dropdown-menu-left dropdown-menu-md dropdown-menu-anim-up px-0 py-3 ${
                show ? "show" : ""
              }`}
              x-placement="bottom-start"
            >
              <div
                className="quick-search-wrapper overflow-hidden overflow-y-auto"
                data-scroll="true"
                style={{ height: "300px" }}
              >
                <div className="quick-search-result" data-scroll="true">
                  {list.length !== 0 &&
                    list.map((user) => (
                      <SearchListItem
                        key={user?.id}
                        user={user}
                        onClick={() => {
                          if (isTest) changeUser(user?.id);
                          else if (user && user.id !== my.id) {
                            showModal("userProfile", { user });
                            close();
                          }
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </form>

        <div
          id="kt_quick_search_toggle"
          data-toggle="dropdown"
          data-offset="10px, 10px"
        />

        <div className="dropdown-menu dropdown-menu-left dropdown-menu-lg dropdown-menu-anim-up">
          <div
            className="quick-search-wrapper scroll"
            data-scroll="true"
            data-height="350"
            data-mobile-height="200"
          />
        </div>
      </div>
    </div>
  );
}
