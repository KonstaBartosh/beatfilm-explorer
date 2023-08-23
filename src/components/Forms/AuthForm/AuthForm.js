import { NavLink } from "react-router-dom";

import "./AuthForm.css";
import Logo from "../../Logo/Logo";

function AuthForm({
  title,
  buttonText,
  question,
  navLink,
  navLinkTitle,
  children,
  onSubmit,
  isValid
}) {
  return (
    <div className="auth-form">
      <div className="auth-form__container">
        <div>
          <div className="auth-form__header">
            <Logo />
            <h2 className="auth-form__title">{title}</h2>
          </div>

          <form className="auth-form__form" id="form__auth" onSubmit={onSubmit}>
            {children}
          </form>

        </div>
        <div>

          <button
            className={`auth-form__button ${isValid ? "" : "auth-form__button_inactive"}`}
            type="submit"
            form="form__auth"
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
