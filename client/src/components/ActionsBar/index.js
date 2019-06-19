import React from 'react';

import Container from './style';

import Spinner from '../Spinner';

const ActionsBar = props => {
  return (
    <Container>
      <form onSubmit={props.onSearch}>
        <div className="search-bar">
          <input
            type="text"
            onChange={props.inputChanged}
            name="searchFor"
            value={props.searchFor}
          />
          <button type="submit">{props.searching ? <Spinner /> : 'icon here'}</button>
        </div>

        <label>
          <input
            className="checkbox"
            type="checkbox"
            onChange={props.inputChanged}
            name="searchByTag"
            checked={props.searchByTag}
          />
          Search in tags only
        </label>
      </form>

      {props.showButton ? <button>+ ADD</button> : null}
    </Container>
  );
};

export default ActionsBar;
