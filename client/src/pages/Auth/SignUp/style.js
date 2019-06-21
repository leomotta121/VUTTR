import styled from 'styled-components';

import colors from '../../../helper/colors';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.1em;
  max-width: 311px;

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

  h1 {
    margin: 20px 0;
  }

  label {
    line-height: 2;
  }

  a {
    display: inline-block;
    margin-top: 20px;
    font-size: 14px;
  }
`;

export default StyledForm;
