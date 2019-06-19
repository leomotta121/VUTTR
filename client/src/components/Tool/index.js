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
        {props.showButton ? (
          <div className="actions">
            <button onClick={props.onDelete}>Remove</button>
            <button>Edit</button>
          </div>
        ) : null}
      </header>

      <p>{props.description}</p>

      <footer>
        <p>{props.tags.map(tag => `#${tag} `)}</p>
      </footer>
    </StyledArticle>
  );
};

export default Tool;
