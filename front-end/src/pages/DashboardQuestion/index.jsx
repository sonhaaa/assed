import React, { useState, useEffect } from 'react'
import './styles.scss'
import SearchBar from '../../components/SearchBar'
import plusIcon from '../../assets/icons/plus-icon.png'
import QuestionSetCard from '../../components/QuestionSetCard'
import editIcon from '../../assets/icons/edit.png'
import deleteIcon from '../../assets/icons/trash.png'
import { COLORS } from '../../constants/colors'

export default function DashboardQuestion() {
    const [questionSetList, setQuestionSetList] = useState()
    const [questionList, setQuestionList] = useState([
        // {id: 1, title: "Who is NSH 1?", referenceAnswer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"},
        // {id: 2, title: "Who is NSH 2?", referenceAnswer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"},
    ])
    const [isCreateQuestion, setIsCreateQuestion] = useState(false)
    const [isAddQuestion, setIsAddQuestion] = useState(false)
    const [questionTitle, setQuestionTitle] = useState("")
    const [questionReferenceAnswer, setQuestionReferenceAnswer] = useState("")
    
    const teacherId = localStorage.getItem("teacherId")

    const questionSetFilter = (data) => {
        let questionData = data.filter(item => item.teacherId === teacherId)
        let dataTemp = []
        for (let index = 0; index < questionData.length; index++) {
            dataTemp.push(questionData[index])
        }
        setQuestionSetList(() => dataTemp)
    }

    useEffect(() => {
        fetch(`http://localhost:5000/api/questionsets`)
        .then(res => res.json())
        .then(data => questionSetFilter(data))
    }, [])

    console.log(questionSetList)

    const QuestionSet = () => ( 
        <div className="dashboard-question__main__section__content">
            {questionSetList?.map((item, index) => (
                <QuestionSetCard 
                    key={index} 
                    title={item.questionSetName} 
                    date={`${new Date(parseInt(item.questionSetDay)).getDate()}/${new Date(parseInt(item.questionSetDay)).getMonth()}/${new Date(parseInt(item.questionSetDay)).getFullYear()}`} 
                    time={item.questionSetTime} 
                    numOfQuestion={item.questionSetNumberOfQuestion} 
                    studentJoined={`${25}/${30}`} />
            ))}
        </div>
    )

    const QuestionCreate = () => (
        <div className="dashboard-question__main__section__question-create">
            <div className="dashboard-question__main__section__question-create__question-set-create">
                <input type="text" placeholder="Question Set title" style={{width: 528 - 48}} />
                <input type="text" placeholder="Class" style={{ width: 169 - 48, marginLeft: 12}} />
                <input type="text" placeholder="Subject" style={{ width: 232 - 48}} />
                <input type="text" placeholder="Type" style={{ width: 152 - 48, marginLeft: 12 }} />
                <input type="text" placeholder="Time" style={{ width: 140 - 48,  marginLeft: 12}} />
            </div>
            
            <div className="dashboard-question__main__section__question-create__question">
                {questionList?.map((item, index) => (
                    <QuestionCard key={index} title={item.title} referenceAnswer={item.referenceAnswer} index={index}/>
                ))}
                {isAddQuestion ? <CreateQuestionCard /> : null }
                <AddQuestionButton />
            </div>
        </div>
    )

    const editQuestionCard = ({index}) => {
        document.getElementById(`question-card__title__${index}`).contentEditable = true
        document.getElementById(`question-card__reference-answer__${index}`).contentEditable = true
    }

    const QuestionCard = ({title, referenceAnswer, index}) => (
        <div className="question-card">
            <img src={editIcon} alt="Edit question icon" onClick={() => editQuestionCard({index})} />
            <img src={deleteIcon} alt="Delete question icon" />
            <p className="question-card__question-label">Question {index + 1}</p>
            <div className="question-card__title" id={`question-card__title__${index}`}>{title}?</div>
            <p className="question-card__question-label">Reference answer: </p>
            <div className="question-card__reference-answer" id={`question-card__reference-answer__${index}`}>{referenceAnswer}</div>
        </div>
    )

    const autoIncreaseHeight = () => {
        document.getElementById("create-question-card__reference-answer").style.height = "1px"
        document.getElementById("create-question-card__reference-answer").style.height = (document.getElementById("create-question-card__reference-answer").scrollHeight) + "px";
    }

    const addQuestion = () => {
        let newItem = {
            id: questionList.length + 1, 
            title: document.getElementById("create-question-card__title").value,
            referenceAnswer: document.getElementById("create-question-card__reference-answer").value,
        }
        console.log(newItem)
        setQuestionList(() => [...questionList, newItem])
    }

    const CreateQuestionCard = () => (
        <div className="create-question-card">
            <input type="text" placeholder="Question title" id="create-question-card__title"/>
            <textarea rows="1" onChange={autoIncreaseHeight} id="create-question-card__reference-answer"></textarea>
            <div style={{display: "flex"}}>
                <div className="create-question-card__button" onClick={addQuestion}>
                    <p>Add</p>
                </div>
                <div className="create-question-card__button" style={{ background: 'transparent' }} onClick={() => setIsAddQuestion(false)}>
                    <p style={{ color: COLORS.BLACK }}>Cancel</p>
                </div>
            </div>
        </div>
    )

    const AddQuestionButton = () => (
        <div className="add-question-button" onClick={() => setIsAddQuestion(true)}>
            <img src={plusIcon} alt="" />
            <p>Add question</p>
        </div>
    )

    return (
        <div className="dashboard-question">
            <div className="dashboard-question__main">
                <SearchBar />
                <section className="dashboard-question__main__section">
                    <div className="dashboard-question__main__section__head">
                        <h2 className="dashboard-question__main__section__head__title">Question Sets {}</h2>
                        <div className="dashboard-question__main__section__head__button" onClick={() => setIsCreateQuestion(true)}>
                            <p>Create</p>
                        </div>
                    </div>
                    {isCreateQuestion ? <QuestionCreate /> : <QuestionSet />}
                    
                </section>
            </div>
        </div>
    )
}



