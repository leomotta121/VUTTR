import React from 'react';

import Container from './style';

const Input = ({
  liveValidator,
  afterSubmitValidator,
  name,
  label,
  isEmailTaken,
  emailTakenMessage,
  customPasswordMessage,
  customEmailMessage,
  ...rest
}) => {
  let hasErrorClass = null;
  let errorMessage = null;

  if (liveValidator && liveValidator.isInvalid) {
    hasErrorClass = 'has-error';
  } else if (afterSubmitValidator && afterSubmitValidator.isInvalid) {
    hasErrorClass = 'has-error';
  } else if (isEmailTaken || customEmailMessage || customPasswordMessage) {
    hasErrorClass = 'has-error';
  }

  if (liveValidator && liveValidator.message) {
    errorMessage = liveValidator.message;
  } else if (afterSubmitValidator && afterSubmitValidator.message) {
    errorMessage = afterSubmitValidator.message;
  } else if (isEmailTaken) {
    errorMessage = emailTakenMessage;
  } else if (customEmailMessage) {
    errorMessage = customEmailMessage;
  } else if (customPasswordMessage) {
    errorMessage = customPasswordMessage;
  }

  return (
    <Container className={hasErrorClass ? hasErrorClass : null}>
      {label ? <label htmlFor={name}>{`${label}:`}</label> : null}

      <input name={name} {...rest} />
      <span className="error-message">{errorMessage ? errorMessage : null}</span>
    </Container>
  );
};

export default Input;
