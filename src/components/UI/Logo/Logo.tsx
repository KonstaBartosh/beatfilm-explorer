import './Logo.css';
import logo from '../../../images/beat-logo.svg';
import { NavLink } from "react-router-dom";


export const Logo = () => {
	return(
		<NavLink to="/">
			<img src={logo} className="logo" alt="логотип" />
		</NavLink>
	);
}