import React from "react";

import './Header.css';
import Navigation from "./Navigation/Navigation";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import logo from '../../images/logo.svg';

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
				{loggedIn ? <BurgerMenu /> : null}
      </div>
    </div>
  )
}

export default Header;
