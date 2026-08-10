import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext.js';

export default function Login() {
  const { setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <>
      <div className="form-section page__section">
          <form
            className="popup__form login__form"
            name="login-form"
            id="login-form"
            noValidate
            onSubmit={handleSubmit}
          >
            <h1 className="">Inicia sesión</h1>
            <div className="popup__fieldset">
              <label className="popup__field">
                <input
                  className="popup__form-input"
                  id="login-email"
                  name="email"
                  placeholder="Correo electrónico"
                  required
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                <span className="popup__error-info" id="login-email-error">
                  Lore ipsum
                </span>
              </label>

              <label className="popup__field">
                <input
                  className="popup__form-input"
                  id="login-password"
                  name="password"
                  placeholder="Contraseña"
                  required
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span className="popup__error-info" id="login-password-error">
                  Lore ipsum
                </span>
              </label>
            </div>

            <button className="popup__submit-button" type="submit">
              <span className="popup__submit-button-text">Inicia sesión</span>
            </button>

            <p className="login__footer">
              ¿Aún no eres miembro?{" "}
              <a href="/signup" className="login__footer-link">
                  Regístrate aquí
              </a>
            </p>
          </form>
      </div>
    </>
  );
}
