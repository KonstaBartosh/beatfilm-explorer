import React from "react";

import "./ToggleSwitch.css";

export default function ToggleSwitch({ onToggle }) {
  return (
		<label className="toggle">
			<input type="checkbox" id="toggle"/>
			<span onClick={onToggle} className="toggle__slider"></span>
		</label>
  );
}
