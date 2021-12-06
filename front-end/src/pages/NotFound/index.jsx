import React from 'react'
import Header from '../../components/Header'
import pageNotFound from '../../assets/404.png'
import sonha from '../../assets/sonha.png'
import lam from '../../assets/lam.png'
import { COLORS } from '../../constants/colors'

export default function NotFound() {
    return (
        <div 
            style={{ 
                width: "100%", 
                height: "100vh",
                display: "flex", 
                alignItems: 'center', 
                flexDirection: 'column' 
            }}
        >
            <Header />
            <img src={pageNotFound} alt="404" style={{ marginTop: 120 }} />
            {/* <p style={{ fontFamily: "SamsungMedium", marginTop: 32, color: COLORS.BLACK }}>Something when Wrong</p> */}
            {/* <img src={sonha} alt="sonha" style={{ position: 'absolute', bottom: 0, right: 0 }} />
            <img src={lam} alt="sonha" style={{ position: 'absolute', bottom: 0, left: 0, width: 300, marginLeft: 20 }} /> */}
        </div>
    )
}
