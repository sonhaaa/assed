import * as React from "react"

function RightArrow(props) {
	return (
		<div style={{
			marginRight: `${props.marginRight}px`
		}}>
			<svg
				width={props.width}
				height='auto'
				viewBox="0 0 34 21"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<path
				d="M2 10.627h29m0 0L21.333 2M31 10.627L21.333 19"
				stroke="#fff"
				strokeWidth={3}
				strokeLinecap="round"
				/>
			</svg>  
		</div>
		
	)
}

export default RightArrow