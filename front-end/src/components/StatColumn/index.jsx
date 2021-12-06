import React from 'react'
import './styles.scss'
import chartPopup from '../../assets/icons/chart-popup.png'
import { COLORS } from '../../constants/colors'

export default function StatColumn({title, total, numOfTotal}) {
    const showPopUp = () => {
        document.getElementById(`scores-stats__item__popup__${title}`).style.opacity = 1
        document.getElementById(`scores-stats__item__scores__${title}`).style.color = COLORS.BLACK
    }

    const closePopUp = () => {
        document.getElementById(`scores-stats__item__popup__${title}`).style.opacity = 0
        document.getElementById(`scores-stats__item__scores__${title}`).style.color = COLORS.GREY_700
    }

    return (
        <div className="scores-stats__item">
            <div className="scores-stats__item__popup" id={`scores-stats__item__popup__${title}`}>
                <img src={chartPopup} alt="" />
                <p className="scores-stats__item__popup__num">{numOfTotal}</p>
            </div>
            <div className="scores-stats__item__col" onMouseOver={showPopUp} onMouseLeave={closePopUp} style={{ height: (numOfTotal * 140)/total }}/>
            <p className="scores-stats__item__scores" id={`scores-stats__item__scores__${title}`}>{title}</p>
        </div>
    )
}
