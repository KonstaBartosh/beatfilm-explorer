import React from "react";
import { useForm } from "react-hook-form";

import * as com from "../../components";
import { UserType } from "../../utils/types";

type onRegisterType = (userData: UserType) => void;

export const Register = ({ onRegister }: {onRegister: onRegisterType}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onBlur" });

  const submitData = (data: UserType) => {
    onRegister(data);
  };

  return (
    <com.AuthForm
      title={"Добро пожаловать!"}
      buttonText={"Зарегистрироваться"}
      buttonLabel={"Зарегистрироваться"}
      navLink={"/sign-in"}
      question={"Уже зарегистрированы?"}
      navLinkTitle={"Войти"}
      onSubmit={handleSubmit(submitData)}
      isValid={isValid}
    >
      <com.TextInput
        title={"name"}
        label={"Имя"}
        placeholder={"Имя"}
        register={register}
        errors={errors}
        autoComplete={"name"}
      />
      <com.EmailInput
        title={"email"}
        label={"E-mail"}
        placeholder={"E-mail"}
        register={register}
        errors={errors}
      />
      <com.PasswordInput
        title={"password"}
        label={"Пароль"}
        placeholder={"Пароль"}
        register={register}
        errors={errors}
        autoComplete={"new-password"}
      />
    </com.AuthForm>
  );
}