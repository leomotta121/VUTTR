import styled from 'styled-components';

import colors from '../../helper/colors';

const StyledDiv = styled.div`
  padding: 0.5em;
  margin: ${props => (props.mtb ? props.mtb : 10)}px auto;
  border: 1px solid ${colors.darkest.white};
  border-radius: 5px;
  box-shadow: 0px 5px 7px rgba(0, 0, 0, 0.1);
`;

export default StyledDiv;
