import React from "react";

import './NotFound.css'

export default function NotFound() {
	return(
		<div className="notfound">
			<div className="notfound__container">
				<h2 className="notfound__title">404</h2>
				<p className="notfound__subtitle">Страница не найдена</p>
				<a className="notfound__link">Назад</a>
			</div>
		</div>
	);
}