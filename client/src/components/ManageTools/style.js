import styled from 'styled-components';

import colors from '../../helper/colors';

const StyledForm = styled.form`
  button {
    display: block;
    margin-left: auto;
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

export default StyledForm;
