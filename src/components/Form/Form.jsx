export default function Form({
  name,
  id,
  onSubmit,
  submitText,
  children,
  formClassName = 'popup__form',
  fieldsetClassName = 'popup__fieldset',
  submitClassName = 'popup__submit-button',
  submitTextClassName = 'popup__submit-button-text',
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
