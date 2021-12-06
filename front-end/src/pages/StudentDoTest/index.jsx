import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import VideoRecorder from 'react-video-recorder'
import './styles.scss'
import { COLORS } from '../../constants/colors'

import Countdown, { CountdownRenderProps } from "react-countdown";
import Loading from '../../components/Loading'
const Completionist = () => <span>You are good to go!</span>;
const CountdownWrapper = () => {
	let time = parseInt(localStorage.getItem("questionSetTime")) * 60 * 1000 || 0

	return <Countdown date={Date.now() + time} zeroPadDays={2} zeroPadTime={2}
			renderer={({ hours, minutes, seconds, completed }) => {
				return <span>{Math.floor(minutes/10) === 0 ? "0" : ""}{minutes} : {Math.floor(seconds/10) === 0 ? "0" : ""}{seconds}</span>
			}} />;
};

const MemoCountdown = React.memo(CountdownWrapper);

const convertBolbToFile = (video) => {
	const myFile = new File([video], "video_test_sonha.wav", {
		type: video.type,
	})

	return myFile;
}

const RECORD_STATE = ["RECORD", "TRANSCRIBE", "FINISH"]

export default function StudentDoTest() {
    const [content, setContent] = useState("")
	// const refAnswer = "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times."
	const [scores, setScores] = useState("")
    const { id } = useParams()
	const [isJoined, setIsJoined] = useState(false)
	const [questionList, setQuestionList] = useState([])
	const [questionSetInfo, setQuestionSetInfo] = useState([])
	const [questionChoosed, setQuestionChoosed] = useState()
	const [indexQuestionChoosed, setIndexQuestionChoosed] = useState(0)
	const [recordState, setRecordState] = useState(RECORD_STATE[0])

	console.log("question choosed", questionChoosed)
	console.log(recordState)
	console.log(questionList)

	useEffect(() => {
		fetch(`http://localhost:5000/api/questionsets/${id}`)
		.then(response => response.json())
		.then(data => (setQuestionSetInfo(data), localStorage.setItem("questionSetTime", data?.questionSetTime)))
	}, [])

	function addToQuestionList(arr) {
		arr.forEach(element => {
			element.isDone = false
		});
		setQuestionList(() => arr)
	}

	useEffect(() => {
		fetch(`http://localhost:5000/api/questions`)
		.then(response => response.json())
		.then(data => (
			addToQuestionList(data?.filter(ques => ques.questionSetId === questionSetInfo?.questionSetId))
		))
	}, [questionSetInfo])

	useEffect(() => {
		setQuestionChoosed({...questionList[0], index: 0})
	}, [questionList])

	const uploadToServer = async (video) => {
		let file = convertBolbToFile(video)
		let data = new FormData()
		data.append('file', file)
		await fetch("http://localhost:8888/upload-file", {
			method: 'POST',
			body: data
		}).then(response => response.json())
		.then(data => check(data.message))
	}

	const check = (filename) => {
		let url = 'http://localhost:8888/transcribe/' + filename;
		let timerId = setInterval(() => {
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);

					if (data.message !== 'IN_PROGRESS') {
						setContent(() => data.transcribe)
						setRecordState(() => RECORD_STATE[2])

						fetch(`http://192.168.1.6:5000/assess?reference=${questionChoosed.questionReferenceAnswer}&student=${data.transcribe}`, {method: "get"})
						.then(res => res.json()).then(data => setScores(()=> data.scores))

						clearInterval(timerId);
					}
					if (data.message === 'IN_PROGRESS') {
						setRecordState(() => RECORD_STATE[1])
					}
				});
		}, 2000);
	};

	console.log("scores: ", scores)

	const enterExam = () => {
		setIsJoined(true)
		let studentEmail = document.getElementById("student-do-test-email").value
		localStorage.setItem("studentdotestemail", studentEmail)
	}

	const StudentDoTestInfo = () => (
		<div className="student-do-test__student-info">
			<div className="student-do-test__student-info__wrapper">
				<input type="text" placeholder="Name" className="student-do-test__student-info__wrapper__input" />
				<input type="text" placeholder="Example@organize.edu" className="student-do-test__student-info__wrapper__input" id="student-do-test-email" />
				<div className="student-do-test__student-info__wrapper__button" onClick={() => enterExam()}>Dive into Exam</div>
			</div>
		</div>
	)

	const handleFinishRecord = (video) => {
		setRecordState(RECORD_STATE[1])
		uploadToServer(video)
	}

	const handleMarkDone = () => {
		console.log("handle mark")
		let questionListTemp = questionList

		// {
		// 	"studentResultId": "1047413383",
		// 	"questionId": "1205145209",
		// 	"studentResultAnswer": "Student Answer for Question ID 1205145209 - Edited",
		// 	"studentResultScores": "8",
		// 	"studentResultEmail": "student114@gmail.com",
		// 	"studentResultVideoRecord": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
		// },

		
		console.log("scores: ", scores)
		console.log("questionid: ", questionChoosed.questionId)
		console.log("studentanswer: ", content)
		console.log("studentemail: ", localStorage.getItem("studentdotestemail"))

		let payload = {
			studentResultId: randomId(10),
			questionId: questionChoosed.questionId,
			studentResultAnswer: content,
			studentResultScores: scores,
			studentResultEmail: localStorage.getItem("studentdotestemail"),
			studentResultVideoRecord: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
		}

		console.log("payload: ", payload)
		
		fetch("http://localhost:5000/api/studentresults", {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify( payload )
		})
		.then(res => console.log(res))
		.then(() => {
			questionListTemp.forEach(element => {
				if (element.questionId === questionChoosed.questionId) {
					element.isDone = true
				}
			})
			console.log("quesionlist temp: ", questionListTemp)
			setQuestionList(() => questionListTemp)
		})

		
	}

	const [isFinished, setIsFinished] = useState(true)

	const MarkDone = () => (
		<div style={{ width: window.innerWidth - 400, height: "100%", position: 'relative', display: 'flex'}}>   
			<p style={{ 
				paddingTop: 24,
				color: COLORS.BLACK, 
				fontSize: 14, 
				width: "100%", 
				lineHeight: 2}}
			>{content}
			</p>
			<div 
				style={{ 
					width: 140, 
					height: 40, 
					background: `linear-gradient(94.38deg, #647DEE 0.73%, #7F53AC 99.95%)`,
					color: COLORS.WHITE,
					display: 'flex',
					justifyContent: 'center',
					alignItems:'center',
					fontSize: 13,
					position: 'absolute',
					bottom: 0,
					right: 24,
					cursor: 'pointer',
					opacity: 1
				}}
				onClick={handleMarkDone}>Mark as Done</div>
		</div>
	)

	const StudentDoingTest = () => (
		<div className="student-do-test__student-doing-test">
			<div className="student-do-test__student-doing-test__wrapper">
				<div className="student-do-test__student-doing-test__wrapper__question-navigate">
					<div className="navigate-bar">
						<p className="navigate-bar__timer"><MemoCountdown /></p>
						<div className="navigate-bar__questions">
							{questionList?.map((item, index) => (
								<div className={`navigate-bar__questions__wrapper`}
									key={index}
									style={{ 
										background: item.isDone ? "linear-gradient(136.12deg, rgba(100, 125, 238, 0.7) 3.27%, rgba(127, 83, 172, 0.7) 88.3%)" : null,
										color: item.isDone ? "white" : "v.$BLACK",
										border: indexQuestionChoosed === index ? "1px solid grey" : null
								 	}}
									onClick={() => (setQuestionChoosed({...item, index}), setIndexQuestionChoosed(index), setRecordState(RECORD_STATE[0]), setContent(""), setScores(""))}
								>
									<p style={{ marginTop: 3 }}>{index + 1}</p>
								</div>
							))}
						</div>
					</div>
					<div className={isFinished ? "button-submit" : "button-deactive" } onClick={() => alert("Wanna quit?") ? document.location = 'http://localhost:3000/' : null}>
							<p>Submit</p>
						</div>
				</div>
				<div className="student-do-test__student-doing-test__wrapper__answer-field">
					<h1 style={{ fontSize: 20, fontFamily: 'SamsungMedium', color: COLORS.BLACK }}>{questionSetInfo?.questionSetName}</h1>
					<p style={{ fontSize: 13, color: COLORS.GREY_700, marginTop: 20 }}>Question {questionChoosed?.index + 1}: </p>
					<p style={{ fontSize: 16, color: COLORS.BLACK, marginTop: 8 }}>{questionChoosed?.questionTitle}</p>
					<p style={{ fontSize: 13, color: COLORS.GREY_700, marginTop: 20 }}>Answer:</p>
					<div className="answer-input-field">
						{
							{
								"RECORD": <VideoRecorder
											constraints={{
												audio: true,
												video: true
											}}
											dataAvailableTimeout={500}
											isOnInitially
											showReplayControls
											replayVideoAutoplayAndLoopOff={false}
											onRecordingComplete={(video) => handleFinishRecord(video)}
										/>,
								"TRANSCRIBE": <Loading />,
								"FINISH": <MarkDone />
							} [recordState]
						}
						
					</div>
				</div>
			</div>
		</div>
	)

	return (
		<div className="student-do-test">
			{!isJoined ? <StudentDoTestInfo /> : <StudentDoingTest /> }
		</div>
	)
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
