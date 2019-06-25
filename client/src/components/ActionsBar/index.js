import React from 'react';

import Container from './style';
import colors from '../../helper/colors';

import { ReactComponent as SearchIcon } from '../../assets/Icon-Search-2px.svg';
import Input from '../Input';
import Spinner from '../Spinner';
import Button from '../Button';

const ActionsBar = props => {
  return (
    <Container>
      <form onSubmit={props.onSearch}>
        <div className="search-bar">
          <Input
            type="text"
            onChange={props.inputChanged}
            name="searchFor"
            value={props.searchFor}
          />
          <Button
            className="search-button"
            type="submit"
            bgColor={colors.regular.blue}
            hoverColor={colors.dark.blue}
            activeColor={colors.darker.blue}
            fontColor={colors.regular.white}
          >
            {props.searching ? <Spinner /> : <SearchIcon />}
          </Button>
        </div>

        <label className="container">
          <input
            className="checkbox"
            type="checkbox"
            onChange={props.inputChanged}
            name="searchByTag"
            checked={props.searchByTag}
          />
          <span className="checkmark" />
          Search in tags only
        </label>
      </form>
      {props.showButton ? (
        <Button
          onClick={props.toggleShow}
          className="add-button"
          bgColor={colors.regular.blue}
          hoverColor={colors.dark.blue}
          activeColor={colors.darker.blue}
          fontColor={colors.regular.white}
        >
          +
        </Button>
      ) : null}
    </Container>
  );
};

export default ActionsBar;
