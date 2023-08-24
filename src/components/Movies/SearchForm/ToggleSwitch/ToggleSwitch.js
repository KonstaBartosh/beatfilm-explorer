import React from "react";

import "./ToggleSwitch.css";

export default function ToggleSwitch({}) {
	const www = () => console.log('test')
  return (
		<label className="toggle">
			<input type="checkbox" id="toggle"/>
			<span onClick={www} className="toggle__slider"></span>
		</label>
  );
}
