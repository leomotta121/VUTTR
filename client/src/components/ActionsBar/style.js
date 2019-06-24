import styled from 'styled-components';

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

    label {
      display: block;
      padding-left: 15px;
      padding-top: 5px;
      text-indent: -15px;
      font-size: 0.6rem;
    }

    label .checkbox {
      width: 13px;
      height: 13px;
      margin: 0 8px;
      padding: 0;
      vertical-align: bottom;
      position: relative;
      top: -1px;
      overflow: hidden;
    }
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
