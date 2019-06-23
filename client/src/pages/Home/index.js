import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toolsActions from '../../store/ducks/tools';

import api from '../../services/api';
import { isAuthenticated } from '../../services/auth';

import StyledMain from './style';
import Tool from '../../components/Tool';
import ActionsBar from '../../components/ActionsBar';
import ManageTools from '../../components/ManageTools';

class Home extends Component {
  state = {
    tool: {},
    searchFor: '',
    authContent: false,
    searchByTag: false,
    searching: false,
    showAddToolModal: false,
    errorMessage: ''
  };

  async componentDidMount() {
    if (isAuthenticated()) this.setState({ authContent: true });

    try {
      const tools = await api.get('/tools');
      this.props.setTools(tools.data);
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  }

  inputChangedHandler = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({ [name]: value });
  };

  searchHandler = async e => {
    e.preventDefault();

    this.setState({ searching: true });

    const searchFor = this.state.searchFor;

    if (this.state.searchByTag) {
      try {
        const tools = await api.get(`/tools?tag=${searchFor}`);
        this.setState({ searching: false });
        this.props.setTools(tools.data);
        this.props.history.push(`/?tag=${searchFor}`);
      } catch (error) {
        const errorMessage = error.response.data.message;
        this.setState({ errorMessage, searching: false });
      }
    } else {
      try {
        const tools = await api.get(`/tools?title=${searchFor}`);
        this.setState({ searching: false });
        this.props.setTools(tools.data);

        this.props.history.push(`/?title=${searchFor}`);
      } catch (error) {
        const errorMessage = error.response.data.message;
        this.setState({ errorMessage, searching: false });
      }
    }
  };

  tagClickedHandler = async tag => {
    try {
      const tools = await api.get(`/tools?tag=${tag}`);
      this.setState({ searching: false });
      this.props.setTools(tools.data);
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  deleteToolHandler = async id => {
    try {
      await api.delete(`/tools/${id}`);

      const tools = this.props.tools.filter(tool => tool._id !== id);

      this.props.setTools(tools);
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  editToolHandler = tool => {
    this.toggleModalHandler();
    this.setState({ tool });
  };

  toggleModalHandler = () => {
    this.setState({ showAddToolModal: !this.state.showAddToolModal, tool: {} });
  };

  render() {
    const { searchFor, searchByTag, authContent, searching, showAddToolModal } = this.state;

    const addTool = (
      <ManageTools
        toggleShow={this.toggleModalHandler}
        show={this.state.showAddToolModal}
        tool={this.state.tool}
      >
        test modaltest modaltest modaltest modaltest modaltest modal
      </ManageTools>
    );

    return (
      <StyledMain>
        <h1>VUTTR</h1>
        <h3>Very Useful Tools to Remember</h3>

        {showAddToolModal ? addTool : null}

        <ActionsBar
          searchFor={searchFor}
          searchByTag={searchByTag}
          searching={searching}
          inputChanged={this.inputChangedHandler}
          onSearch={this.searchHandler}
          showButton={authContent}
          toggleShow={this.toggleModalHandler}
        />
        {this.props.tools
          ? this.props.tools.map(tool => (
              <Tool
                key={tool._id}
                title={tool.title}
                link={tool.link}
                description={tool.description}
                tags={tool.tags}
                showButton={authContent}
                onDelete={() => this.deleteToolHandler(tool._id)}
                onEdit={() => this.editToolHandler(tool)}
                getToolsByTag={this.tagClickedHandler}
              />
            ))
          : null}
      </StyledMain>
    );
  }
}

const mapStateToProps = state => ({
  tools: state.toolsReducer.tools
});

const mapDispatchToProps = dispatch => bindActionCreators(toolsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
