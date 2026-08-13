import { useState, useCallback } from 'react';

// Equivalente en React a FormValidation.js: usa la misma Constraint
// Validation API nativa (validity.valid / validationMessage / checkValidity)
// que el input ya expone gracias a required/minLength/maxLength/type, pero
// en vez de mutar el DOM a mano expone el resultado como estado.
export function useFormValidation() {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Se cuelga del onChange de cada input.
  const handleValidation = useCallback((event) => {
    const input = event.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [input.id]: input.validationMessage,
    }));
    // input.form.checkValidity() revisa TODOS los campos del <form>,
    // igual que _hasInvalidInput recorría inputList completo.
    setIsValid(input.form.checkValidity());
  }, []);

  const resetValidation = useCallback(() => {
    setErrors({});
    setIsValid(false);
  }, []);

  return { errors, isValid, handleValidation, resetValidation };
}
