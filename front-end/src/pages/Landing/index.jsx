import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import LongButton from '../../components/LongButton'
import './styles.scss'

export default function Landing() {
    return (
        <div className="landing">
            <Header />

            <p className="landing__tagline">Automated</p>
            <p className="landing__tagline">Student Assessment</p>


            {/* <p className="landing__subline">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p> */}
            <p className="landing__subline">Assessment student automatically by using Machine Learning</p>
            <p className="landing__subline">saving your time with high quality exam.</p>

            <div className="landing__gap"></div>

            <Link to="/login" className="landing__a"><LongButton width={320} height={60} text="Create a question set" /></Link>
        </div>
    )
}
