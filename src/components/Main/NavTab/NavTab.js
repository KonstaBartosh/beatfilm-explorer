import React from "react";

import "./NavTab.css";

export default function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__container">
        <li className="nav-tab__link">О проекте</li>
        <li className="nav-tab__link">Технологии</li>
        <li className="nav-tab__link">Студент</li>
      </ul>
    </nav>
  );
}
