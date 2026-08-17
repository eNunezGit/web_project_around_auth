import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Form from "../Form/Form.jsx";
import FormField from "../Form/FormField.jsx";
import { useFormValidation } from "../../hooks/useFormValidation.js";
import { LoginContext } from "../../contexts/LoginContext.js";

function Register() {
  const { handleRegister } = useContext(LoginContext);
  const { errors, isValid, handleValidation } = useFormValidation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    handleRegister({ email, password });
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
        ¿Ya eres miembro?{" "}
        <Link to="/signin">Inicia sesión aquí</Link>
      </p>
    </div>
    );
}

export default Register;
