import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import colors from '../../helper/colors';

import StyledArticle from './style';
import Card from '../Card';
import Button from '../Button';

const Tool = props => {
  return (
    <Card>
      <StyledArticle>
        <header>
          <h2>
            <a href={`${props.link}`} rel="noopener noreferrer" target="_blank">
              {props.title}
            </a>
          </h2>
          {props.showButton ? (
            <div className="actions">
              <Button
                onClick={props.onDelete}
                bgColor={colors.regular.red}
                hoverColor={colors.dark.red}
                activeColor={colors.darker.red}
                fontColor={colors.regular.white}
              >
                Remove
              </Button>
              <Button
                onClick={props.onEdit}
                bgColor={colors.regular.blue}
                hoverColor={colors.dark.blue}
                activeColor={colors.darker.blue}
                fontColor={colors.regular.white}
              >
                Edit
              </Button>
            </div>
          ) : null}
        </header>

        <p>{props.description}</p>

        <footer>
          <p>
            {props.tags.map(tag => (
              <Link
                key={tag}
                to={`/?tag=${tag}`}
                onClick={() => props.getToolsByTag(tag)}
              >{`#${tag} `}</Link>
            ))}
          </p>
        </footer>
      </StyledArticle>
    </Card>
  );
};

export default withRouter(Tool);
