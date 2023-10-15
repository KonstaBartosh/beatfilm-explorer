import React from "react";
import { NavLink } from "react-router-dom";

interface NavButtonProps {
	text: string;
	path: string;
	className: string;
	onClick?: (evt: any) => void; 
}

export const NavButton = ({ text, path, className, onClick } : NavButtonProps) => {
	return(
		<NavLink to={path} className={className} onClick={onClick}>
			{text}
		</NavLink>
	);
}
