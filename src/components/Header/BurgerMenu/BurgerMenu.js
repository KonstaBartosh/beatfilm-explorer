import React from "react";

import "./BurgerMenu.css";
import closeIcon from "../../../images/close_icon.svg";

function BurgerMenu() {
  return (
    <div className="burger-menu">
      <nav className="burger-menu__container">
        <img src={closeIcon} className="burger-menu__btn-close" alt="закрыть" />
        <ul className="burger-menu__nav">
          <li className="burger-menu__link">Главная</li>
          <li className="burger-menu__link">Фильмы</li>
          <li className="burger-menu__link">Сохраненные фильмы</li>
        </ul>
        <button className="burger-menu__btn-acc">Аккаунт</button>
      </nav>
    </div>
  );
}

export default BurgerMenu;
