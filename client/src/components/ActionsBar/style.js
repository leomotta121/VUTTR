import styled from 'styled-components';
import colors from '../../helper/colors';

const Container = styled.div`
  width: 100%;
  max-width: 580px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .add-button {
    border-radius: 100%;
    height: 45px;
    width: 45px;
    padding: 0;
    margin: 0;
    font-size: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .search-bar {
      display: flex;

      input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .search-button {
        height: 50px;
        width: 50px;
        padding: 0;

        border-top-left-radius: 0;
        border-bottom-left-radius: 0;

        margin: 0;

        svg {
          height: 20px;
        }
      }
    }
  }

  .container {
    display: block;
    position: relative;
    padding-left: 25px;
    margin-bottom: 12px;
    cursor: pointer;
    user-select: none;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 15px;
    width: 15px;
    background-color: ${colors.darker.white};
    border: 1px solid ${colors.darkest.white};
    border-radius: 5px;
    margin-top: 5px;
  }

  .container:hover input ~ .checkmark {
    background-color: ${colors.darkest.white};
  }

  .container input:checked ~ .checkmark {
    background-color: ${colors.regular.blue};
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  .container input:checked ~ .checkmark:after {
    display: block;
  }

  .container .checkmark:after {
    left: 4px;
    top: 2px;
    width: 3px;
    height: 6px;
    border: solid ${colors.regular.white};
    border-width: 0 1.5px 1.5px 0;
    transform: rotate(45deg);
  }

  @media (max-width: 460px) {
    flex-direction: column;

    .add-button {
      position: fixed;
      z-index: 100;
      right: 10%;
      bottom: 5%;
    }
  }
`;

export default Container;
