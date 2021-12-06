import React, { useEffect, useState } from 'react'
import SearchBar from '../../components/SearchBar'
import './styles.scss'

export default function DashboardStudent() {
    let isExpand = false

    const toggleExpand = index => {
        isExpand = !isExpand
        isExpand ? document.getElementById(`student-result-card__${index}`).classList.add('card-expand') 
        : document.getElementById(`student-result-card__${index}`).classList.remove('card-expand')
    }

    const StudentResultCard = ({index}) => {
        return (
            <div className="student-result-card" id={`student-result-card__${index}`} onClick={() => toggleExpand(index)}>
                <p className="student-result-card__name">Nguyen Son Ha</p>
                
                <p className="student-result-card__email">nguyensonha.hanz@gmail.com</p>
                <div className="student-result-card__total-scores-wrapper">
                    <p>8.75</p>
                </div>
                <div style={{height: 16}}></div>
                <QuestionResultCard />
                <QuestionResultCard />
                <QuestionResultCard />
            </div>
        )
    }

    const QuestionResultCard = () => (
        <div className="question-result-card">
            <p>Question 1: <span>Who is NSH?</span></p>
            <div className="question-result-card__answer-with-scores">
                <p className="question-result-card__answer-with-scores__answer">Answer: <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</span></p>
                <div className="question-result-card__answer-with-scores__scores-wrapper">
                    <p className="question-result-card__answer-with-scores__scores-wrapper__scores">8</p>
                </div>
            </div>
        </div>
    )

    return (
        <div className="dashboard-student">
            <div className="dashboard-student__main">
                <SearchBar />
                <section className="dashboard-student__main__section">
                    <div className="dashboard-student__main__section__head">
                        <h2 className="dashboard-student__main__section__head__title">SE1502 - SWP391 - Question Set 1 </h2>
                        <p>35 question • 45 minutes • 25/30 student joined • 30/03/2021 </p>
                    </div>
                    
                    <div className="dashboard-student__main__section__content">
                        <StudentResultCard index={0} />
                        <StudentResultCard index={1} />
                        <StudentResultCard index={2} />
                    </div>
                </section>
            </div>
        </div>
    )
}

