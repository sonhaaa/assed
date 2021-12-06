import React from 'react'
import './styles.scss'

export default function QuestionSetCard({ title, date, numOfQuestion, time, studentJoined, onClick }) {
    return (
        
        <div className="question-sets-card" onClick={onclick}>
            <div className="question-sets-card__header">
                <p className="question-sets-card__header__title">{title}</p>
                <p className="question-sets-card__header__date">{date}</p> 
            </div>
            <div className="question-sets-card__info">
                <p className="question-sets-card__info__text">{numOfQuestion} questions - {time} minutes</p>
            </div>
        </div>

    )
}
