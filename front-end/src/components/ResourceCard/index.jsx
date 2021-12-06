import React from 'react'
import './styles.scss'

export default function ResourceCard({image, icon, title}) {
    return (
        <div className="resources-card">
            <img src={image} alt="" className="resources-card__image" />
            <p className="resources-card__title">{title} <img src={icon} alt="" className="resources-card__title__icon"/></p>                            
        </div>
    )
}
