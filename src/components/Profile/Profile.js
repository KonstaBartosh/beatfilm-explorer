import React, { useContext } from "react";

import './Profile.css'
import { CurrentUserContext } from "../../context/context";

export default function Profile() {
	const currentUser = useContext(CurrentUserContext);

	return(
		<section className="profile">
			<div className="profile__container">
				<div className="profile__data-set">
					<h2 className="profile__title">Привет, {currentUser.name}!</h2>
					<div className="profile__data-string">
						<span className="profile__text">Имя</span>
						<span className="profile__text">{currentUser.name}</span>
					</div>
					<span className="underline"/>
					<div className="profile__data-string">
						<span className="profile__text">E-mail</span>
						<span className="profile__text">{currentUser.email}</span>
					</div>
				</div>
				<div className="profile__buttons">
					<button className="profile__btn">Редактировать</button>
					<button className="profile__btn profile__btn_red">Выйти из аккаунта</button>
				</div>
			</div>
		</section>
	);
}