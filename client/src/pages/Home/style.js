import styled from 'styled-components';

import colors from '../../helper/colors';

const StyledMain = styled.main`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 1em;

  h1,
  h3 {
    max-width: 580px;
    margin: 10px auto;
  }

  .error-message {
    text-align: center;
    margin: 2.4em 0;
  }

  .pagination-container {
    display: block;
    margin: 0 auto;
    text-align: center;

    li {
      display: inline-block;
      padding: 2px;
      margin: 4px;
      cursor: pointer;

      .active {
        color: ${colors.regular.ink};
      }

      a {
        font-size: 18px;
        color: ${colors.regular.blue};
      }
    }
  }
`;

export default StyledMain;
