import React from "react";

import "./ToggleSwitch.css";

export default function ToggleSwitch({ onToggle, isToggled }) {
  return (
		<label className="toggle">
			<input type="checkbox" id="toggle" defaultChecked={isToggled}/>
			<span onClick={onToggle} className="toggle__slider"></span>
		</label>
  );
}
