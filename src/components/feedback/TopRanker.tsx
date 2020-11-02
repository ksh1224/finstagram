import React, { useState } from "react";
import SearchListItem from "components/item/SearchListItem";
import TopRankerItem from "components/item/TopRankerItem";
import SearchInput from "components/input/SearchInput";
import SearchList from "components/feedback/SearchList";
import TopRankerHeader from "components/feedback/TopRankerHeader";
import { useFeedbackMain } from "hooks/useRedux";

type ArrayType = [
  {
    data: [
      {
        feedbackReceived?: number;
        feedbackSent?: number;
        quarter?: number;
        rank?: number;
        total?: number;
        user?: {
          id: number;
          username: string;
          profileImageUrl: string;
          name: string;
          organization: {
            name: string;
          };
        };
        year?: number;
      }
    ];
    orgGroup: {
      id: number;
      name: string;
    };
  }
];

type TopRankerType = {
  bestCommunicatorAllByGroup?: ArrayType;
  bestCommunicatorByGroup?: ArrayType;
};

export default function TopRanker() {
  const { isFetching, data, request } = useFeedbackMain();
  const [isQuerter, setIsQuerter] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [orgGroupId, setOrgGroupId] = useState<number>();
  if (data) {
    const {
      bestCommunicatorAllByGroup: AllGroup,
      bestCommunicatorByGroup: QuerterGroup,
    }: TopRankerType = data;

    return (
      <div className="col-auto h-sm-100 w-425px d-flex flex-column">
        <SearchInput value={searchText} onChange={setSearchText} />
        <div className="position-relative h-100px flex-grow-1 overflow-hidden mt-n7 pt-7 px-7 mx-n7">
          <div className="card card-custom h-100 rounded-bottom-0">
            <TopRankerHeader
              isQuerter={isQuerter}
              setIsQuerter={setIsQuerter}
              AllGroup={AllGroup}
              QuerterGroup={QuerterGroup}
              setOrgGroupId={setOrgGroupId}
            />
            <div className="card-body overflow-hidden overflow-y-auto">
              <div className="tab-content">
                {!isQuerter
                  ? AllGroup?.map(({ data: rankerData, orgGroup }) => {
                      return (
                        <div
                          className={`tab-pane fade show ${
                            orgGroupId === orgGroup.id && "active"
                          }`}
                          id={`ranking_tab_${orgGroup.id}`}
                          role="tabpanel"
                          aria-labelledby={`ranking_tab_${orgGroup.id}`}
                        >
                          {rankerData?.map(
                            ({ feedbackReceived, user, rank }) => (
                              <TopRankerItem
                                rank={rank}
                                feedbackReceived={feedbackReceived}
                                user={user}
                              />
                            )
                          )}
                        </div>
                      );
                    })
                  : QuerterGroup?.map(({ data: rankerData, orgGroup }) => {
                      return (
                        <div
                          className="tab-pane fade show active"
                          id={`ranking_tab_${orgGroup.id}`}
                          role="tabpanel"
                          aria-labelledby={`ranking_tab_${orgGroup.id}`}
                        >
                          {rankerData?.map(
                            ({ feedbackReceived, user, rank }) => (
                              <TopRankerItem
                                rank={rank}
                                feedbackReceived={feedbackReceived}
                                user={user}
                              />
                            )
                          )}
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          <SearchList text={searchText} />
        </div>
      </div>
    );
  }
  // if (isFetching) return <div>로딩중</div>;
  return <div>데이터가 없습니다</div>;
}
