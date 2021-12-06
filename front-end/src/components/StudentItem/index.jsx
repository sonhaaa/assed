import React from 'react'
import './styles.scss'
import firstMedal from '../../assets/icons/1st-place-medal.png'
import secondMedal from '../../assets/icons/2nd-place-medal.png'
import thirdMedal from '../../assets/icons/3rd-place-medal.png'

export default function StudentItem({name, email, scores, index}) {
    return (
        <div className="student-item">
            <div className="student-item__no">
                {{
                    0: <img style={{ marginLeft: 12}} src={firstMedal} alt="" />,
                    1: <img style={{ marginLeft: 12}} src={secondMedal} alt="" />,
                    2: <img style={{ marginLeft: 12}} src={thirdMedal} alt="" />
                }[index]}
            </div>
            <div className="student-item__email col-title">
                <p>{email}</p>
            </div>
            <div className="student-item__scores col-title">
                <p>{scores}</p>
            </div>
        </div>
    )
}
