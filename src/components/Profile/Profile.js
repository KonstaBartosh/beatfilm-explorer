import React, { useContext } from "react";

import './Profile.css'
import { CurrentUserContext } from "../../context/context";
import TextInput from "../Forms/Inputs/TextInput";
import { useForm } from "react-hook-form";
import EmailInput from "../Forms/Inputs/EmailInput";

export default function Profile({ onLogOut }) {
	const currentUser = useContext(CurrentUserContext);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid }
	} = useForm({ mode: "onChange" });

	return(
		<section className="profile">
			<div className="profile__container">
				<div className="profile__data-set">
					<h2 className="profile__title">Привет, {currentUser.name}!</h2>
					<div className="profile__data-string">
						<span className="profile__text">Имя</span>
						{/* <span className="profile__text">{currentUser.name}</span> */}
						<div className="profile__input-container">
							<TextInput
								type={"text"}
								title={"name"}
								defaultValue={currentUser.name}
								register={register}
								errors={errors}
							/>
						</div>
					</div>
					<span className="underline"/>
					<div className="profile__data-string">
						<span className="profile__text">E-mail</span>
						{/* <span className="profile__text">{currentUser.email}</span> */}
						<div className="profile__input-container">
							<EmailInput
								type={"email"}
								title={"email"}
								defaultValue={currentUser.email}
								register={register}
								errors={errors}
							/>
						</div>
					</div>
				</div>
				<div className="profile__buttons">
					<button  className="profile__btn">Редактировать</button>
					<button 
						onClick={onLogOut} 
						className="profile__btn profile__btn_red"
					>
						Выйти из аккаунта
					</button>
				</div>
			</div>
		</section>
	);
}