import React, { useEffect, useState } from "react";
import { useSearchUser } from "hooks/useRedux";
import SearchListItem from "components/item/SearchListItem";

type LayoutType = {
  children?: JSX.Element[] | JSX.Element;
  text?: string;
};
type ListType = {
  id?: number;
  name?: string;
  nickname?: string;
  organizationId?: number;
  organizationName?: string;
  position?: string;
  profileImageUrl?: string;
}[];

export default function SearchList({ text }: LayoutType) {
  const [show, setShow] = useState(false);
  const [list, setList] = useState<ListType>([{}]);
  const { data } = useSearchUser();

  useEffect(() => {
    if (text && text.trim() !== "") {
      setShow(true);
      const searchUser: ListType = [];
      const search = text.trim();
      for (const obj of data.user) {
        if (
          `${obj.name}`.toLowerCase().indexOf(`${search}`.toLowerCase()) !==
            -1 ||
          `${obj.organizationName}`
            .toLowerCase()
            .indexOf(`${search}`.toLowerCase()) !== -1
        )
          searchUser.push(obj);
      }

      if (searchUser.length !== 0)
        searchUser.sort((a, b) => {
          let compare = 0;
          const bName = `${b?.name}`
            .toLowerCase()
            .indexOf(`${search}`.toLowerCase());
          const aName = `${a?.name}`
            .toLowerCase()
            .indexOf(`${search}`.toLowerCase());
          const bOrgan = `${b?.organizationName}`
            .toLowerCase()
            .indexOf(`${search}`.toLowerCase());
          const aOrgan = `${a?.organizationName}`
            .toLowerCase()
            .indexOf(`${search}`.toLowerCase());

          if (bName !== -1) {
            if (aOrgan !== -1) compare = 1;
            else
              bName < aName
                ? (compare = 1)
                : bName > aName
                ? (compare = -1)
                : (compare = 0);
          } else if (aName !== -1) compare = -1;
          else
            bOrgan < aOrgan
              ? (compare = 1)
              : bOrgan > aOrgan
              ? (compare = -1)
              : (compare = 0);
          return compare;
        });
      setList(searchUser);
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
              list.map(
                ({
                  id,
                  name,
                  nickname,
                  organizationName,
                  profileImageUrl,
                  position,
                }) => (
                  <SearchListItem
                    id={id}
                    name={`${position} ${name}(${nickname})`}
                    organizationName={organizationName}
                    profileImageUrl={profileImageUrl}
                  />
                )
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
