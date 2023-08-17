import React from "react";
import { NavLink } from "react-router-dom";
import './Navigation.css';

function Navigation() {
	
  return (
    <nav className="navigation">
			<div className="navigation__movies">
					<NavLink 
						className="navigation__movies-link" 
						to='/movies'
					>
						Фильмы
					</NavLink>
					<NavLink
						to='/saved-movies'className="navigation__movies-link"
					>
						Сохраненные фильмы
					</NavLink>
			</div>
    </nav>
  );
}

export default Navigation;
