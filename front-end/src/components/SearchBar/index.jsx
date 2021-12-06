import React from 'react'
import './styles.scss'
import search from '../../assets/icons/search.png'

export default function SearchBar() {
    return (
        <div className="search-bar">
            <img src={search} alt="" className="search-bar__icon" />
            <input type="text" placeholder="Type anything to search" className="search-bar__input" />
        </div>
    )
}
