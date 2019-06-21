import React from 'react';

import { withRouter, Link } from 'react-router-dom';

import { isAuthenticated, logout } from '../../services/auth';
import StyledNav from './style';

const Header = props => {
  const isAuth = isAuthenticated();
  const pathName = props.location.pathname;

  let signup = (
    <Link to="/signup" className="sign-up">
      Sign Up
    </Link>
  );

  let signin = <Link to="/signin">Sign In</Link>;

  if (pathName === '/signup') signup = null;

  if (pathName === '/signin') signin = null;

  return (
    <StyledNav>
      {isAuth ? (
        <div className="actions">
          <Link to="/" className="sign-out" onClick={() => logout()}>
            Sign out
          </Link>
        </div>
      ) : (
        <div className="actions">
          {signin}
          {signup}
        </div>
      )}
    </StyledNav>
  );
};

export default withRouter(Header);
