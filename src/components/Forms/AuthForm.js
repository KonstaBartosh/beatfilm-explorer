import { useForm } from "react-hook-form";

import './AuthForm.css'
import Logo from "../Logo/Logo";
import { NavLink } from "react-router-dom";

function AuthForm({ title, buttonText, question, navLinkTitle, children }) {
  const classNames = {
    container: "auth-form",
    title: "auth-form__title",
    form: "auth-form__form",
    input: "auth-form__input",
    errorMessage: "auth-form__error-message auth-form__error-message_active",
    button: "auth-form__button",
    question: "auth-form__question",
    navLink: "auth-form__link"
  };

  const requiredMessage = "Заполните это поле.";
  const minLengthMessage = "Минимум 3 символа";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  const emailMinLengthMessage = "Минимум 6 символов";
  const emailMaxLenghtMessage = "Электронная почта должна содержать не более 40 символов";
  const emailPatternMessage = "Адрес электронной почты должен содержать символ ' @ ' ";

  const {
    register, 
    formState: { errors, isValid } 
  } = useForm({ mode: "onChange" });


  return (
    <div className={classNames.container}>
      <Logo />
      <h2 className={classNames.title}>{title}</h2>
      <form className={classNames.form} name="form__auth">
        
        {children}
        
        <label className="auth-form__label">E-mail</label>
        <input
          {...register("email", {
            required: requiredMessage,
            minLength: {
              value: 6,
              message: emailMinLengthMessage,
            },
            maxLength: {
              value: 40,
              message: emailMaxLenghtMessage,
            },
            pattern: {
              value: emailRegex,
              message: emailPatternMessage,
            },
          })}
          id="email"
          type="email"
          className={classNames.input}
        />
        <div className={classNames.errorMessage}>
          {errors?.email && <div>{errors?.email?.message}</div>}
        </div>

        <label className="auth-form__label">Пароль</label>
        <input
          {...register("password", {
            required: requiredMessage,
            minLength: {
              value: 3,
              message: minLengthMessage
            },
            maxLength: 40,
          })}          
          id="password"
          type="password"
          className={classNames.input}
        />

        <div className={classNames.errorMessage}>
          {errors?.password && <div>{errors?.password?.message}</div>}
        </div>

        <button
          className={classNames.button}
          type="submit"
          disabled={!isValid}
        >
          {buttonText}
        </button>
      </form>
      <p className={classNames.question}>
        {question}
        <NavLink to="/sign-up" className={classNames.navLink}>&nbsp;{navLinkTitle}</NavLink>
      </p>
    </div>
  );
}

export default AuthForm;