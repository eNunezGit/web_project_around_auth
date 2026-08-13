export default function Form({
  name,
  id,
  onSubmit,
  submitText,
  children,
  formClassName = 'form',
  fieldsetClassName = 'form__fieldset',
  submitClassName = 'form__submit-button',
  submitTextClassName = 'form__submit-button-text',
}) {
  return (
    <form
      className={formClassName}
      name={name}
      id={id}
      noValidate
      onSubmit={onSubmit}
    >
      <div className={fieldsetClassName}>
        {children}
      </div>
      <button className={submitClassName} type="submit">
        <span className={submitTextClassName}>{submitText}</span>
      </button>
    </form>
  );
}
