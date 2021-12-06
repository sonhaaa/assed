import React from 'react'
import { Link } from 'react-router-dom'
import './styles.scss'

export default function ShortButton({ title, isLogin, isColorFul }) {
    return (
        <Link to={ isLogin ? "/login" : "/register" } className="short-button__a">
            <div className={`short-button__container ${isColorFul ? "login" : "register"}`}>
                <p className="short-button__container__title">{title}</p>
            </div>
        </Link>
        
    )    
}
