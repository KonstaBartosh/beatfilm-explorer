import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./BurgerMenu.css";
import closeIcon from "../../../images/close_icon.svg";
import burgerIconBlack from "../../../images/icon_burger.svg";
import burgerIconWhite from "../../../images/burger-icon-white.svg";
import Navigation from "../Navigation/Navigation";
import Header from "../Header";


function BurgerMenu({ loggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const urlPath = useLocation();
  const iconBurger =
    urlPath.pathname === "/" ? burgerIconWhite : burgerIconBlack;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const burgerMenuMarkup = (
    <>
      <div className={`burger-menu__overlay ${isOpen ? "open" : ""}`} onClick={toggleMenu} />
      <nav className="burger-menu__container">
        <img
          onClick={toggleMenu}
          src={closeIcon}
          className="burger-menu__btn-close"
          alt="закрыть" />
        <ul className="burger-menu__nav">
          <li className="burger-menu__link">Главная</li>
          <li className="burger-menu__link">Фильмы</li>
          <li className="burger-menu__link">Сохраненные фильмы</li>
        </ul>
        <button className="burger-menu__btn-acc">Аккаунт</button>
      </nav>
    </>
  )

  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`}>
      <img
        onClick={toggleMenu}
        src={iconBurger}
        className="burger__icon"
        alt="меню"
      />
      {burgerMenuMarkup}
    </div>
  );
}

export default BurgerMenu;
