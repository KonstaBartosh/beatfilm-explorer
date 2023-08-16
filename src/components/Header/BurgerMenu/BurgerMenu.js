import React, { useState } from "react";
import "./BurgerMenu.css";
import closeIcon from "../../../images/close_icon.svg";
import burgerIcon from "../../../images/icon_burger.svg";

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={`burger-menu ${isOpen ? "open" : ""}`}>
        <div
          className={`burger-menu__overlay ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
        ></div>
        <img
          onClick={toggleMenu}
          src={burgerIcon}
          className="burger__icon"
          alt="меню"
        />
        <nav className="burger-menu__container">
          <img
            onClick={toggleMenu}
            src={closeIcon}
            className="burger-menu__btn-close"
            alt="закрыть"
          />
          <ul className="burger-menu__nav">
            <li className="burger-menu__link">Главная</li>
            <li className="burger-menu__link">Фильмы</li>
            <li className="burger-menu__link">Сохраненные фильмы</li>
          </ul>
          <button className="burger-menu__btn-acc">Аккаунт</button>
        </nav>
      </div>
    </>
  );
}

export default BurgerMenu;
