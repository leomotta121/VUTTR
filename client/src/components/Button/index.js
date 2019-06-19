import React from 'react';

import StyledButton from './style';

const Button = props => {
  return (
    <StyledButton
      className="my-button"
      type={props.type}
      disabled={props.disabled}
      bgColor={props.bgColor}
      fontColor={props.fontColor}
      hoverColor={props.hoverColor}
      activeColor={props.activeColor}
      onClick={props.onClick}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
