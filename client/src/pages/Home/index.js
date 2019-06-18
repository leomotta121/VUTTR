import React, { Component } from 'react';

import api from '../../services/api';
import { isAuthenticated } from '../../services/auth';

import Tool from '../../components/Tool';
import ActionsBar from '../../components/ActionsBar';

class Home extends Component {
  state = {
    tools: [],
    searchFor: '',
    authContent: false,
    searchByTag: false,
    searching: false,
    errorMessage: ''
  };

  async componentDidMount() {
    if (isAuthenticated()) this.setState({ authContent: true });
    try {
      const tools = await api.get('/tools');
      this.setState({ tools: tools.data });
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  }

  inputChangedHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  checkBoxChangedHandler = event => {
    console.log(event.target.checked);
    this.setState({ searchByTag: event.target.checked });
    console.log(this.state.searchByTag);
  };

  searchHandler = e => {
    e.preventDefault();

    this.setState({ searching: !this.state.searching });
    console.log(this.state.searchFor);
  };

  deleteToolHandler = () => {};

  render() {
    const { tools, errorMessage, searchFor, searchByTag, authContent, searching } = this.state;

    const error = <p>{errorMessage}</p>;

    return (
      <main>
        <h1>VUTTR</h1>
        <ActionsBar
          searchFor={searchFor}
          searchByTag={searchByTag}
          searching={searching}
          inputChanged={this.inputChangedHandler}
          checkBoxChanged={this.checkBoxChangedHandler}
          onSearch={this.searchHandler}
        />
        {tools
          ? tools.map(tool => (
              <Tool
                key={tool._id}
                title={tool.title}
                link={tool.link}
                description={tool.description}
                tags={tool.tags}
                showButton={authContent}
                onDelete={this.deleteToolHandler}
              />
            ))
          : error}
      </main>
    );
  }
}

export default Home;
