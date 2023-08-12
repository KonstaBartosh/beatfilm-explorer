import React from "react";
import Navigation from "../Navigation/Navigation";
import './Header.css';
import logo from '../../images/logo.svg';
import burgerIcon from '../../images/icon_burger.svg'
import BurgerMenu from "./BurgerMenu/BurgerMenu";

function Header({ loggedIn }) {
  const profileMarkup = loggedIn ? (
    <button className="header__button header__button_account">Аккаунт</button>
  ) : (
    <nav className="header__profile-nav">
      <button className="header__button header__button_register">Регистрация</button>
      <button className="header__button header__button_logout">Войти</button>
    </nav>
  );

  return (
    <div className="header">
      <div className="header__container">
        <img src={logo} className="header__logo" alt="логотип" />
        {loggedIn ? <Navigation /> : null}
        {profileMarkup}
				<BurgerMenu />
      </div>
    </div>
  );
}

export default Header;
