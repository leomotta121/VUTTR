import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.bgColor};
  border: 1px solid ${props => props.bgColor};
  color: ${props => props.fontColor};
  cursor: pointer;
  text-decoration: none;
  border-radius: 5px;
  padding: 14px 26px;
  font-size: 18px;

  :hover {
    background-color: ${props => props.hoverColor};
    border: 1px solid ${props => props.hoverColor};
  }

  :active {
    background-color: ${props => props.activeColor};
    border: 1px solid ${props => props.activeColor};
  }
`;

export default StyledButton;
