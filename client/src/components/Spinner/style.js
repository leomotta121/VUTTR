import styled, { keyframes } from 'styled-components';
import colors from '../../helper/colors';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1.2s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid transparent;
  border-right: 2px solid ${colors.regular.ink};
  border-bottom: 2px solid ${colors.regular.ink};
  border-left: 2px solid ${colors.regular.ink};
  background: transparent;
  height: 15px;
  width: 15px;
  border-radius: 50%;
`;

export default Spinner;
