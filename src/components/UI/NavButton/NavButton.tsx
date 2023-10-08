import { NavLink } from "react-router-dom";

interface NavButtonProps {
	text: string;
	path: string;
	className: string;
	onClick?: (evt) => void; 
}

const NavButton = ({ text, path, className, onClick } : NavButtonProps) => {
	return(
		<NavLink to={path} className={className} onClick={onClick}>
			{text}
		</NavLink>
	);
}

export default NavButton;
