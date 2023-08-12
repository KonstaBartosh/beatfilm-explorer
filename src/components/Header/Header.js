import React from "react";
import Navigation from "../Navigation/Navigation";
import './Header.css';
import logo from '../../images/logo.svg'

function Header({ loggedIn }) {
  const profileMarkup = loggedIn ? (
    <nav className="header__profile-account">
      <button className="header__button header__button_account">Аккаунт</button>
    </nav>
  ) : (
    <nav className="header__profile-nav">
      <button className="header__button header__button_register">Регистрация</button>
      <button className="header__button header__button_logout">Войти</button>
    </nav>
  );

  return (
    <div className="header">
      <div className="header__container">
        <img src={logo} alt="логотип" className="header__logo" />
        {loggedIn ? <Navigation /> : null}
        {profileMarkup}
      </div>
    </div>
  );
}

export default Header;
