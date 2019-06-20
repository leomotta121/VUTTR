import styled from 'styled-components';
import colors from '../../helper/colors';

const styledFooter = styled.footer`
  background-color: ${colors.light.ink};
  padding: 1em;

  p {
    color: ${colors.regular.white};
    text-align: center;
  }
`;

export default styledFooter;
