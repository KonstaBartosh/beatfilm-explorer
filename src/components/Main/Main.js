import React from "react";

import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";
import Tech from "./Techs/Tech";
import Portfolio from "./Portfolio/Portfolio";

export default function Main() {
	return(
		<>
			<Promo />
			<NavTab />
			<AboutProject />
			<Tech />
			<Portfolio />
		</>
	)
}