import React from "react";
import { useForm } from "react-hook-form";

import EmailInput from "../../components/Inputs/EmailInput";
import PasswordInput from "../../components/Inputs/PasswordInput";
import AuthForm from "../../components/AuthForm/AuthForm";

export default function Login({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const submitData = (data) => {
    onLogin(data);
  };

  return (
    <AuthForm
      title={"Рады видеть!"}
      buttonText={"Войти"}
      navLink={"/sign-up"}
      question={"Ещё не зарегистрированы?"}
      navLinkTitle={"Регистрация"}
      onSubmit={handleSubmit(submitData)}
      isValid={isValid}
    >
      <EmailInput
        type={"email"}
        title={"email"}
        label={"E-mail"}
        placeholder={"E-mail"}
        register={register}
        errors={errors}
      />
      <PasswordInput
        type={"password"}
        title={"password"}
        label={"Пароль"}
        placeholder={"Пароль"}
        register={register}
        errors={errors}
      />
    </AuthForm>
  );
}
