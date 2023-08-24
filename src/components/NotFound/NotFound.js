import React from "react";

import './NotFound.css'
import { NavLink, useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate()

	const onGetBack = () => navigate(-1);

	return(
		<section className="notfound">
			<div className="notfound__container">
				<div className="notfound__main">
					<h1 className="notfound__title">404</h1>
					<p className="notfound__subtitle">Страница не найдена</p>
				</div>

				<button onClick={onGetBack} className="notfound__link">Назад</button>
			</div>
		</ы>
	);
}