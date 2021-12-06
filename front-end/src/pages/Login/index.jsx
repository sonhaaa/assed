import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import './styles.scss'
import slash from '../../assets/icons/slash.png'
import LongButton from '../../components/LongButton'
import { COLORS } from '../../constants/colors'
import SocialMediaButton from '../../components/SocialMediaButton'
import facebookLogo from '../../assets/logos/facebook_logo.png'
import googleLogo from '../../assets/logos/google_logo.png'
import linkedinLogo from '../../assets/logos/linkedin_logo.png'
import Header from '../../components/Header'

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [allAccount, setAllAccount] = useState()

    const history = useHistory()

    // const checkValidAccount = ()

    const handleLoginSuccess = data => {
        localStorage.setItem("teacher", JSON.stringify(data))
        history.push("/dashboard")
    }

    const handleLogin = () => {
        fetch(`http://localhost:5000/api/getteacherbyemailandpassword/${email}/${password}`)
        .then(res => res.status === 404 ? alert("check again") : res.json())
        .then(data => data !== undefined ? handleLoginSuccess(data) : null)
    }

    return (
        <div className="login-page">
            <Header/>
            <h1>Login to Your Account</h1>
            <h2>Welcome back, we trying our best to help your online teaching as smooth as possible</h2>

            <div className="login-page__inputField">
                <div className="login-page__inputField__left">
                    <input type="text" className="login-page__inputField__left__input" placeholder="Teacher Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <div className="login-page__gap"/>
                    <input type="password" className="login-page__inputField__left__input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <div className="login-page__gap"/>
                    {/* <Link to="/dashboard"><LongButton width={344} height={62} text="Login to Assed" onClick={() => handleLogin() } /></Link> */}
                    <LongButton width={344} height={62} text="Login to Assed" onClick={() => handleLogin() } />
                </div>

                <img className="login-page__inputField__slash" src={slash} alt="Slash"/>

                <div className="login-page__inputField__right">
                    <SocialMediaButton width={344} height={56} text="Login with Google" icon={googleLogo} />
                    <div className="login-page__gap"/>
                    <SocialMediaButton width={344} height={56} text="Login with Facebook" icon={facebookLogo} />
                    <div className="login-page__gap"/>
                    <SocialMediaButton width={344} height={56} text="Login with Linkedin" icon={linkedinLogo} />
                </div>
            </div>
                
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: 60 }}>
                <p style={{ fontSize: 16 }}>Forgot Password?</p>
                <div style={{ height: 1, width: 150, background: COLORS.BLACK }} />
            </div>
        </div>
    )
}
