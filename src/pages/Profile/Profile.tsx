import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import "./Profile.css";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import TextInput from "../../components/UI/Inputs/TextInput";
import EmailInput from "../../components/UI/Inputs/EmailInput";
import { UserType } from "../../utils/types";


export interface ProfileProps {
  onLogOut: () => void;
  onSave: (userData: UserType) => void;
}

function Profile({ onLogOut, onSave }: ProfileProps) {
	const {
    register,
    handleSubmit,
		watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const { currentUser } = useContext(CurrentUserContext);
	const nameInputValue: string = watch('name');
	const emailInputValue: string = watch('email');
  const [isInputsVisible, setIsInputsVisible] = useState<boolean>(false);
	const [isSaveButtonValid, setIsSaveButtonValid] = useState<boolean>(false);
	const isButtonDisabled: boolean = isValid && isSaveButtonValid;
	const saveBtnClassName: string = `profile__save-button ${!isButtonDisabled && "profile__save-button_disabled"}`

	//** сравниваем дефолтные инпуты и управляем кнопкой сохранить */
  useEffect(() => {
    const areInputsChanged: boolean =
      nameInputValue !== currentUser.name || emailInputValue !== currentUser.email;
  
    setIsSaveButtonValid(areInputsChanged);
  }, [nameInputValue, emailInputValue, currentUser]);
  
	

  const handleUnlockInputs = () => {
    setIsInputsVisible(true);
  };
	
	const submitData = (data: UserType) => {
    setIsInputsVisible(false);
		onSave(data);
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

export default  Profile;