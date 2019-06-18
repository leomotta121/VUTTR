import React from 'react';

import Spinner from '../Spinner';

const ActionsBar = props => {
  return (
    <div>
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

        <input
          type="checkbox"
          onChange={props.checkBoxChanged}
          name="searchByTag"
          checked={props.searchByTag}
        />
      </form>

      <button>+ Add</button>
    </div>
  );
};

export default ActionsBar;
