import React, { useEffect, useState } from 'react'
import './styles.scss'
import SearchBar from '../../components/SearchBar'
import Menu, { Item as MenuItem } from 'rc-menu';
import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import dropdownArrow from '../../assets/icons/arrow-down.png'
import bullseye from '../../assets/icons/bullseye.png'
import trophy from '../../assets/icons/trophy.png'
import StatColumn from '../../components/StatColumn'
import partyPopper from '../../assets/icons/party-popper.png'
import StudentItem from '../../components/StudentItem';

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function compare( a, b ) {
    if ( a.scores > b.scores ){
      return -1;
    }
    if ( a.scores < b.scores ){
      return 1;
    }
    return 0;
}

export default function DashboardHome() {
    // const [totalStudent, setTotalStudent] = useState(30)
    // const [scoresStats, setScoresStats] = useState([
    //     {scores: 1, numOfStudent: 4},
    //     {scores: 2, numOfStudent: 6},
    //     {scores: 3, numOfStudent: 1},
    //     {scores: 4, numOfStudent: 5},
    //     {scores: 5, numOfStudent: 30},
    //     {scores: 6, numOfStudent: 7},
    //     {scores: 7, numOfStudent: 9},
    //     {scores: 8, numOfStudent: 1},
    //     {scores: 9, numOfStudent: 2},
    //     {scores: 10, numOfStudent: 4},
    // ])
    // const [studentList, setStudentList] = useState([
    // ])

    // const questionSets = getFromLocalStorage("questionsets")
    // const questions = getFromLocalStorage("questions")
    // const studentResults = getFromLocalStorage("studentResults")

    // console.log("questionset: ", questionSets)
    // // console.log("questionsetchoosed: ", questionSetsChoosed)
    // console.log("questions: ", questions)
    // console.log("studentresult: ", studentResults)

    // const [questionSetsChoosed, setQuestionSetsChoosed] = useState(getFromLocalStorage("questionSetChoosed") || questionSets[0])

    // useEffect(() => {
    //     console.log("use effect quesion set id: ", questionSetsChoosed[0]?.questionSetId)
    //     console.log("question filtered: ", filterQuesionsByQuestionSetId(questionSetsChoosed[0]?.questionSetId))
    //     console.log("student filtered: ", filterStudentByQuesionId(filterQuesionsByQuestionSetId(questionSetsChoosed[0]?.questionSetId)))

    // }, [questionSetsChoosed])

    // const filterQuesionsByQuestionSetId = questionSetId => {
    //     return questions[questionSetId]
    // }

    // const filterStudentByQuesionId = ques => {
    //     let studentArr = []
    //     let studentObject = {
    //         "student1@gmail.com": {
    //             questionId: "3866334105",
    //             studentResultAnswer: "Student Answer for Question ID 3866334105",
    //             studentResultId: "3357413974",
    //             studentResultScores: "7",
    //             studentResultVideoRecord: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    //         }
            
    //     }
    //     ques.forEach(question => {
    //         studentResults[question.questionId].forEach(student => {

    //             if (student.studentResultEmail in studentObject) {
    //                 studentObject[`${student.studentResultId}`].studentResultScores += parseInt(student.studentResultScores)
    //             } else {
    //                 studentObject[student.studentResultEmail] = student
    //             }
                

    //             // for (let index = 0; index < studentArr.length; index++) {
    //             //     const element = studentArr[index];
    //             //     if (element.id === student.studentResultId) {
    //             //         element.scores += parseInt(student.studentResultScores)
    //             //     } 
    //             // }

    //             studentArr.push({ id: student.studentResultId, email: student.studentResultEmail, name: "son ha", scores: parseInt(student.studentResultScores) })
    //         })
    //     })
    //     console.log("student obj: ", studentObject)
    //     setStudentList(studentArr.sort(compare))
    // }

    

    // function onSelect({ key }) {
    //     let questionSetChoosed = questionSets.filter(item => item.questionSetId === key)
    //     localStorage.setItem("questionSetChoosed", JSON.stringify(questionSetChoosed))
    //     setQuestionSetsChoosed(questionSetChoosed)
    // }
    
    // function onVisibleChange(visible) {
    //     console.log(visible);
    // }
    
    // const menuCallback = () => (
    //     <Menu onSelect={onSelect}>
    //         {questionSets.map(item => (
    //             <MenuItem key={item.questionSetId}>{item.questionSetName}</MenuItem>
    //         ))}
    //     </Menu>
    // );

    return (
        <div className="dashboard-home">
            <div className="dashboard-home__main">
                <SearchBar/>
                <section className="dashboard-home__main__section">
                    <div className="dashboard-home__main__section__head">
                        <h2 className="dashboard-home__main__section__head__title">Quick View</h2>
                        
                        <Dropdown
                            trigger={['click']}
                            overlay={menuCallback}
                            animation="slide-up"
                            onVisibleChange={onVisibleChange}
                        >
                            <img src={dropdownArrow} alt="" className="dashboard-home__main__section__head__dropdown" />
                        </Dropdown>

                        <p className="dashboard-home__main__section__head__question-set-title">{questionSetsChoosed[0]?.questionSetName}</p>
                    </div>
                    
                    <div className="dashboard-home__main__section__scores-stats">
                        <div className="dashboard-home__main__section__scores-stats__title">
                            <img src={bullseye}/>
                            <p>Scores stats</p>
                        </div>

                        <div className="dashboard-home__main__section__scores-stats__chart">
                            <div className="dashboard-home__main__section__scores-stats__chart__wrapper">
                                {scoresStats?.map((item, index) => (
                                    <StatColumn key={index} title={item.scores} total={totalStudent} numOfTotal={item.numOfStudent} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-home__main__section__student-rank">
                        <div className="dashboard-home__main__section__student-rank__title">
                            <img src={trophy}/>
                            <p>Student Rank</p>
                        </div>

                        <div className="dashboard-home__main__section__student-rank__list">
                            <div className="dashboard-home__main__section__student-rank__list__wrapper">

                                <div className="dashboard-home__main__section__student-rank__list__wrapper__header">
                                    <div className="dashboard-home__main__section__student-rank__list__wrapper__header__no"/>
                                    <div className="dashboard-home__main__section__student-rank__list__wrapper__header__name col-header">
                                        <p>Name</p>
                                    </div>
                                    <div className="dashboard-home__main__section__student-rank__list__wrapper__header__email col-header">
                                        <p>Email</p>
                                    </div>
                                    <div className="dashboard-home__main__section__student-rank__list__wrapper__header__scores col-header">
                                        <p>Scores</p>
                                    </div>
                                </div>
                                
                                {studentList.map((item, index) => (
                                    <StudentItem name={item.name} email={item.email} scores={item.scores} index={index} />
                                ))}
                            </div>

                            <div className="dashboard-home__main__section__student-rank__list__button">
                                <div className="dashboard-home__main__section__student-rank__list__button__image">
                                    <img src={partyPopper} alt="" />
                                </div>
                                <p>Send congrats email to all Students!</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
