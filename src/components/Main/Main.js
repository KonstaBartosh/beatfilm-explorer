import React from "react";

import Promo from "./Promo/Promo";
import NavTab from "./NavTab/NavTab";
import AboutProject from "./AboutProject/AboutProject";

export default function Main() {
	return(
		<>
			<Promo />
			<NavTab />
			<AboutProject />
		</>
	)
}