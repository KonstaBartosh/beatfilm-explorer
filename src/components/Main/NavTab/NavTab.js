import React from "react";

import "./NavTab.css";

export default function NavTab() {
  return (
    <nav className="nav-tab">
      <ul className="nav-tab__container">
        <li className="nav-tab__li">
          <a className="nav-tab__link" href="#about">О проекте</a>
        </li>
        <li className="nav-tab__li">
          <a className="nav-tab__link" href="#tech">Технологии</a>
        </li>
        <li className="nav-tab__li">
          <a className="nav-tab__link" href="#portfolio">Студент</a>
        </li>
      </ul>
    </nav>
  );
}
