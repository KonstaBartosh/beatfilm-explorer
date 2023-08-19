import React from "react";
import { useForm } from "react-hook-form";

import AuthForm from "../Forms/AuthForm/AuthForm";
import TextInput from "../Forms/Inputs/TextInput";

export default function Register() {
	const {
    register,
    formState: { errors },
  } = useForm({ mode: "onChange" });

	return(
		<AuthForm
			title={'Добро пожаловать!'}
			buttonText={'Зарегистрироваться'}
			navLink={'/sign-in'}
			question={'Уже зарегистрированы?'}
			navLinkTitle={"Войти"}
		>
			<TextInput
				title={'name'}
				label={'Имя'}
				placeholder={'Имя'}
				register={register}
				errors={errors}
			/>
		</AuthForm>
	);
}	