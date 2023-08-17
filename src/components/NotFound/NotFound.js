import React from "react";

import './NotFound.css'
import { NavLink } from "react-router-dom";

export default function NotFound() {
	return(
		<div className="notfound">
			<div className="notfound__container">
				<h2 className="notfound__title">404</h2>
				<p className="notfound__subtitle">Страница не найдена</p>
				<NavLink to="/" className="notfound__link">Назад</NavLink>
			</div>
		</div>
	);
}