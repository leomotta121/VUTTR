import styled from 'styled-components';

import colors from '../../helper/colors';

const StyledInput = styled.input`
  height: 50px;
  margin-bottom: 15px;
  padding: 0 20px;
  font-size: 20px;
  display: block;
  background-color: ${colors.darker.white};
  border: 1px solid ${colors.darkest.white};
  border-radius: 5px;
`;

export default StyledInput;
