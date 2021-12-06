import React from 'react'
import Header from '../../components/Header'
import teams from '../../assets/teams.png'

export default function AboutUs() {
    return (
        <div>
            <Header />
            <img src={teams} alt="" />
        </div>
    )
}
