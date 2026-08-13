export default function Form({
  name,
  id,
  onSubmit,
  submitText,
  submitDisabled = false,
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
      <button
        className={submitDisabled ? `${submitClassName} ${submitClassName}_disabled` : submitClassName}
        type="submit"
        disabled={submitDisabled}
      >
        <span className={submitTextClassName}>{submitText}</span>
      </button>
    </form>
  );
}
