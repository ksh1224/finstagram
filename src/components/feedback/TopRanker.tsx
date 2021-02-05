import React, { useEffect, useState } from "react";
import TopRankerItem from "components/item/TopRankerItem";
import SearchInput from "components/input/FeedbackSearchInput";
import SearchList from "components/feedback/SearchList";
import TopRankerHeader from "components/feedback/TopRankerHeader";
import { useTopRanker } from "hooks/useFeedBackRedux";
import DataValidationContainer from "layouts/DataValidationContainer";

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
  const { isFetching, data, request } = useTopRanker();
  const [isQuerter, setIsQuerter] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [orgGroupId, setOrgGroupId] = useState<number>();

  useEffect(() => {
    if (!orgGroupId && data?.bestCommunicatorByGroup) {
      let isNotSelect = true;
      data?.bestCommunicatorByGroup.forEach((obj: any) => {
        if (obj.userIsMember) {
          setOrgGroupId(obj.orgGroup.id);
          isNotSelect = false;
        }
      });
      if (isNotSelect)
        setOrgGroupId(data?.bestCommunicatorByGroup[0].orgGroup.id);
    }
  }, [data]);

  const AllGroup: ArrayType = data?.bestCommunicatorAllByGroup;
  const QuerterGroup: ArrayType = data?.bestCommunicatorByGroup;

  return (
    <div className="col-auto h-sm-100 w-400px d-flex flex-column section-1">
      <SearchInput value={searchText} onChange={setSearchText} />
      <div className="position-relative h-100px flex-grow-1 overflow-hidden mt-n7 pt-7 px-7 mx-n7">
        <div className="card card-custom h-100 rounded-bottom-0">
          <TopRankerHeader
            isQuerter={isQuerter}
            setIsQuerter={setIsQuerter}
            AllGroup={AllGroup}
            QuerterGroup={QuerterGroup}
            orgGroupId={orgGroupId}
            setOrgGroupId={setOrgGroupId}
          />
          <div className="card-body overflow-hidden overflow-y-auto h-100px flex-grow-1">
            <div className="tab-content">
              <DataValidationContainer isFetching={!AllGroup && isFetching}>
                {!isQuerter
                  ? AllGroup?.map(({ data: rankerData, orgGroup }) => {
                      return (
                        <div
                          key={orgGroup?.id}
                          className={`tab-pane fade show ${
                            orgGroupId === orgGroup.id ? "active" : ""
                          }`}
                          aria-labelledby={`ranking_tab_${orgGroup.id}`}
                        >
                          <DataValidationContainer
                            noDataView={
                              <span className="d-block w-100 mt-4 mb-4 text-dark-75 font-size-lg font-weight-normal text-center">
                                데이터가 없습니다.
                              </span>
                            }
                          >
                            {rankerData?.map(
                              ({ feedbackReceived, user, rank }) => (
                                <TopRankerItem
                                  key={user?.id}
                                  rank={rank}
                                  feedbackReceived={feedbackReceived}
                                  user={user}
                                  topFeedbackReceived={
                                    rankerData[0].feedbackReceived
                                  }
                                />
                              )
                            )}
                          </DataValidationContainer>
                        </div>
                      );
                    })
                  : QuerterGroup?.map(({ data: rankerData, orgGroup }) => {
                      return (
                        <div
                          key={orgGroup?.id}
                          className={`tab-pane fade show ${
                            orgGroupId === orgGroup.id ? " active" : ""
                          }`}
                          id={`ranking_tab_${orgGroup.id}`}
                          role="tabpanel"
                          aria-labelledby={`ranking_tab_${orgGroup.id}`}
                        >
                          <DataValidationContainer
                            noDataView={
                              <span className="d-block w-100 mt-4 mb-4 text-dark-75 font-size-lg font-weight-normal text-center">
                                데이터가 없습니다.
                              </span>
                            }
                          >
                            {rankerData?.map(
                              ({ feedbackReceived, user, rank }) => (
                                <TopRankerItem
                                  key={user?.id}
                                  rank={rank}
                                  feedbackReceived={feedbackReceived}
                                  user={user}
                                  topFeedbackReceived={
                                    rankerData[0].feedbackReceived
                                  }
                                />
                              )
                            )}
                          </DataValidationContainer>
                        </div>
                      );
                    })}
              </DataValidationContainer>
            </div>
          </div>
        </div>
        <SearchList text={searchText} />
      </div>
    </div>
  );
}
