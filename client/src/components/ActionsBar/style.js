import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 580px;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;

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
`;

export default Container;
