import React from "react";

import "./ToggleSwitch.css";

export default function ToggleSwitch({ onToggle, isToggled }) {
  return (
		<label className="toggle">
			<input type="checkbox" id="toggle" checked={isToggled} onChange={onToggle}/>
			<span className="toggle__slider"></span>
		</label>
  );
}
