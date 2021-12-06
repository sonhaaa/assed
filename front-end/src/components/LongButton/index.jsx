import React from 'react'
import './styles.scss'
import { COLORS } from '../../constants/colors'
import RightArrow from '../../assets/icons/RightArrow'


export default function LongButton(props) {
    return (
        <div 
            style={{
                width: `${props.width}px`,
                height: `${props.height}px`,
                background: `linear-gradient(91.82deg, ${COLORS.BLUE_500} 0%, ${COLORS.PURPLE} 100%)`,
                borderRadius: '10px',
                display: 'flex',
                justifyContent: "space-between",
                cursor: "pointer"
            }}
            onClick={props.onClick}
            >

            <span style={{
                fontFamily: "SamsungMedium",
                fontSize: '1em',
                textDecoration: 'none',
                alignSelf: 'center',
                lineHeight: '30px',
                color: `${COLORS.WHITE}`,
                letterSpacing: '0.04em',
                textAlign: 'left',
                paddingLeft: "32px",
                marginTop: "2px"
            }}>{props.text}</span>
            
            <RightArrow width={24} marginRight={32}/>
        </div>
    )
}
