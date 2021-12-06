import React from 'react'
import Header from '../../components/Header'
import pricing from '../../assets/pricing.png'

export default function Pricing() {
    return (
        <div>
            <Header />
            <img src={pricing} alt=""/>
        </div>
    )
}
