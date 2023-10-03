import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./BurgerMenu.css";
// import closeIcon from "../../images/close_icon.svg";
// import burgerIcon from "../../images/burger-icon-white.svg";
const burgerIcon = require('../../images/burger-icon-white.svg') as string;
const closeIcon = require('../../images/close_icon.svg') as string;

function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`burger-menu ${isOpen && "open"}`}>
      <button className="burger__button">
        <img onClick={toggleMenu} src={burgerIcon} alt="меню" />
      </button>
      <div
        className={`burger-menu__overlay ${isOpen && "open"}`}
        onClick={toggleMenu}
      />
      <nav className="burger-menu__container">
        <img
          onClick={toggleMenu}
          src={closeIcon}
          className="burger-menu__btn-close"
          alt="закрыть"
        />
        <ul className="burger-menu__nav">
          <li className="burger-menu__li">
            <NavLink to="/" className="burger-menu__link" onClick={toggleMenu}>Главная</NavLink>
          </li>
          <li className="burger-menu__li">
            <NavLink to="movies" className="burger-menu__link" onClick={toggleMenu}>Фильмы</NavLink>
          </li>
          <li className="burger-menu__li">
            <NavLink to="/saved-movies"className="burger-menu__link" onClick={toggleMenu}>Сохраненные фильмы</NavLink>
          </li>
        </ul>
        <NavLink to="/profile" className="burger-menu__btn-acc" onClick={toggleMenu}>Аккаунт</NavLink>
      </nav>
    </div>
  );
}

export default BurgerMenu;
