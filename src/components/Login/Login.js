import React from "react";

import AuthForm from "../Forms/AuthForm/AuthForm";

export default function Login() {
	return(
		<div className="login">
			<AuthForm 
				title={'Рады видеть!'}
				buttonText={'Войти'}
				navLink={'/sign-up'}
				question={'Ещё не зарегистрированы?'}
				navLinkTitle={'Регистрация'}
			/>
		</div>
	);
}