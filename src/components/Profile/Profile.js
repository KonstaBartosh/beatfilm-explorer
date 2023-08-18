import React from "react";

import './Profile.css'
import { NavLink } from "react-router-dom";

export default function Profile() {
	const sampleWord = 'Заглушка';

	return(
		<section className="profile">
			<h2 className="profile__title">Привет, {sampleWord}!</h2>
			<div className="profile__data-set">
				<div className="profile__data-string">
					<span className="profile__text">Имя</span>
					<span className="profile__text">{sampleWord}</span>
				</div>
				<span className="underline"/>
				<div className="profile__data-string">
					<span className="profile__text">E-mail</span>
					<span className="profile__text">{sampleWord}</span>
				</div>
			</div>
			<div className="profile__buttons">
				<button className="profile__btn">Редактировать</button>
				<button className="profile__btn profile__btn_red">Выйти из аккаунта</button>
			</div>
		</section>
	);
}