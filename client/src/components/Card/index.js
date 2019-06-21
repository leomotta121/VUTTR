import React from 'react';

import StyledDiv from './style';

const Card = ({ children, ...rest }) => <StyledDiv {...rest}>{children}</StyledDiv>;

export default Card;
