import "scrollbar.css";
import React, { useEffect, useState } from "react";
import { useSearchUser } from "hooks/useRedux";
import SearchListItem from "components/item/FeedbackSearchListItem";
import { searchListUser } from "utils/searchUtil";

type SearchListType = {
  text?: string;
};

export default function SearchList({ text }: SearchListType) {
  const [show, setShow] = useState(false);
  const [list, setList] = useState<SearchItemType[]>([]);
  const { data } = useSearchUser();

  useEffect(() => {
    if (text && text.trim().length > 1) {
      setShow(true);
      const search = text.trim();
      if (!data) return;
      const searchData = searchListUser(data.user, search);
      setList(searchData);
    } else setShow(false);
  }, [text]);
  return (
    <div
      id="layer_fd_srchList"
      className={`layer fade d-flex flex-column bg-transparent ${
        show && "show"
      }`}
    >
      <div className="modal-content w-auto mt-7 mx-7">
        <div className="modal-body">
          <div className="mt-n5">
            <div
              className="text-center pt-10"
              style={{ display: list.length === 0 ? "block" : "none" }}
            >
              검색결과가 없습니다.
            </div>
            {list.length !== 0 &&
              list.map((user) => <SearchListItem key={user?.id} user={user} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

SearchList.defaultProps = {
  text: "",
};
