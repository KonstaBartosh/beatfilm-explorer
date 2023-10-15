import React from "react";
import { NavLink } from "react-router-dom";

interface NavButtonProps {
	text: string;
	path: string;
	className: string;
	buttonLabel: string;
	onClick?: (evt: any) => void; 
}

export const NavButton = ({ text, path, className, buttonLabel, onClick } : NavButtonProps) => {
	return(
		<NavLink 
			to={path} 
			className={className} 
			aria-label={buttonLabel}
			onClick={onClick}
		>
			{text}
		</NavLink>
	);
}
