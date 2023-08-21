import React from "react";

import "./ToggleSwitch.css";

export default function ToggleSwitch() {
  return (
		<label class="toggle">
			<input type="checkbox" id="toggle"/>
			<span class="toggle__slider"></span>
		</label>
  );
}
