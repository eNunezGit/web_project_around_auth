export default function FormField({
  id,
  errorText,
  inputRef,
  fieldClassName = 'form__field',
  inputClassName = 'form-input',
  errorClassName = 'form-input__error-info',
  ...inputProps
}) {
  return (
    <label className={fieldClassName}>
      <input
        ref={inputRef}
        className={inputClassName}
        id={id}
        {...inputProps}
      />
      <span className={errorClassName} id={`${id}-error`}>{errorText}</span>
    </label>
  );
}
