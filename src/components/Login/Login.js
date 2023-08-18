import React from "react";

import './Login.css'
import AuthForm from "../Forms/AuthForm";

export default function Login() {
	return(
		<div className="login">
			<AuthForm 
				title={'Рады видеть!'}
				buttonText={'Войти'}
				question={'Ещё не зарегистрированы?'}
				navLinkTitle={'Регистрация'}
			/>
		</div>
	);
}