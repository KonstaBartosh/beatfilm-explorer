import React from "react";

import "./ToggleSwitch.css";

interface ToggleSwitcherProps {
	isToggled: boolean;
	onToggle: () => void;
}


export const ToggleSwitch = ({ onToggle, isToggled }: ToggleSwitcherProps) => {
  return (
		<label className="toggle">
			<input
				type="checkbox" 
				id="toggle" 
				aria-label="Короткометражки" 
				checked={isToggled} 
				onChange={onToggle}
			/>
			<span className="toggle__slider"></span>
		</label>
  );
}