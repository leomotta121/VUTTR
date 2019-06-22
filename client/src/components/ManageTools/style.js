import styled from 'styled-components';

import colors from '../../helper/colors';

const Container = styled.div`
  button {
    display: block;
    margin-left: auto;
  }

  .tag-container {
    display: inline-block;
    margin: 2px;
    font-size: 18px;
    padding: 5px;

    .delete-tag {
      cursor: pointer;
      color: ${colors.light.ink};
    }
  }

  .has-error {
    input {
      background-color: ${colors.mostLightest.red};
      border-color: ${colors.regular.red};

      ::placeholder {
        color: ${colors.regular.red};
      }
    }

    .error-message {
      display: block;
      text-align: right;
      font-size: 18px;
      margin-top: -12px;
      color: ${colors.regular.red};
    }
  }
`;

export default Container;
