import React from "react";

function StudentIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.424"
        d="M10.38 3.315l-5.713 3.73c-1.832 1.195-1.832 3.872 0 5.067l5.713 3.73c1.025.674 2.714.674 3.739 0l5.685-3.73c1.822-1.195 1.822-3.862 0-5.058l-5.685-3.73c-1.025-.683-2.714-.683-3.74-.01z"
      ></path>
      <path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.424"
        d="M6.183 13.327l-.01 4.451c0 1.205.93 2.496 2.07 2.876l3.027 1.006c.522.17 1.386.17 1.917 0l3.028-1.006c1.138-.38 2.068-1.67 2.068-2.876v-4.403M21.15 15.15V9.454"
      ></path>
    </svg>
  );
}

export default StudentIcon;
