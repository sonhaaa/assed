import React, { useState, useEffect } from 'react'
import './styles.scss'
import AssedLogo from '../../assets/logos/AssedLogo'
import ShortButton from '../ShortButton'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
    let path = useLocation().pathname
    const [isShowLoginBtn, setIsShowLoginBtn] = useState(true)
    const [isShowRegisterBtn, setIsShowRegisterBtn] = useState(false)

    useEffect(() => {
        if (path === "/login") {
            setIsShowLoginBtn(true)
            setIsShowRegisterBtn(false)
        }

        if (path === "/register") {
            setIsShowLoginBtn(false)
            setIsShowRegisterBtn(true)
        }

        if (path !== "/login" && path !== "/register") {
            setIsShowLoginBtn(true)
            setIsShowRegisterBtn(true)
        }
    }, [path])

    console.log(path)

    return (
        <div className="header">
            <div style={{marginLeft: 68}}><Link to="/"><AssedLogo width={100} /></Link></div>
            
            <nav className="header__navbar">
                <Link to="/">What is it?</Link>
                <Link to="/pricing">Pricing</Link>
                <Link to="/aboutus">About us</Link>
            </nav>

            <div className="header__buttonGroup">
                <div style={{ display: `${isShowLoginBtn && !isShowRegisterBtn ? "block" : "none"}` }}>
                    <ShortButton title="Register" isLogin={false} isColorFul={true} />
                </div>

                <div style={{ display: `${isShowLoginBtn && isShowRegisterBtn ? "block" : "none"}` }}> 
                    <ShortButton title="Register" isLogin={false} isColorFul={false}/>
                </div>

                <div style={{ display: `${isShowRegisterBtn ? "block" : "none"}` }}> 
                    <ShortButton title="Login" isLogin={true} isColorFul={true}/>
                </div>

            </div>
        </div>
    )
}


