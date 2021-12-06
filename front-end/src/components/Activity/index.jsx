import React from 'react'
import './styles.scss'
import editIcon from '../../assets/icons/edit.png'
import icon1 from '../../assets/icons/face-with-steam-from-nose.png'
import icon2 from '../../assets/icons/artist-palette.png'
import icon3 from '../../assets/icons/fireworks.png'
import icon4 from '../../assets/icons/sparkler.png'
import ResourceCard from '../../components/ResourceCard'

export default function Activity({name, email, organize, major, avatar}) {
    return (
        <div className="activity">
            <div className="activity__wrapper">
                <img src={avatar} alt="" className="activity__wrapper__avatar"/>
                <img src={editIcon} alt="" className="activity__wrapper__edit-icon" />
                <p className="activity__wrapper__name" >{name}</p>
                <p className="activity__wrapper__info">{email}</p>
                <p className="activity__wrapper__info">{organize}</p>
                <p className="activity__wrapper__info">{major}</p>
                <div className="activity__wrapper__resources">
                    <p className="activity__wrapper__resources__title">Resources</p>
                    <div className="activity__wrapper__resources__item">
                        <ResourceCard image={"https://cdn.dribbble.com/users/2537383/screenshots/8335184/media/8b8e42827d9f3d0d710107e0e03b9857.png?compress=1&resize=400x300"} icon={icon1} title="We launch new version of Assed. Check it out" />

                        <ResourceCard image={"https://img.freepik.com/free-vector/psychedelic-groovy-background-with-eaves_23-2148837578.jpg?size=626&ext=jpg"} icon={icon3} title="1000 final questions and bank for SWP391" />
                        <ResourceCard image={"https://cdn.dribbble.com/users/2405779/screenshots/14225333/media/2f700fd25173379b8628739c1e5085ea.png?compress=1&resize=400x300"} icon={icon2} title="Project developement template for SE1502" />
                        <ResourceCard image={"https://png.pngtree.com/png-clipart/20190613/original/pngtree-creative-abstract-pattern-background-png-image_3576543.jpg"} icon={icon2} title="Iterator 1, 2, 3 and final report template" />
                    </div>
                </div>
            </div>
        </div>
    )
}
