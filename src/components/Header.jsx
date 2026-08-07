import headerLogo from '../images/header-logo.svg'

function Header() {
  return (
    <header className="header page__section">
      <div className="header__logo-container">
        <img
          className="header__logo"
          src={headerLogo}
          alt="Alrededor de E.U." />
      </div>
    </header>
  );
}

export default Header