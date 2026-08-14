import { useState } from "react";
import { Link } from "react-router-dom";

import Form from "../Form/Form";
import FormField from "../Form/FormField";
import Popup from "../Popup/Popup.jsx";
import Tooltip from "../Popup/Tooltip.jsx";
import { useFormValidation } from "../../hooks/useFormValidation";

function Login() {
  const { errors, isValid, handleValidation } = useFormValidation();

  // null = tooltip cerrado, true = autenticación exitosa, false = falló
  const [authStatus, setAuthStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    setAuthStatus(true);

    // TODO: reemplazar por la llamada real cuando exista api.login
    // api.login({ email, password })
    //   .then(() => setAuthStatus(true))
    //   .catch(() => setAuthStatus(false));
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
          onChange={handleValidation}
          errorText={errors["auth-email"]}
        />
        <FormField
          id="auth-password"
          name="auth-password"
          placeholder="Contraseña"
          required
          type="password"
          onChange={handleValidation}
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
