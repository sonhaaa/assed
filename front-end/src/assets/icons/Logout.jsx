import * as React from "react"

function Logout(props) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.043 9.475l-2.428 2.428 2.428 2.429M14.33 11.903H4.683M12.433 4.372c4.192 0 7.588 2.845 7.588 7.588s-3.396 7.59-7.588 7.59"
        stroke={props.color}
        strokeWidth={1.42292}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Logout
