import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'
import slash from '../../assets/icons/slash.png'
import LongButton from '../../components/LongButton'
import SocialMediaButton from '../../components/SocialMediaButton'
import facebookLogo from '../../assets/logos/facebook_logo.png'
import googleLogo from '../../assets/logos/google_logo.png'
import linkedinLogo from '../../assets/logos/linkedin_logo.png'
import Header from '../../components/Header'

export default function Register() {
    return (
        <div className="register-page">
            <Header />
            <h1>Create New Account</h1>
            <h2>Register and enjoy the best tool for Online education, deal with Covid-19</h2>

            <div className="register-page__inputField">
                <div className="register-page__inputField__left">
                    <input type="text" className="register-page__inputField__left__input" placeholder="Teacher Email" />
                    <div className="register-page__gap"/>
                    <input type="password" className="register-page__inputField__left__input" placeholder="Password" />
                    <div className="register-page__gap"/>
                    <Link to="/dashboard"> <LongButton width={344} height={62} text="Create Account" /></Link>
                </div>

                <img className="register-page__inputField__slash" src={slash} alt=""/>

                <div className="register-page__inputField__right">
                    <SocialMediaButton width={344} height={56} text="Sign up with Google" icon={googleLogo} />
                    <div className="register-page__gap"/>
                    <SocialMediaButton width={344} height={56} text="Sign up with Facebook" icon={facebookLogo} />
                    <div className="register-page__gap"/>
                    <SocialMediaButton width={344} height={56} text="Sign up with Linkedin" icon={linkedinLogo} />
                </div>
            </div>
        </div>
    )
}
