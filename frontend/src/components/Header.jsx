import React, { memo, useState } from "react";
import logo from "../images/header__logo.svg";
import { useLocation, Link } from "react-router-dom";

const Header = memo(({ loggedIn, email, onLogoutClick }) => {
  let location = useLocation();
  const linkText = location.pathname === "/signup" ? "Войти" : "Регистрация";
  const linkPath = location.pathname === "/signup" ? "/signin" : "/signup";
  const [isInfoVisible, setInfoVisible] = useState(false);
  const classNameButton = `header__info-button button ${isInfoVisible ? "header__info-button_active" : ""}`;
  const classNameInfo = `header__info ${isInfoVisible ? "header__info_visible" : ""}`;

  const handleOpenInfoClick = () => {
    setInfoVisible(state => !state);
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип место" />
      {loggedIn ? (
        <>
          <div className={classNameInfo}>
            <p className="header__email">{email}</p>
            <button
              className="header__logout-button"
              type="button"
              onClick={onLogoutClick}
            >
              Выйти
            </button>
          </div>
          <button className={classNameButton} onClick={handleOpenInfoClick}></button>
        </>
      ) : (
        <Link to={linkPath} className="header__link link">
          {linkText}
        </Link>
      )}
    </header>
  );
});

export default Header;
