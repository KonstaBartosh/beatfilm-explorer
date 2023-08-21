import React from "react";

import './NotFound.css'
import { NavLink } from "react-router-dom";

export default function NotFound() {
	return(
		<div className="notfound">
			<div className="notfound__container">
				<div className="notfound__main">
					<h1 className="notfound__title">404</h1>
					<p className="notfound__subtitle">Страница не найдена</p>
				</div>

				<NavLink to="/" className="notfound__link">Назад</NavLink>
			</div>
		</div>
	);
}