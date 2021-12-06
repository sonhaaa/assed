import React from "react";

function SettingIcon(props) {
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
        strokeMiterlimit="10"
        strokeWidth="1.424"
        d="M12.23 14.803a2.847 2.847 0 100-5.695 2.847 2.847 0 000 5.695z"
      ></path>
      <path
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.424"
        d="M2.74 12.79v-1.67c0-.987.807-1.803 1.803-1.803 1.718 0 2.42-1.215 1.557-2.705a1.802 1.802 0 01.664-2.458l1.642-.94c.75-.445 1.718-.18 2.164.57l.104.18c.854 1.49 2.259 1.49 3.122 0l.105-.18c.446-.75 1.414-1.015 2.164-.57l1.641.94a1.802 1.802 0 01.665 2.458c-.864 1.49-.162 2.705 1.556 2.705.987 0 1.803.807 1.803 1.803v1.67c0 .988-.806 1.804-1.803 1.804-1.718 0-2.42 1.215-1.556 2.705a1.8 1.8 0 01-.665 2.457l-1.641.94c-.75.446-1.718.18-2.164-.57l-.105-.18c-.854-1.49-2.258-1.49-3.122 0l-.104.18c-.446.75-1.414 1.016-2.164.57l-1.642-.94A1.802 1.802 0 016.1 17.3c.863-1.49.161-2.705-1.557-2.705A1.808 1.808 0 012.74 12.79z"
      ></path>
    </svg>
  );
}

export default SettingIcon;
