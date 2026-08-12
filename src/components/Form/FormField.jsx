export default function FormField({
  id,
  errorText,
  inputRef,
  fieldClassName = 'popup__field',
  inputClassName = 'popup__form-input',
  errorClassName = 'popup__error-info',
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
