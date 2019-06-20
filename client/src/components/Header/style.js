import styled from 'styled-components';
import colors from '../../helper/colors';

const StyledNav = styled.nav`
  background-color: ${colors.regular.ink};
  height: 2.5rem;

  display: flex;
  justify-content: flex-end;

  .actions {
    display: flex;
    align-items: center;
  }

  .actions a {
    margin: 0 10px;
    text-decoration: none;
    color: ${colors.regular.white};
    font-size: 16px;
    padding: 7px 13px;
    border-radius: 5px;
  }

  .actions .sign-up {
    border: 1px solid ${colors.regular.blue};
    background-color: ${colors.regular.blue};
  }

  .actions .sign-up:hover {
    border: 1px solid ${colors.dark.blue};
    background-color: ${colors.dark.blue};
  }

  .actions .sign-up:active {
    border: 1px solid ${colors.darker.blue};
    background-color: ${colors.darker.blue};
  }

  .actions .sign-out {
    border: 1px solid ${colors.regular.red};
    background-color: ${colors.regular.red};
  }

  .actions .sign-out:hover {
    border: 1px solid ${colors.dark.red};
    background-color: ${colors.dark.red};
  }

  .actions .sign-out:active {
    border: 1px solid ${colors.darker.red};
    background-color: ${colors.darker.red};
  }
`;

export default StyledNav;
