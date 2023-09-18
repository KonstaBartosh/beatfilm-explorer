import React from "react";

import './Promo.css';
import logo from '../../../images/landing_logo.svg';

export default function Promo() {
	return(
		<div className="promo">
			<div className="promo__container">
				<img src={logo} className="promo__logo" alt="лого практикум" />
				<h1 className="promo__title">
					Учебный проект студента факультета Веб-разработки.
				</h1>
			</div>
		</div> 	
	);
}
