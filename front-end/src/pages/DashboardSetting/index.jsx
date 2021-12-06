import React from 'react'
import SearchBar from '../../components/SearchBar'
import faceWithSweat from '../../assets/icons/anxious-face-with-sweat.png'
import { COLORS } from '../../constants/colors'
import './styles.scss'

export default function DashboardSetting() {
    return (
        <div className="dashboard-setting">
            <div className="dashboard-setting__main">
                <SearchBar/>
                <section className="dashboard-setting__main__section">
                    <div className="dashboard-setting__main__section__head">
                        {/* <h2 className="dashboard-home__main__section__head__title">Quick View</h2> */}
                        
                    </div>

                    <div className="dashboard-setting__main__section__content">
                        <img src={faceWithSweat} alt="Face with Sweat" style={{ width: 100, height: 100, textAlign: 'center', marginTop: 100 }} />
                        <p style={{ color: COLORS.GREY_700, fontSize: 14, textAlign: 'center', marginTop: 20, lineHeight: 1.5 }}>We are not implement yet, <br/> Stay tun!</p>     
                    </div>
                   
                    
                </section>

            </div>
        </div>
    )
}
