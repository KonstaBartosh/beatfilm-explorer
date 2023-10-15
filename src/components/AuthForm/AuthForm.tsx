import React, { FormEvent, ReactNode } from "react";

import "./AuthForm.css";
import * as ui from "../../components"

interface AuthFormProps {
  title: string;
  buttonText: string;
  question: string;
  navLink: string;
  navLinkTitle: string;
  isValid: boolean;
  children: ReactNode;
  onSubmit: (evt: FormEvent) => void;
}

export const AuthForm = ({
  title,
  buttonText,
  question,
  navLink,
  navLinkTitle,
  isValid,
  children,
  onSubmit
}: AuthFormProps) => {

  return (
    <div className="auth-form">
      <div className="auth-form__container">
        <div>
          <div className="auth-form__header">
            <ui.Logo />
            <h2 className="auth-form__title">{title}</h2>
          </div>
          <form className="auth-form__form" id="form__auth" onSubmit={onSubmit}>
            {children}
          </form>
        </div>
        <div>
          <button
            className={`auth-form__button ${!isValid && "auth-form__button_inactive"}`}
            type="submit"
            form="form__auth"
            disabled={!isValid}
          >
            {buttonText}
          </button>
          <p className="auth-form__question">
            {question}
            <ui.NavButton
              text={` ${navLinkTitle}`}
              path={navLink}
              className="auth-form__link"
            />
          </p>
        </div>
      </div>
    </div>
  );
}
