import React from 'react';

import StyledArticle from './style';

const Tool = props => {
  return (
    <StyledArticle>
      <header>
        <h2>
          <a href={`http://${props.link}`} rel="noopener noreferrer" target="_blank">
            {props.title}
          </a>
        </h2>
        {props.showButton ? <button onClick={() => {}}>Remove</button> : null}
      </header>

      <p>{props.description}</p>

      <footer>
        <p>{props.tags.map(tag => `#${tag} `)}</p>
      </footer>
    </StyledArticle>
  );
};

export default Tool;
