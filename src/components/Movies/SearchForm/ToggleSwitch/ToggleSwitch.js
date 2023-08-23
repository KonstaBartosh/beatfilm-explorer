import React from "react";

import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  return (
		<label className="toggle">
			<input type="checkbox" id="toggle"/>
			<span className="toggle__slider"></span>
		</label>
  );
}
