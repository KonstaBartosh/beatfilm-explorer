import React from "react";

import "./ToggleSwitch.css";

interface ToggleSwitcherProps {
	isToggled: boolean;
	onToggle: () => void;
}

function ToggleSwitch({ onToggle, isToggled }: ToggleSwitcherProps) {
  return (
		<label className="toggle">
			<input type="checkbox" id="toggle" checked={isToggled} onChange={onToggle}/>
			<span className="toggle__slider"></span>
		</label>
  );
}

export default ToggleSwitch;