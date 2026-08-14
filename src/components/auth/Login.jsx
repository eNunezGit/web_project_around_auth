import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Form from "../Form/Form";
import FormField from "../Form/FormField";
import Popup from "../Popup/Popup.jsx";
import Tooltip from "../Popup/Tooltip.jsx";
import { useFormValidation } from "../../hooks/useFormValidation";
import { LoginContext } from "../../contexts/LoginContext.js";

function Login() {
  const { handleLogin } = useContext(LoginContext);
  const { errors, isValid, handleValidation } = useFormValidation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // null = tooltip cerrado, true = autenticación exitosa, false = falló
  const [authStatus, setAuthStatus] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    handleValidation(event);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    handleValidation(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleLogin({ email, password })
      .then(() => setAuthStatus(true))
      .catch(() => setAuthStatus(false));
  }

  return (
    <div className="auth page__section">
      <p className="auth__title">Inicia sesión</p>
      <Form
        name="auth-login"
        id="auth-login"
        onSubmit={handleSubmit}
        submitText="Inicia sesión"
        submitDisabled={!isValid}
      >
        <FormField
          id="auth-email"
          name="auth-email"
          placeholder="Correo electrónico"
          required
          type="email"
          value={email}
          onChange={handleEmailChange}
          errorText={errors["auth-email"]}
        />
        <FormField
          id="auth-password"
          name="auth-password"
          placeholder="Contraseña"
          required
          type="password"
          value={password}
          onChange={handlePasswordChange}
          errorText={errors["auth-password"]}
        />
      </Form>
      <p className="auth__footer">
        ¿Aún no eres miembro?{" "}
        <Link to="/signup">Regístrate aquí</Link>
      </p>
      {authStatus !== null && (
        <Popup onClose={() => setAuthStatus(null)} variant="tooltip">
          <Tooltip
            isSuccess={authStatus}
            message={
              authStatus
                ? "¡Inicio de sesión exitoso!"
                : "Correo o contraseña incorrectos. Inténtalo de nuevo."
            }
          />
        </Popup>
      )}
    </div>
    );
}

export default Login;
