export default function FormField({
  id,
  errorText = '',
  inputRef,
  fieldClassName = 'form__field',
  inputClassName = 'form__input',
  errorClassName = 'form__error-info',
  ...inputProps
}) {
  const hasError = Boolean(errorText);

  return (
    <label className={fieldClassName}>
      <input
        ref={inputRef}
        className={hasError ? `${inputClassName} ${inputClassName}_error` : inputClassName}
        id={id}
        {...inputProps}
      />
      <span className={hasError ? `${errorClassName} ${errorClassName}_visible` : errorClassName} id={`${id}-error`}>
        {errorText}
      </span>
    </label>
  );
}