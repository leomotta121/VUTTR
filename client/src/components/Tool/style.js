import styled from 'styled-components';

const StyledArticle = styled.article`
  width: 100%;
  max-width: 580px;
  margin: 10px auto;
  padding: 0.5em;

  a {
    text-decoration: none;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  header .actions button {
    margin: 0 5px;
  }

  footer {
    margin-top: 10px;
  }
`;

export default StyledArticle;
