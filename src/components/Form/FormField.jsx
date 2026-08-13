export default function FormField({
  id,
  errorText,
  inputRef,
  fieldClassName = 'form__field',
  inputClassName = 'form__input',
  errorClassName = 'form__error-info',
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
