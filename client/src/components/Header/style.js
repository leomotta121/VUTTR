import styled from 'styled-components';

const StyledNav = styled.nav`
  background-color: black;
  height: 2rem;

  display: flex;
  justify-content: flex-end;

  .actions {
    display: flex;
    align-items: center;
  }

  .actions button {
    margin: 0 10px;
  }
`;

export default StyledNav;
