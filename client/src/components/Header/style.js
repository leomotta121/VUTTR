import styled from 'styled-components';

const StyledNav = styled.nav`
  background-color: #170c3a;
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
    color: #ffffff;
    font-size: 16px;
    padding: 7px 13px;
    border-radius: 5px;
  }

  .actions .sign-up {
    border: 1px solid #365df0;
    background-color: #365df0;
  }

  .actions .sign-up:hover {
    border: 1px solid #2f55cc;
    background-color: #2f55cc;
  }

  .actions .sign-up:active {
    border: 1px solid #244aa8;
    background-color: #244aa8;
  }

  .actions .sign-out {
    border: 1px solid #f95e5a;
    background-color: #f95e5a;
  }

  .actions .sign-out:hover {
    border: 1px solid #cc4c4c;
    background-color: #cc4c4c;
  }

  .actions .sign-out:active {
    border: 1px solid #a53f3f;
    background-color: #a53f3f;
  }
`;

export default StyledNav;
