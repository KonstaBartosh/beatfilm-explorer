import React from "react";

import './Logo.css';
import logo from '../../images/logo.svg';
import { NavLink } from "react-router-dom";

export default function Logo() {
	return(
		<NavLink to="/">
			<img src={logo} className="logo" alt="логотип" />
		</NavLink>
	);
}