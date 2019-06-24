import React from 'react';
import Card from '../../Card';

const Tags = ({ tags, removeTagHandler }) => {
  return tags.map(tag => (
    <Card key={tag} className="tag-container">
      <span className="delete-tag" onClick={() => removeTagHandler(tag)}>
        x
      </span>
      <span className="tag"> {`#${tag}`}</span>
    </Card>
  ));
};

export default Tags;
