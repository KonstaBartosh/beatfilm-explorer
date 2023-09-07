import React, { useContext, useEffect, useState } from "react";

import "./Profile.css";
import { CurrentUserContext } from "../../context/context";
import TextInput from "../Forms/Inputs/TextInput";
import { useForm } from "react-hook-form";
import EmailInput from "../Forms/Inputs/EmailInput";

export default function Profile({ onLogOut, onSave }) {
	const {
    register,
    handleSubmit,
		watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

	const nameInputValue = watch('name');
	const emailInputValue = watch('email');
  const { currentUser } = useContext(CurrentUserContext);
  const [isInputsVisible, setIsnputsVisible] = useState(false);
	const [isSaveButtonValid, setIsSaveButtonValid] = useState(false);
	const isButtonDisabled = isValid && isSaveButtonValid;
	const saveBtnClassName = `profile__save-button ${isButtonDisabled ? "" : "profile__save-button_disabled"}`

	//** сравниваем дефолтные инпуты и управляем кнопкой сохранить */
	useEffect(() => {
		const isNameEqual = nameInputValue === currentUser.name;
		const isEmailEqual = emailInputValue === currentUser.email;

		setIsSaveButtonValid(!(isNameEqual && isEmailEqual));
	}, [nameInputValue, emailInputValue, currentUser]);
	

  const handleUnlockInputs = () => {
    setIsnputsVisible(true);
  };
	
	const submitData = (data) => {
		onSave(data);
		setIsnputsVisible(false);
	}

  return (
    <section className="profile">
      <div className="profile__container">
        <div className="profile__data-set">
          <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
          <div className="profile__data-string">
            <span className="profile__text">Имя</span>
            <span className={`profile__text ${isInputsVisible ? "hidden" : ""}`}>
              {currentUser.name}
            </span>
            <div className={`profile__input-container ${isInputsVisible ? "" : "hidden"}`}>
              <TextInput
                type={"text"}
                title={"name"}
                defaultValue={currentUser.name}
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <span className="underline" />
          <div className="profile__data-string"> 
            <span className="profile__text">E-mail</span>
            <span className={`profile__text ${isInputsVisible ? "hidden" : ""}`}>
              {currentUser.email}
            </span>
            <div className={`profile__input-container ${isInputsVisible ? "" : "hidden"}`}>
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
          {!isInputsVisible ? (
            <>
              <button className="profile__btn" onClick={handleUnlockInputs}>
                Редактировать
              </button>
              <button
                onClick={onLogOut}
                className="profile__btn profile__btn_red"
              >
                Выйти из аккаунта
              </button>
            </>
          ) : (
            <button
              className={saveBtnClassName}
              onClick={handleSubmit(submitData)}
							disabled={!isButtonDisabled}
            >
              Сохранить
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
