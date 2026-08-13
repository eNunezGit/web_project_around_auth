import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext.js';

import headerLogo from '../images/header-logo.svg';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.pathname;

  const { isLoggedIn } = useContext(LoginContext);

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      route === "/signin"
      ? navigate("/signup")
      : navigate("/signin")
    } else {
      // elimina el jwt :P
    }
  };

  return (
    <header className="header page__section">
      <div className="header__logo-container">
        <img
          className="header__logo"
          src={headerLogo}
          alt="Alrededor de E.U." />
      </div>
      {!isLoggedIn
      ? (<div className="header__container">
          <button className="header__button" onClick={handleButtonClick}>
            <span className="header__text">{route === "/signin" ? "Regístrate" : "Iniciar sesión"}</span>
          </button>
        </div>)
      : (<div className="header__container">
          <p className="header__text">example@gmail.com</p>
          <button className="header__button" onClick={handleButtonClick}>
            <span className="header__text_gray">Cerrar sesión</span>
          </button>
        </div>)
      }
    </header>
  );
}

export default Header;