import React from 'react';

import { isAuthenticated } from '../../services/auth';
import StyledNav from './style';

const Header = () => {
  const isAuth = isAuthenticated();

  return (
    <StyledNav>
      {isAuth ? (
        <div className="actions">
          <button>Sign out</button>
        </div>
      ) : (
        <div className="actions">
          <button>Sign in</button>
          <button>Sign up</button>
        </div>
      )}
    </StyledNav>
  );
};

export default Header;
