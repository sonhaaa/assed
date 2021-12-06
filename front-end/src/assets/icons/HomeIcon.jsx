import React from "react";

function HomeIcon(props) {
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
        d="M9.402 3.438L4.287 7.424c-.854.664-1.547 2.078-1.547 3.15v7.033c0 2.201 1.794 4.005 3.996 4.005h10.99a4.008 4.008 0 003.995-3.996v-6.909c0-1.148-.769-2.62-1.709-3.274l-5.864-4.11c-1.33-.93-3.464-.882-4.746.115zM12.23 17.816v-2.848"
      ></path>
    </svg>
  );
}

export default HomeIcon;