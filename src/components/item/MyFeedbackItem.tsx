import React from "react";

export default function MyFeedbackItem() {
  // iterate
  return (
    <>
      <div className="d-inline-block text-center" style={{ minWidth: "16.2%" }}>
        {/* <!--begin::Feedback Icon
                                        추가된 class 
                                            - '.feedback-icon' : position-relative hover-on d-inline-block cursor-pointer
                                            - 'svg' : w-65px h-65px bg-white border border-light-dark rounded-circle
                                        활성시에 .feedback-icon에 class 'on' 추가
                                    --> */}
        <span
          className="feedback-icon hover-on"
          data-toggle="layer"
          data-target="#layer_myBadgeFeedback"
        >
          <svg
            className="w-65px h-65px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 90"
          >
            <g>
              <path
                className="fill-em2 stroke-none"
                d="M23.53,53.52V38.84H20.47a1.3,1.3,0,0,1-.9-.22,1.13,1.13,0,0,1-.3-.91V35.62H32v2.09a1.11,1.11,0,0,1-.3.87,1.33,1.33,0,0,1-.9.26H27.72V52.07a1.26,1.26,0,0,1-.49,1,1.83,1.83,0,0,1-1.16.41Z"
              />
              <path
                className="fill-em2 stroke-none"
                d="M43.27,46.88A8.17,8.17,0,0,1,42,52a5.38,5.38,0,0,1-4.36,1.63A5.27,5.27,0,0,1,33.36,52,7.84,7.84,0,0,1,32,46.88q0-3.45,1.5-5.07a5.35,5.35,0,0,1,4.12-1.62,5.33,5.33,0,0,1,4.13,1.62A7.35,7.35,0,0,1,43.27,46.88Zm-4.15,0a6.56,6.56,0,0,0-.44-2.81c-.28-.56-.63-.84-1-.84a1.16,1.16,0,0,0-1,.84,6.73,6.73,0,0,0-.42,2.81,7.24,7.24,0,0,0,.4,2.73c.26.65.62,1,1.07,1s.85-.32,1.1-1a7.85,7.85,0,0,0,.24-2.73Z"
              />
              <path
                className="fill-em2 stroke-none"
                d="M45.54,40.83V37h4.15v3.87H51.8v1.49a1.09,1.09,0,0,1-.3.86,1.33,1.33,0,0,1-.9.27h-.91v6.17a1.46,1.46,0,0,0,.19.82.59.59,0,0,0,.51.28H51.8v1.73a1.11,1.11,0,0,1-.3.87,1.33,1.33,0,0,1-.9.27h-1a4,4,0,0,1-3-1.06,3.69,3.69,0,0,1-1-2.72V43.45h-.09a1.24,1.24,0,0,1-.89-.27,1.08,1.08,0,0,1-.35-.86V40.83Z"
              />
              <path
                className="fill-em2 stroke-none"
                d="M60.33,53.48c0-.16-.08-.24-.11-.25h0l-.68.2a5.53,5.53,0,0,1-1.67.19,4.63,4.63,0,0,1-3.5-1.18,4.11,4.11,0,0,1-1.11-3,4,4,0,0,1,1.13-2.82,4.69,4.69,0,0,1,3.52-1.21H60.1V45a2.53,2.53,0,0,0-.36-1.42,1.1,1.1,0,0,0-.92-.53,1.4,1.4,0,0,0-.86.3,1.69,1.69,0,0,0-.55,1.09h-4a3.82,3.82,0,0,1,1.66-3.12,6.53,6.53,0,0,1,7.68.22,4.35,4.35,0,0,1,1.52,3.26v6.28a9.24,9.24,0,0,0,0,1.17c.05.4.09.79.16,1.19Zm-.23-5.65H58.36a1,1,0,0,0-.71.43,1.68,1.68,0,0,0-.34,1.1,1.52,1.52,0,0,0,.35,1.08,1,1,0,0,0,.74.37,1.55,1.55,0,0,0,1.24-.53,2.57,2.57,0,0,0,.46-1.7Z"
              />
              <path
                className="fill-em2 stroke-none"
                d="M66.55,53.52V35.72h4.19V52.07a1.26,1.26,0,0,1-.49,1,1.83,1.83,0,0,1-1.16.41Z"
              />
            </g>
          </svg>
          {/* <!--begin::Number Badge
                                            - 비활성화 class : bg-light-light border border-light-dark
                                            - 활성화 class : bg-light-primary label-outline-primary
                                        --> */}
          {/* <!-- <span class="position-absolute bottom-0 right-0 label label-lg bg-light-primary label-outline-primary mr-n1 mb-1">8</span> --> */}
          <span className="badge label label-lg">8</span>
        </span>
      </div>

      <div className="d-inline-block text-center" style={{ minWidth: "16.2%" }}>
        <span
          className="feedback-icon hover-on text-center cursor-pointer"
          data-toggle="layer"
          data-target="#layer_myBadgeFeedback"
        >
          <svg
            className="w-65px h-65px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 90"
          >
            <g>
              <path d="M60.85,91.48H30.91V81.25A44.92,44.92,0,0,1,24,64.85a80.4,80.4,0,0,1-1.17-16.92L10.15,21.46a3.66,3.66,0,0,1,2.35-4,6.62,6.62,0,0,1,5.4,0L30.41,37.73s2.67-4.08,6.14-3.35a15.89,15.89,0,0,1,5.35,2,7,7,0,0,1,6.62-4.21c5,.08,5.89,2.66,5.89,2.66a9.73,9.73,0,0,1,6.76-1.76,7.34,7.34,0,0,1,5.1,3.61V51.11s6.09,3.28,6.25,8.84S70.35,70.58,62,78.07l-1.44,1.77Z" />
              <path
                className="stroke-em"
                d="M30.91,91.48V81.25s-6.63-8.83-7.12-18.4-1-14.92-1-14.92L10.54,22.38a3.52,3.52,0,0,1-.34-2.09,4,4,0,0,1,2.3-2.85A5.33,5.33,0,0,1,17.12,17a2.31,2.31,0,0,1,1.1.95L30.91,38.55"
              />
              <path d="M54,48.49V37s-.24-3.92,6.14-3.92,6.13,4.58,6.13,4.58l0,12.6" />
              <path d="M42.4,59.57s-.69,3-5.72,3a6.89,6.89,0,0,1-4.81-1.47,3.08,3.08,0,0,1-1-2.27V38.2a2.54,2.54,0,0,1,.7-1.76,6.74,6.74,0,0,1,4.94-2.06,7.07,7.07,0,0,1,5.65,2.33" />
              <path d="M42.2,46.65V35.73s1-3.56,6.32-3.56,6,3,6,3" />
              <path d="M42.49,55v6.14s-.05,3.31,5.72,3.31,6.34-4.72,6.34-4.72" />
              <path d="M60.61,91.48v-11s8.59-9.45,10.3-12.76,2.34-5.16,1.35-9a11.11,11.11,0,0,0-3.92-6.51A22.52,22.52,0,0,0,63.43,50L42.2,46.65s-3.07-.37-3.68,3.19,2.94,4.86,2.94,4.86l11.78,3.36L57.91,64,47,74" />
            </g>
          </svg>
          <span className="position-absolute bottom-0 right-0 label label-lg bg-light-light border border-light-dark mr-n2 mb-1">
            8
          </span>
        </span>
      </div>

      <div className="d-inline-block text-center" style={{ minWidth: "16.2%" }}>
        <span className="feedback-icon hover-on text-center cursor-pointer">
          <svg
            className="w-65px h-65px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 90"
          >
            <g>
              <polygon points="45.09 19.42 19.65 40.58 45.09 58.87 70.54 40.58 45.09 19.42" />
              <polygon
                className="stroke-em"
                points="62.73 45.65 62.73 26.61 27.77 26.61 27.77 45.65 45.09 57.1 62.73 45.65"
              />
              <polygon points="70.54 40.58 70.54 68.86 19.65 68.86 19.65 40.58 45.09 57.1 70.54 40.58" />
              <line x1="19.65" y1="68.86" x2="37.38" y2="52.09" />
              <line x1="52.81" y1="52.09" x2="70.54" y2="68.86" />
              <line
                className="stroke-em"
                x1="33.9"
                y1="33.66"
                x2="56.28"
                y2="33.66"
              />
              <line
                className="stroke-em"
                x1="33.9"
                y1="39.14"
                x2="56.28"
                y2="39.14"
              />
              <line
                className="stroke-em"
                x1="33.9"
                y1="44.63"
                x2="47.17"
                y2="44.63"
              />
              <line x1="61.67" y1="22.03" x2="61.67" y2="15.22" />
              <line x1="56.73" y1="22.03" x2="56.73" y2="10.82" />
              <line x1="28.72" y1="22.03" x2="28.72" y2="15.22" />
              <line x1="33.66" y1="22.03" x2="33.66" y2="10.82" />
            </g>
          </svg>
        </span>
      </div>

      <div className="d-inline-block text-center" style={{ minWidth: "16.2%" }}>
        <span className="feedback-icon hover-on text-center cursor-pointer">
          <svg
            className="w-65px h-65px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 90"
          >
            <g>
              <path
                className="stroke-none fill-em"
                d="M66.19,29.88c-1.92-4.07-5.67-7.69-10.64-7.69a12,12,0,0,0-10.46,6.13,12,12,0,0,0-10.45-6.13c-5,0-8.72,3.62-10.65,7.69,8.74.34,15.73,8.12,15.73,17.69V59.36c1.69,1.53,3.15,2.87,4.12,3.76a1.83,1.83,0,0,0,2.5,0l4.12-3.76V47.57C50.46,38,57.45,30.22,66.19,29.88Z"
              />
              <path d="M68.38,44.46h6.47c5.53,0,10-4.86,10-10.86v-.9a2.74,2.74,0,0,0-2.63-2.85H66.78c-9,0-16.32,7.93-16.32,17.72v15a6.39,6.39,0,0,0,6.12,6.64h0a6.39,6.39,0,0,0,6.11-6.64h0a.33.33,0,0,1,.31-.34l5.62-.11c4.26-.05,7.68-2.57,7.68-7.2h0a1,1,0,0,0-1-1H68.84" />
              <path d="M67.94,44.46H78.76c1.64,0,1.53,1.37,1.53,1.37,0,4.44-2.77,8-6.2,8H64.44" />
              <path d="M21.8,44.46H15.33c-5.52,0-10-4.86-10-10.86v-.9A2.74,2.74,0,0,1,8,29.85H23.41c9,0,16.31,7.93,16.31,17.72v15a6.39,6.39,0,0,1-6.11,6.64h0a6.39,6.39,0,0,1-6.11-6.64h0a.33.33,0,0,0-.32-.34l-5.61-.11c-4.26-.05-7.69-2.57-7.69-7.2h0a1,1,0,0,1,1.06-1h6.4" />
              <path d="M22.24,44.46H11.42c-1.63,0-1.53,1.37-1.53,1.37,0,4.44,2.78,8,6.2,8h9.65" />
              <path
                className="stroke-none fill-em blend-darken"
                d="M24,29.88a14.18,14.18,0,0,0-1.44,5.88c0,5.59,2.5,10.37,8.37,15.62,2.77,2.49,6.08,5.49,8.8,8V47.57C39.72,38,32.73,30.22,24,29.88Z"
              />
              <path
                className="stroke-none fill-em blend-darken"
                d="M67.63,35.76a14.18,14.18,0,0,0-1.44-5.88c-8.74.34-15.73,8.12-15.73,17.69V59.36c2.72-2.49,6-5.49,8.8-8C65.13,46.13,67.63,41.35,67.63,35.76Z"
              />
            </g>
          </svg>
        </span>
      </div>

      <div className="d-inline-block text-center" style={{ minWidth: "16.2%" }}>
        <span className="feedback-icon hover-on text-center cursor-pointer">
          <svg
            className="w-65px h-65px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 90"
          >
            <g>
              <path
                className="fill-none"
                d="M14.35,45.26a30.5,30.5,0,0,1,30.5-30.5"
              />
              <polyline points="40.7 11.52 44.84 14.76 41.6 18.9" />
              <path
                className="fill-none"
                d="M60.23,18.93a30.49,30.49,0,0,1,11,41.72"
              />
              <polyline points="76.07 58.72 71.18 60.65 69.24 55.76" />
              <path
                className="fill-none"
                d="M59.82,71.84A30.51,30.51,0,0,1,18.27,60.23"
              />
              <polyline points="17.48 65.44 18.27 60.23 23.47 61.03" />
              <polygon points="66.87 62.83 61.44 62.83 66.87 67.67 72.31 62.83 66.87 62.83" />
              <polygon points="72.31 62.83 72.31 69.8 61.44 69.8 61.44 62.83 66.87 67.29 72.31 62.83" />
              <line x1="61.44" y1="69.8" x2="65.22" y2="66.22" />
              <line x1="68.52" y1="66.22" x2="72.31" y2="69.8" />
              <ellipse cx="51.21" cy="40.13" rx="3.41" ry="3.98" />
              <path d="M47.36,55.68v-5a6.71,6.71,0,0,0-1-3.44,6.07,6.07,0,0,1,3.44-1.07h3a6.1,6.1,0,0,1,6.1,6.1v3.44" />
              <circle
                className="stroke-none fill-dark"
                cx="51.21"
                cy="49.4"
                r="0.58"
              />
              <circle
                className="stroke-none fill-dark"
                cx="51.21"
                cy="52.62"
                r="0.58"
              />
              <polyline points="56.88 51.92 55.83 52.28 55.83 55.68" />
              <ellipse
                className="stroke-em"
                cx="39.06"
                cy="37.53"
                rx="3.66"
                ry="4.27"
              />
              <path
                className="stroke-em"
                d="M47.36,57.27V50.65A6.67,6.67,0,0,0,40.69,44H37.43a6.67,6.67,0,0,0-6.67,6.67v6.62"
              />
              <circle
                className="fill-em2 stroke-none"
                cx="39.06"
                cy="47.67"
                r="0.58"
              />
              <circle
                className="fill-em2 stroke-none"
                cx="39.06"
                cy="51.13"
                r="0.58"
              />
              <polyline
                className="stroke-em"
                points="32.97 50.19 34.1 50.61 34.1 57.27"
              />
              <polyline
                className="stroke-em"
                points="45.16 50.19 44.02 50.61 44.02 57.27"
              />
              <rect x="8.01" y="48.44" width="13.7" height="8.61" rx="2.6" />
              <circle cx="11.02" cy="52.75" r="0.58" />
              <circle cx="14.95" cy="52.75" r="0.58" />
              <circle cx="18.7" cy="52.75" r="0.58" />
              <path d="M50.43,23h4.46V20.08H50.43Z" />
              <path d="M56,17a4.79,4.79,0,0,0,1.47-3.46,4.84,4.84,0,0,0-9.68,0A4.79,4.79,0,0,0,49.29,17a5.07,5.07,0,0,1,1.14,2.73v.37h4.46v-.37A5.07,5.07,0,0,1,56,17Z" />
              <line x1="52.66" y1="14.41" x2="52.66" y2="19.84" />
              <line x1="50.98" y1="14.37" x2="54.34" y2="14.37" />
            </g>
          </svg>
        </span>
      </div>

      <div className="d-inline-block text-center" style={{ minWidth: "16.2%" }}>
        <span className="feedback-icon hover-on text-center cursor-pointer">
          <svg
            className="w-65px h-65px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 90 90"
          >
            <g>
              <circle cx="45.21" cy="45" r="27.9" />
              <path
                className="fill-em stroke-em"
                d="M60.66,50.27c0,6.6-6.92,11.95-15.45,11.95S29.76,56.87,29.76,50.27Z"
              />
              <circle
                className="fill-dark stroke-none"
                cx="34.53"
                cy="40.15"
                r="2.38"
              />
              <circle
                className="fill-dark stroke-none"
                cx="54.52"
                cy="40.15"
                r="2.38"
              />
            </g>
          </svg>
        </span>
      </div>
    </>
  );
}
