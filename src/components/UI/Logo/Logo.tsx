import React from 'react';
import { NavLink } from "react-router-dom";

import './Logo.css';
import logo from '../../../images/beat-logo.svg';


export const Logo = () => {
	return(
		<NavLink to="/">
			<img src={logo} className="logo" alt="логотип" />
		</NavLink>
	);
}