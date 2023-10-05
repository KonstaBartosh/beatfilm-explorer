  import React, { useState } from "react";

  import "./BurgerMenu.css";
  import closeIcon from "../../images/close_icon.svg";
  import burgerIcon from "../../images/burger-icon-white.svg";
  import NavButton from "../UI/NavButton/NavButton";

  function BurgerMenu() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
              <NavButton
                text="Главная"
                path="/"
                className="burger-menu__link"
                onClick={toggleMenu}
              />
            </li>
            <li className="burger-menu__li">
              <NavButton
                text="Сохраненные фильмы"
                path="/saved-movies"
                className="burger-menu__link"
                onClick={toggleMenu}
              />
            </li>
          </ul>
          <NavButton
            text="Аккаунт"
            path="/profile"
            className="burger-menu__btn-acc"
            onClick={toggleMenu}
          />
        </nav>
      </div>
    );
  }

  export default BurgerMenu;
