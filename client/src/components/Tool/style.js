import styled from 'styled-components';

const StyledArticle = styled.article`
  width: 100%;
  max-width: 580px;
  margin: 10px auto;
  border: solid 1px black;
  padding: 0.5em;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  header .actions button {
    margin: 0 5px;
  }
`;

export default StyledArticle;
