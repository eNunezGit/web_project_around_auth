import { Link } from "react-router-dom";

import Form from "../Form/Form";
import FormField from "../Form/FormField";
import { useFormValidation } from "../../utils/useFormValidation";

function Register() {
  const { errors, isValid, handleValidation } = useFormValidation();

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
    </div>
    );
}

export default Register;
