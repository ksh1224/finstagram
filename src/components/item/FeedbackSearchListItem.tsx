import Profile from "components/Profile";
import { useModal } from "hooks/useRedux";
import React, { useEffect } from "react";

type SearchListItemType = {
  user?: {
    id?: number;
    username?: string;
    name?: string;
    profileImageUrl?: string;
    organization?: { name?: string };
    organizationName?: string;
    nickname?: string;
    position?: string;
  };
};
export default function SearchListItem({ user }: SearchListItemType) {
  const {
    id,
    name,
    nickname,
    organizationName,
    profileImageUrl,
    position,
  } = user!;
  const { showModal } = useModal();
  return (
    <>
      <div className="d-flex align-items-center my-5">
        <div className="avatar symbol symbol-50 cursor-pointer">
          <Profile user={user} />
        </div>
        <div className="w-100px flex-grow-1 ml-5">
          <div className="font-weight-bolder text-dark-75 font-size-lg">
            {`${position} ${name}(${nickname})`}
          </div>
          <div className="text-dark-50 m-0 flex-grow-1 font-size-sm mt-1">
            {organizationName}
          </div>
        </div>
        <div>
          <a
            className="btn btn-text-dark-50 btn-icon-gray btn-hover-icon-primary text-hover-primary btn-sm d-block text-left p-0 d-flex align-items-center"
            href="javascript:;"
            data-toggle="modal"
            data-target="#modal_sendFeedback"
            onClick={() => showModal("sendFeedback", user)}
          >
            <span className="svg-icon svg-icon-md mr-3">
              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <rect x="0" y="0" width="24" height="24" />
                  <path
                    d="M5,9 L19,9 C20.1045695,9 21,9.8954305 21,11 L21,20 C21,21.1045695 20.1045695,22 19,22 L5,22 C3.8954305,22 3,21.1045695 3,20 L3,11 C3,9.8954305 3.8954305,9 5,9 Z M18.1444251,10.8396467 L12,14.1481833 L5.85557487,10.8396467 C5.4908718,10.6432681 5.03602525,10.7797221 4.83964668,11.1444251 C4.6432681,11.5091282 4.77972206,11.9639747 5.14442513,12.1603533 L11.6444251,15.6603533 C11.8664074,15.7798822 12.1335926,15.7798822 12.3555749,15.6603533 L18.8555749,12.1603533 C19.2202779,11.9639747 19.3567319,11.5091282 19.1603533,11.1444251 C18.9639747,10.7797221 18.5091282,10.6432681 18.1444251,10.8396467 Z"
                    fill="#000000"
                  />
                  <path
                    d="M11.1288761,0.733697713 L11.1288761,2.69017121 L9.12120481,2.69017121 C8.84506244,2.69017121 8.62120481,2.91402884 8.62120481,3.19017121 L8.62120481,4.21346991 C8.62120481,4.48961229 8.84506244,4.71346991 9.12120481,4.71346991 L11.1288761,4.71346991 L11.1288761,6.66994341 C11.1288761,6.94608579 11.3527337,7.16994341 11.6288761,7.16994341 C11.7471877,7.16994341 11.8616664,7.12798964 11.951961,7.05154023 L15.4576222,4.08341738 C15.6683723,3.90498251 15.6945689,3.58948575 15.5161341,3.37873564 C15.4982803,3.35764848 15.4787093,3.33807751 15.4576222,3.32022374 L11.951961,0.352100892 C11.7412109,0.173666017 11.4257142,0.199862688 11.2472793,0.410612793 C11.1708299,0.500907473 11.1288761,0.615386087 11.1288761,0.733697713 Z"
                    fill="#000000"
                    fillRule="nonzero"
                    opacity="0.3"
                    transform="translate(11.959697, 3.661508) rotate(-90.000000) translate(-11.959697, -3.661508) "
                  />
                </g>
              </svg>
            </span>
            피드백 보내기
          </a>
          <a
            className="btn btn-text-dark-50 btn-icon-gray btn-hover-icon-primary text-hover-primary btn-sm d-block text-left p-0 mt-2 d-flex align-items-center"
            href="javascript:;"
            data-toggle="modal"
            data-target="#modal_requestFeedback"
            onClick={() => showModal("requestFeedback", user)}
          >
            <span className="svg-icon svg-icon-md mr-3">
              <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <rect x="0" y="0" width="24" height="24" />
                  <path
                    d="M5,9 L19,9 C20.1045695,9 21,9.8954305 21,11 L21,20 C21,21.1045695 20.1045695,22 19,22 L5,22 C3.8954305,22 3,21.1045695 3,20 L3,11 C3,9.8954305 3.8954305,9 5,9 Z M18.1444251,10.8396467 L12,14.1481833 L5.85557487,10.8396467 C5.4908718,10.6432681 5.03602525,10.7797221 4.83964668,11.1444251 C4.6432681,11.5091282 4.77972206,11.9639747 5.14442513,12.1603533 L11.6444251,15.6603533 C11.8664074,15.7798822 12.1335926,15.7798822 12.3555749,15.6603533 L18.8555749,12.1603533 C19.2202779,11.9639747 19.3567319,11.5091282 19.1603533,11.1444251 C18.9639747,10.7797221 18.5091282,10.6432681 18.1444251,10.8396467 Z"
                    fill="#000000"
                  />
                  <path
                    d="M11.1288761,0.733697713 L11.1288761,2.69017121 L9.12120481,2.69017121 C8.84506244,2.69017121 8.62120481,2.91402884 8.62120481,3.19017121 L8.62120481,4.21346991 C8.62120481,4.48961229 8.84506244,4.71346991 9.12120481,4.71346991 L11.1288761,4.71346991 L11.1288761,6.66994341 C11.1288761,6.94608579 11.3527337,7.16994341 11.6288761,7.16994341 C11.7471877,7.16994341 11.8616664,7.12798964 11.951961,7.05154023 L15.4576222,4.08341738 C15.6683723,3.90498251 15.6945689,3.58948575 15.5161341,3.37873564 C15.4982803,3.35764848 15.4787093,3.33807751 15.4576222,3.32022374 L11.951961,0.352100892 C11.7412109,0.173666017 11.4257142,0.199862688 11.2472793,0.410612793 C11.1708299,0.500907473 11.1288761,0.615386087 11.1288761,0.733697713 Z"
                    fill="#000000"
                    fillRule="nonzero"
                    opacity="0.3"
                    transform="translate(11.959697, 3.661508) rotate(-270.000000) translate(-11.959697, -3.661508) "
                  />
                </g>
              </svg>
            </span>
            피드백 요청하기
          </a>
        </div>
      </div>
      <div className="separator separator-solid my-6" />
    </>
  );
}

SearchListItem.defaultProps = {
  user: {},
};
