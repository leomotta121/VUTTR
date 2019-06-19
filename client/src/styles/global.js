import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: 0;
}
body, html {
  background: #eee;
  font-family: 'PT Mono', monospace;
  font-size: 20px;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
`;

export default GlobalStyle;
