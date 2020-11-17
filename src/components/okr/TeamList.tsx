import OKRSearchInput from "components/input/OKRSearchInput";
import SearchListItem from "components/item/SearchListItem";
import Profile from "components/Profile";
import { useSearchUser } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import { searchList } from "utils/searchUtil";
import SVG from "utils/SVG";

export default function TeamList() {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [list, setList] = useState<SearchItemType[]>([]);
  const { data } = useSearchUser();

  useEffect(() => {
    if (text && text.trim() !== "") {
      setShow(true);
      const search = text.trim();
      if (!data) return;
      const searchData = searchList(data.user, search);
      setList(searchData);
    } else setShow(false);
  }, [text]);

  return (
    <div className="section-1 col-auto h-sm-100 w-250px d-flex flex-column border-right px-0">
      <div className="card card-custom card-stretch rounded-0 shadow-none">
        <OKRSearchInput value={text} onChangeState={setText} />
        <div className="card-body position-relative px-6 py-0">
          <ul className="list-team h-100 overflow-y-auto py-5">
            <li>
              (주)에프앤에프
              <ul>
                <li>
                  <a href="javascript:;">법무팀</a>
                </li>
                <li>
                  <a href="javascript:;">경영관리팀</a>
                </li>
                <li>
                  <a href="javascript:;">재무팀</a>
                </li>
                <li>
                  <a href="javascript:;">HR팀</a>
                </li>
                <li>
                  <a href="javascript:;">총무팀</a>
                </li>
                <li>
                  <a href="javascript:;">PR전략팀</a>
                </li>
                <li>
                  <a href="javascript:;">외식팀</a>
                </li>
                <li>
                  <a href="javascript:;">경영개선팀</a>
                </li>
                <li>
                  <a href="javascript:;">사업지원팀</a>
                </li>
                <li>
                  <a href="javascript:;">영업관리팀</a>
                </li>
                <li>
                  <a href="javascript:;">고객관리팀</a>
                </li>
                <li>
                  <a href="javascript:;">콜렉티드팀</a>
                </li>
                <li>
                  <a href="javascript:;">디지털트랜스포메이션팀</a>
                </li>
                <li>
                  <a href="javascript:;">Project Management</a>
                </li>
                <li>
                  <a href="javascript:;">E-biz</a>
                </li>
                <li>
                  <a href="javascript:;">경영정보팀</a>
                </li>
                <li>
                  <a href="javascript:;">MLB</a>
                </li>
                <li>
                  <a href="javascript:;">Discovery </a>
                </li>
                <li>
                  <a href="javascript:;">Stretch Angels</a>
                </li>
                <li>
                  <a href="javascript:;">Duvetica</a>
                </li>
                <li>
                  <a href="javascript:;">VC팀</a>
                </li>
                <li>
                  <a href="javascript:;">공간기획팀</a>
                </li>
              </ul>
            </li>
            <li>
              로지스틱스
              <ul>
                <li>
                  <a href="javascript:;">관리팀</a>
                </li>
                <li>
                  <a href="javascript:;">상제품운영팀</a>
                </li>
                <li>
                  <a href="javascript:;">자재운영팀</a>
                </li>
              </ul>
            </li>
          </ul>
          <div
            id="layer_okr_srchList"
            className={`layer fade position-absolute overflow-y-auto pt-3 pb-3 ${
              show ? "show" : ""
            }`}
          >
            {list.map((user) => (
              <SearchListItem key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
