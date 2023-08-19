import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

import "./AuthForm.css";
import Logo from "../../Logo/Logo";

function AuthForm({ 
  title, 
  buttonText, 
  question, 
  navLink, 
  navLinkTitle, 
  children 
}) {
  const requiredMessage = "Заполните это поле.";
  const minLengthMessage = "Минимум 3 символа";
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  const emailMinLengthMessage = "Минимум 6 символов";
  const emailMaxLenghtMessage = "Электронная почта должна содержать не более 40 символов";
  const emailPatternMessage = "Адрес электронной почты должен содержать символ ' @ ' ";

  const {
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  return (
      <div className="auth-form">
        <div className="auth-form__container">
          <div>
            <div className="auth-form__header">
              <Logo />
              <h2 className="auth-form__title">{title}</h2>
            </div>
            <form className="auth-form__form" name="form__auth">
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
                placeholder={'E-mail'}
                className={"auth-form__input"}
              />
              <div className="auth-form__error-message auth-form__error-message_active">
                {errors?.email && <div>{errors?.email?.message}</div>}
              </div>

              <label className="auth-form__label">Пароль</label>
              <input
                {...register("password", {
                  required: requiredMessage,
                  minLength: {
                    value: 3,
                    message: minLengthMessage,
                  },
                  maxLength: 40,
                })}
                id="password"
                type="password"
                placeholder={'Пароль'}
                className="auth-form__input"
              />

              <div className="auth-form__error-message auth-form__error-message_active">
                {errors?.password && <div>{errors?.password?.message}</div>}
              </div>
            </form>
          </div>
          <div>
            <button
              className="auth-form__button"
              type="submit"
              disabled={!isValid}
            >
              {buttonText}
            </button>
            <p className="auth-form__question">
              {question}
              <NavLink to={navLink} className="auth-form__link">
                &nbsp;{navLinkTitle}
              </NavLink>
            </p>
          </div>
        </div>
      </div>
  );
}

export default AuthForm;
