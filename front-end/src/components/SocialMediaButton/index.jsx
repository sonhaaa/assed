import React from 'react'
import { COLORS } from '../../constants/colors'
import './styles.scss'

export default function SocialMediaButton(props) {
    return (
        <div 
            style={{
                width: `${props.width}px`,
                height: `${props.height}px`,
                borderRadius: '10px',
                display: 'flex',
                cursor: "pointer"
            }}
            className="social-media-button">
            
            <img src={props.icon} className="social-media-button__icon" alt="Social media" />

            <span style={{
                fontFamily: "SamsungMedium",
                fontSize: '0.8em',
                color: `${COLORS.BLACK}`,
                letterSpacing: '0.04em',
                textAlign: 'left',
                marginTop: "2px",
                marginLeft: 16
            }}>{props.text}</span>
            
        </div>
    )
}
