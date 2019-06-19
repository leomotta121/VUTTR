import React from 'react';

import { withRouter, Link } from 'react-router-dom';

import { isAuthenticated, logout } from '../../services/auth';
import StyledNav from './style';

const Header = () => {
  const isAuth = isAuthenticated();

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
          <Link to="/signin">Sign In</Link>
          <Link to="/signup" className="sign-up">
            Sign Up
          </Link>
        </div>
      )}
    </StyledNav>
  );
};

export default withRouter(Header);
