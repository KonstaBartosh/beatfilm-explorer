import React from "react";
import { useForm } from "react-hook-form";

import AuthForm from "../Forms/AuthForm/AuthForm";
import EmailInput from "../Forms/Inputs/EmailInput";
import PasswordInput from "../Forms/Inputs/PasswordInput";

export default function Login({ handleLogin }) {
	
  const {
    register,
		handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

	const submitData = (data) => {
		handleLogin(data);
	}

  return (
			<AuthForm 
				title={'Рады видеть!'}
				buttonText={'Войти'}
				navLink={'/sign-up'}
				question={'Ещё не зарегистрированы?'}
				navLinkTitle={'Регистрация'}
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
