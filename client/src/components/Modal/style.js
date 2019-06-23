import styled from 'styled-components';

import colors from '../../helper/colors';

const StyledDiv = styled.div`
  position: fixed;
  z-index: 500;

  max-height: 520px;
  width: 400px;
  overflow: ${props => (props.overflow ? props.overflow : 'scroll')};
  overflow-x: hidden;

  left: 50%;
  top: 10%;
  margin-left: -200px;

  background-color: #fff;
  padding: 0.5em;
  border: 1px solid ${colors.darkest.white};
  border-radius: 5px;
  box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.1);

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 20px;

    div {
      cursor: pointer;
      padding: 5px;
    }

    h3 {
      margin: 0;
      display: inline;
      text-align: left;
    }
  }

  @media (max-width: 450px) {
    top: 1%;
    max-height: 420px;
    width: 315px;
    margin-left: -157.5px;
  }
`;

export default StyledDiv;
