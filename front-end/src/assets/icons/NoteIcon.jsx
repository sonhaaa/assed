import React from "react";

function NoteIcon(props) {
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
        d="M21.398 10.168l-.93 3.967c-.798 3.426-2.373 4.812-5.334 4.527a9.979 9.979 0 01-1.537-.256l-1.595-.38c-3.957-.94-5.181-2.894-4.251-6.861l.93-3.977c.19-.806.417-1.509.702-2.088 1.11-2.296 2.999-2.913 6.169-2.163l1.585.37c3.976.93 5.19 2.894 4.26 6.861z"
      ></path>
      <path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.424"
        d="M15.134 18.662c-.588.399-1.329.73-2.23 1.025l-1.5.493c-3.767 1.215-5.75.2-6.975-3.568l-1.215-3.748C2 9.096 3.006 7.103 6.774 5.888l1.499-.493c.389-.124.759-.228 1.11-.295-.285.58-.512 1.282-.702 2.088l-.93 3.977c-.93 3.967.294 5.922 4.251 6.861l1.595.38c.55.133 1.063.218 1.537.256zM12.838 8.356l4.603 1.167M11.908 12.028l2.752.703"
      ></path>
    </svg>
  );
}

export default NoteIcon;
