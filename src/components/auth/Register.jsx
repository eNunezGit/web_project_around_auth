import { Link } from "react-router-dom";

import Form from "../Form/Form";
import FormField from "../Form/FormField";

function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className="auth page__section">
      <p className="auth__title">Regístrate</p>
      <Form
        name="auth-login"
        id="auth-login"
        onSubmit={handleSubmit}
        submitText="Regístrate"
      >
        <FormField
          id="auth-email"
          name="avatar-url"
          placeholder="Correo electrónico"
          required
          type="email"
          errorText="Lore ipsum"
        />
        <FormField
          id="auth-password"
          name="auth-password"
          placeholder="Contraseña"
          required
          type="password"
          errorText="Lore ipsum"
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