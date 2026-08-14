import { useState } from "react";
import { Link } from "react-router-dom";

import Form from "../Form/Form";
import FormField from "../Form/FormField";
import Popup from "../Popup/Popup.jsx";
import Tooltip from "../Popup/Tooltip.jsx";
import { useFormValidation } from "../../hooks/useFormValidation";

function Register() {
  const { errors, isValid, handleValidation } = useFormValidation();

  // null = tooltip cerrado, true = registro exitoso, false = falló
  const [authStatus, setAuthStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    setAuthStatus(true);

    // TODO: reemplazar por la llamada real cuando exista api.register
    // api.register({ email, password })
    //   .then(() => setAuthStatus(true))
    //   .catch(() => setAuthStatus(false));
  }

  return (
    <div className="auth page__section">
      <p className="auth__title">Regístrate</p>
      <Form
        name="auth-register"
        id="auth-register"
        onSubmit={handleSubmit}
        submitText="Regístrate"
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
        ¿Ya eres miembro?{" "}
        <Link to="/signin">Inicia sesión aquí</Link>
      </p>
      {authStatus !== null && (
        <Popup onClose={() => setAuthStatus(null)} variant="tooltip">
          <Tooltip
            isSuccess={authStatus}
            message={
              authStatus
                ? "¡Correcto! Ya estás registrado."
                : "Uy, algo salió mal. Por favor, inténtalo de nuevo."
            }
          />
        </Popup>
      )}
    </div>
    );
}

export default Register;
