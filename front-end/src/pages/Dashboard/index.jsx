import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AssedLogo from '../../assets/logos/AssedLogo'
import './styles.scss'
import seprate from '../../assets/icons/seprate.png'
import HomeIcon from '../../assets/icons/HomeIcon'
import NoteIcon from '../../assets/icons/NoteIcon'
import StudentIcon from '../../assets/icons/StudentIcon'
import SettingIcon from '../../assets/icons/SettingIcon'
import rightArrow from '../../assets/icons/right_arrow_no_leg.png'
import DashboardSetting from '../DashboardSetting'
import DashboardStudent from '../DashboardStudent'
import Activity from '../../components/Activity'
import Logout from '../../assets/icons/Logout'
import { Link } from 'react-router-dom'
import { COLORS } from '../../constants/colors'

import Dropdown from 'rc-dropdown';
import 'rc-dropdown/assets/index.css';
import dropdownArrow from '../../assets/icons/arrow-down.png'
import bullseye from '../../assets/icons/bullseye.png'
import trophy from '../../assets/icons/trophy.png'
import StatColumn from '../../components/StatColumn'
import partyPopper from '../../assets/icons/party-popper.png'
import StudentItem from '../../components/StudentItem'
import Menu, { Item, Item as MenuItem } from 'rc-menu'

import SearchBar from '../../components/SearchBar'

import plusIcon from '../../assets/icons/plus-icon.png'
import QuestionSetCard from '../../components/QuestionSetCard'
import editIcon from '../../assets/icons/edit.png'
import deleteIcon from '../../assets/icons/trash.png'

import "../DashboardHome/styles.scss"
import "../DashboardQuestion/styles.scss"
import "../DashboardStudent/styles.scss"

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


export default function Dashboard() {
    const history = useHistory()

    const [idPageChoosed, setIdPageChoosed] = useState( parseInt(localStorage.getItem('isPageChoosed')) || 0)
    const teacher = JSON.parse(localStorage.getItem("teacher"))
    const [questionSets, setQuestionSets] = useState([])
    const [questions, setQuestions] = useState({})
    const [studentResults, setStudentResults] = useState({})

    console.log("studentres: ", studentResults)
    console.log("question: ", questions)
    
    const [questionSetChoosed, setQuestionSetChoosed] = useState([])

    const [totalStudent, setTotalStudent] = useState(30)
    const [scoresStats, setScoresStats] = useState([
        {scores: 1, numOfStudent: 4},
        {scores: 2, numOfStudent: 6},
        {scores: 3, numOfStudent: 1},
        {scores: 4, numOfStudent: 5},
        {scores: 5, numOfStudent: 30},
        {scores: 6, numOfStudent: 7},
        {scores: 7, numOfStudent: 9},
        {scores: 8, numOfStudent: 1},
        {scores: 9, numOfStudent: 2},
        {scores: 10, numOfStudent: 4},
    ])

    const [studentList, setStudentList] = useState([
        {email: 'nguyensonha.hanz@gmail.com', scores: '9'},
        {email: 'nguyensonha.hanz@gmail.com', scores: '9'},
        {email: 'nguyensonha.hanz@gmail.com', scores: '9'},
        {email: 'nguyensonha.hanz@gmail.com', scores: '9'},
    ])

    const changePageId = id => {
        setIdPageChoosed(() => id)
        localStorage.setItem('isPageChoosed', id)
    }

    const filterStudentResults = arr => {
        let studentResultFilter = {}
        for (const question in questions) {
            questions[question].forEach(ques => studentResultFilter[ques.questionId] =  arr.filter(item => item.questionId === ques.questionId))
        }
        localStorage.setItem("studentresults", JSON.stringify(studentResultFilter))
        setStudentResults(studentResultFilter)
    }

    const getQuestionSets = data => {
        localStorage.setItem("questionsets", JSON.stringify(data))
        setQuestionSets(data)
    }

    const getQuestions = data => {
        localStorage.setItem("questions", JSON.stringify(data))
        setQuestions(data)
    }

    console.log("quesionset: ", questionSets)

    useEffect(() => {
        fetch(`http://localhost:5000/api/getquestionsetbyteacherid/${teacher.teacherId}`)
        .then(res => res.json())
        .then(data => getQuestionSets(data))
    }, [])

    useEffect(() => {
        if (questionSets.length !== 0) {
            setQuestionSetChoosed([questionSets[0]])
        }
    }, [questionSets])

    useEffect(() => {
        if (questionSets.length !== 0) {
            let questionObj = {}
            questionSets.forEach(questionSet => {
                fetch(`http://localhost:5000/api/getquestionbyquestionsetid/${questionSet.questionSetId}`)
                .then(res => res.json())
                .then(data => questionObj[`${questionSet.questionSetId}`] = data)
            });
            console.log(questionObj)
            localStorage.setItem("questions", JSON.stringify(questionObj))
            getQuestions(questionObj)    
        }
    }, [questionSets])

    useEffect(() => {
        if (questions) 
            fetch(`http://localhost:5000/api/studentresults`)
            .then(res => res.json())
            .then(data => filterStudentResults(data))
    }, [questions])

    return (
        <div className="dashboard">
            <div className="dashboard__drawing-navigation">
                <div className="dashboard__drawing-navigation__logo">
                    <AssedLogo width={100} />
                </div>
                <div className="dashboard__drawing-navigation__nav">
                    <div className={`dashboard__drawing-navigation__nav__item ${idPageChoosed === 0 ? "page-choose" : ""}`}
                        onClick={() => changePageId(0)}>
                            {/* {console.log(idPageChoosed)} */}
                        <HomeIcon color="#3e3e3e" />
                        <img src={seprate} className="dashboard__drawing-navigation__nav__item__seprate" alt="" />
                        <p>Home</p>
                        <img src={rightArrow} alt="" className="dashboard__drawing-navigation__nav__item__right-arrow" />
                    </div>
                    <div className={`dashboard__drawing-navigation__nav__item ${idPageChoosed === 1? "page-choose" : ""}`}
                        onClick={() => changePageId(1)}>
                        <NoteIcon color="#3e3e3e"/>
                        <img src={seprate} className="dashboard__drawing-navigation__nav__item__seprate" alt="" />
                        <p>Question</p>
                        <img src={rightArrow} alt="" className="dashboard__drawing-navigation__nav__item__right-arrow" /> 
                    </div>
                    <div className={`dashboard__drawing-navigation__nav__item ${idPageChoosed === 2 ? "page-choose" : ""}`}
                        onClick={() => changePageId(2)}>
                        <StudentIcon color="#3e3e3e"/>
                        <img src={seprate} className="dashboard__drawing-navigation__nav__item__seprate" alt="" />
                        <p>Student</p>
                        <img src={rightArrow} alt="" className="dashboard__drawing-navigation__nav__item__right-arrow" /> 
                    </div>
                    <div className={`dashboard__drawing-navigation__nav__item ${idPageChoosed === 3 ? "page-choose" : ""}`}
                        onClick={() => changePageId(3)}>
                        <SettingIcon color="#3e3e3e"/>
                        <img src={seprate} className="dashboard__drawing-navigation__nav__item__seprate" alt="" />
                        <p>Setting</p>
                        <img src={rightArrow} alt="" className="dashboard__drawing-navigation__nav__item__right-arrow" /> 
                    </div>

                    <div style={{ height: 272 }} />

                    <Link to={"/"} style={{ color: COLORS.BLACK }}>
                        <div className={`dashboard__drawing-navigation__nav__item`}
                            onClick={() => changePageId(3)}
                        >
                            <Logout color="#3e3e3e"/>
                            <img src={seprate} className="dashboard__drawing-navigation__nav__item__seprate" alt="" />
                            <p>Logout</p>
                            
                        </div>
                    </Link>
                    
                </div>
            </div>

            <div className="dashboard__content">
                {
                    {
                        0: <DashboardHome />,
                        1: <DashboardQuestion />,
                        2: <DashboardStudent />,
                        3: <DashboardSetting />,

                    } [idPageChoosed]
                }
            </div>
            
            <div className="dashboard__activity">
                <Activity 
                    name={teacher?.teacherName}
                    email={teacher?.teacherEmail}
                    organize={teacher?.teacherOrganize}
                    major={teacher?.teacherSpecialize}
                    avatar={teacher?.teacherImage}
                />
            </div>

        </div>
    )

    function DashboardHome() {   
    
        function onSelect({ key }) {
            let questionSetChoosed = questionSets.filter(item => item.questionSetId === key)
            console.log(questionSetChoosed)
            localStorage.setItem("questionsetchoosedid", questionSetChoosed[0].questionSetId)
            setQuestionSetChoosed(questionSetChoosed)
        }
        
        function onVisibleChange(visible) {
            console.log(visible);
        }
        
        const menuCallback = () => (
            <Menu onSelect={onSelect}>
                {questionSets.map(item => (
                    <MenuItem key={item.questionSetId}>{item.questionSetName}</MenuItem>
                ))}
            </Menu>
        );
        
        console.log("questionSetChoosed", questionSetChoosed)

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
    
                            <p className="dashboard-home__main__section__head__question-set-title">{questionSetChoosed[0]?.questionSetName}</p>
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
                                        <div className="dashboard-home__main__section__student-rank__list__wrapper__header__email col-header">
                                            <p>Email</p>
                                        </div>
                                        <div className="dashboard-home__main__section__student-rank__list__wrapper__header__scores col-header">
                                            <p>Scores</p>
                                        </div>
                                    </div>
                                    
                                    {studentList.map((item, index) => (
                                        <StudentItem email={item.email} scores={item.scores} index={index} />
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

    function DashboardQuestion() {
        const [createQuestionSet, setCreateQuestionSet] = useState({})
        
        const [isCreateQuestion, setIsCreateQuestion] = useState(false)
        const [isAddQuestion, setIsAddQuestion] = useState(false)
        
        const [questionList, setQuestionList] = useState([])

        const [qSChoosed, setQSChoosed] = useState()
    
        const QuestionSet = () => ( 
            <div className="dashboard-question__main__section__content">
                {questionSets?.map((item, index) => (
                    <div key={index}  onClick={() => handleQuestionSetClick(item.questionSetId)}>
                    <QuestionSetCard 
                        title={item.questionSetName} 
                        date={`${new Date(parseInt(item.questionSetDay)).getDate()}/${new Date(parseInt(item.questionSetDay)).getMonth()}/${new Date(parseInt(item.questionSetDay)).getFullYear()}`} 
                        time={item.questionSetTime} 
                        numOfQuestion={item.questionSetNumberOfQuestion} />
                    </div>
                ))}
            </div>
        )
    
        const QuestionCreate = () => (
            <div className="dashboard-question__main__section__question-create">
                <div className="dashboard-question__main__section__question-create__question-set-create">
                   <input type="text" placeholder="Question Set title" style={{width: 528 - 48}} id="dashboard-question__main__section__question-create__title" defaultValue={createQuestionSet.title}/>
                     <input type="text" placeholder="Class" style={{ width: 169 - 48, marginLeft: 12}} id="dashboard-question__main__section__question-create__class" defaultValue={createQuestionSet.class}/>
                    <input type="text" placeholder="Subject" style={{ width: 232 - 48}} id="dashboard-question__main__section__question-create__subject" defaultValue={createQuestionSet.subject}/>
                    <input type="text" placeholder="Type" style={{ width: 152 - 48, marginLeft: 12 }} id="dashboard-question__main__section__question-create__type" defaultValue={createQuestionSet.type}/>
                    <input type="text" placeholder="Time" style={{ width: 140 - 48,  marginLeft: 12}} id="dashboard-question__main__section__question-create__time" defaultValue={createQuestionSet.time}/>
                    <div className="create-question-card__button" style={{ height: 48, background: COLORS.GREY_500, marginLeft: 36 }} onClick={saveQuestionSet}>
                        <p>Save</p>
                    </div>
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
        console.log("qschoosed", qSChoosed)
        const handleQuestionSetClick = questionSetId => {
            let questionSetChoosed = questionSets.filter(item => item.questionSetId === questionSetId)
            localStorage.setItem("questionsetchoosedid", questionSetChoosed[0].questionSetId)
            localStorage.setItem("isPageChoosed", 2)
            // history.push("/dashboard")
            history.go(0)
            setQSChoosed(questionSetChoosed)
        }

        const QuestionCard = ({title, referenceAnswer, index}) => (
            <div className="question-card" key={index}>
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

        const saveQuestionSet = () => {
            let newItem = {
                title: document.getElementById("dashboard-question__main__section__question-create__title").value,
                class: document.getElementById("dashboard-question__main__section__question-create__class").value,
                subject: document.getElementById("dashboard-question__main__section__question-create__subject").value,
                type: document.getElementById("dashboard-question__main__section__question-create__type").value,
                time: document.getElementById("dashboard-question__main__section__question-create__time").value,
            }
            setCreateQuestionSet(newItem)
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

        const handleAfterCreateQS = id => {
            alert(`Exam code: http://localhost:3000/exam/${id}`)
            history.push("/dashboard")
            history.go(0)
        }

        const handleCreateQSRequest = () => {
            let qSTitle = `${createQuestionSet.class} - ${createQuestionSet.subject} - ${createQuestionSet.title}`
            let qSId = randomId(10)

            let payload = {
                questionSetId: qSId,
                teacherId: teacher.teacherId,
                questionSetName: qSTitle,
                questionSetDay: String(Date.now()),
                questionSetTime: parseInt(createQuestionSet.time),
                questionSetNumberOfQuestion: questionList.length,
            }

            fetch("http://localhost:5000/api/questionsets", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify( payload )
            })
            .then(res => console.log(res))
            .then(() => 
                questionList.forEach(question => {
                    let payload = {
                            questionId: randomId(10),
                            questionSetId: qSId,
                            questionTitle: question.title,
                            questionReferenceAnswer: question.referenceAnswer
                    }

                    fetch("http://localhost:5000/api/questions", {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                          method: "POST",
                          body: JSON.stringify( payload )
                    })
                    .then(res => console.log(res))
                    .then(() => handleAfterCreateQS(qSId))
                })
                
            )
            .catch(err => console.log(err))
        }
    
        return (
            <div className="dashboard-question">
                <div className="dashboard-question__main">
                    <SearchBar />
                    <section className="dashboard-question__main__section">
                        <div className="dashboard-question__main__section__head">
                            <h2 className="dashboard-question__main__section__head__title">Question Sets {isCreateQuestion ? "> Create Question Set" : ""}</h2>
                            {!isCreateQuestion ? (
                                <div className="dashboard-question__main__section__head__button" onClick={() => setIsCreateQuestion(true)}>
                                    <p>Create</p>
                                </div>
                            ):(
                                <>
                                    <div className="dashboard-question__main__section__head__button" style={{ background: "transparent", color: COLORS.GREY_500, marginLeft: 100 }} onClick={() => setIsCreateQuestion(false)}>
                                        <p>Cancel</p>
                                    </div>
                                    <div className="dashboard-question__main__section__head__button" onClick={() => handleCreateQSRequest()} >
                                        <p>Create Set</p>
                                    </div>
                                    
                                </>
                            )}
                            
                        </div>
                        {isCreateQuestion ? <QuestionCreate /> : <QuestionSet />}
                        
                    </section>
                </div>
            </div>
        )
    }

    function DashboardStudent() {
        const qSChoosedId = localStorage.getItem("questionsetchoosedid")
        const [studentResultForEachQuestion, setStudentResultForEachQuestion] = useState([])
        const [qSChoosed, setQSChoosed] = useState()       

        useEffect(() => {
            if (qSChoosed) {
                let id = qSChoosed[0]?.questionSetId
                let ques = questions[id]
                let matchQuestion = []
                for (const q in ques) {
                    for (const a in studentResults[ques[q].questionId]) {
                        matchQuestion.push(studentResults[ques[q].questionId][a])
                    }
                }

                let studentObj = []
                // console.log(questions)
                for (const mQ in matchQuestion) {
                    let a = studentObj.filter(item => item.email === matchQuestion[mQ].studentResultEmail)
                    if (a.length === 0) {
                        studentObj.push({
                            email: matchQuestion[mQ].studentResultEmail,
                            result: [matchQuestion[mQ]],
                            scores: matchQuestion[mQ].studentResultScores
                        })
                    } else {
                        a[0].result.push(matchQuestion[mQ])
                        a[0].scores += parseInt(matchQuestion[mQ].studentResultScores)
                    }
                    
                }
                // console.log("studentObj: ", studentObj)
                setStudentResultForEachQuestion(studentObj)

            }
        }, [qSChoosedId, qSChoosed])

        let isExpand = false
    
        const toggleExpand = index => {
            isExpand = !isExpand
            isExpand ? document.getElementById(`student-result-card__${index}`).classList.add('card-expand') 
            : document.getElementById(`student-result-card__${index}`).classList.remove('card-expand')
        }

        useEffect(() => {
            // console.log("callled")
            setQSChoosed(questionSets.filter(item => item.questionSetId === qSChoosedId))
        }, [qSChoosedId])

        const StudentResultCard = ({index, studentEmail, questionResult, avarageScore}) => {
            return (
                <div className="student-result-card" id={`student-result-card__${index}`} onClick={() => toggleExpand(index)}>
                    <p className="student-result-card__name">{studentEmail}</p>
                    {/* <div className="student-result-card__total-scores-wrapper">
                        <p>{avarageScore}</p>
                    </div> */}
                    <div style={{height: 32}}></div>
                    {questionResult.map((item, index) => (
                        <QuestionResultCard index={index} answer={item.studentResultAnswer} score={item.studentResultScores} />
                    ))}
                </div>
            )
        }
    
        const QuestionResultCard = ({index, question, answer, score}) => (
            <div className="question-result-card">
                <div className="question-result-card__answer-with-scores">
                    <p className="question-result-card__answer-with-scores__answer">Answer {index + 1}: <span>{answer}</span></p>
                    <div className="question-result-card__answer-with-scores__scores-wrapper">
                        <p className="question-result-card__answer-with-scores__scores-wrapper__scores">{score}</p>
                    </div>
                </div>
            </div>
        )

        console.log("studentResultForEachQuestion", studentResultForEachQuestion)
        return (
            <div className="dashboard-student">
                <div className="dashboard-student__main">
                    <SearchBar />
                    <section className="dashboard-student__main__section">
                        <div className="dashboard-student__main__section__head">
                            {qSChoosed ? (
                                <>
                                    <h2 className="dashboard-student__main__section__head__title">{qSChoosed[0]?.questionSetName}</h2>

                                    <p>{qSChoosed[0]?.questionSetNumberOfQuestion} question • {qSChoosed[0]?.questionSetTime} minutes • {new Date(parseInt(qSChoosed[0]?.questionSetDay)).getDate()}/{new Date(parseInt(qSChoosed[0]?.questionSetDay)).getMonth()}/{new Date(parseInt(qSChoosed[0]?.questionSetDay)).getFullYear()}</p>
                                    <ExportCSV csvData={studentResultForEachQuestion} fileName={qSChoosed[0]?.questionSetName} />

                                </>
                            ) : null}
                            
                        </div>
                        
                        <div className="dashboard-student__main__section__content">
                            {studentResultForEachQuestion.map((item, index) => (
                                <StudentResultCard index={index} studentEmail={item.email} questionResult={item.result} />
                            ))}
                            
                        </div>
                    </section>
                </div>
            </div>
        )
    }

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

function randomId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

  const ExportCSV = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {

        let obj = {
            "A1": {t: 's', v: 'Email'},
            "B1": {t: 's', v: 'Answers'},
            "C1": {t: 's', v: 'Scores'}
        }

        let a = 2

        for (let d in csvData) {
            obj[`A${a}`] = {t: 's', v: csvData[d].email}
            for (let r in csvData[d].result) {
                obj[`B${a}`] = {t: 's', v: csvData[d].result[r].studentResultAnswer}
                obj[`C${a}`] = {t: 's', v: csvData[d].result[r].studentResultScores}
                a+=1
            }
        }

        obj["!ref"] = `A1:C${a}`
        console.log("obj", obj, typeof(obj))



        const wb = { Sheets: { 'data': obj }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button style={{ width: 100, height: 32, background: `linear-gradient(
            93.1deg,
            rgba(100, 125, 238, 0.7) 0%,
            rgba(158, 138, 180, 0.7) 100%
          )`, color: 'white', border: "none", marginTop: 20, fontFamily: "SamsungMedium", cursor: 'pointer' }} onClick={(e) => exportToCSV(csvData,fileName)}>Export</button>
    )
}