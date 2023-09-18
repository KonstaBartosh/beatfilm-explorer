import React from "react";
import { useForm } from "react-hook-form";


import TextInput from "../Inputs/TextInput";
import EmailInput from "../Inputs/EmailInput";
import PasswordInput from "../Inputs/PasswordInput";
import AuthProvider from "../AuthProvider/AuthProvider";

export default function Register({ onRegister }) {
	
  const {
    register,
		handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

	const submitData = (data) => {
		onRegister(data);
	}

  return (
    <AuthProvider
      title={"Добро пожаловать!"}
      buttonText={"Зарегистрироваться"}
      navLink={"/sign-in"}
      question={"Уже зарегистрированы?"}
      navLinkTitle={"Войти"}
			onSubmit={handleSubmit(submitData)}
			isValid={isValid}
    >
      <TextInput
        type={"text"}
        title={"name"}
        label={"Имя"}
        placeholder={"Имя"}
        register={register}
        errors={errors}
      />

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
    </AuthProvider>
  );
}
