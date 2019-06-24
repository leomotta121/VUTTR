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
    action: '',
    searchFor: '',
    authContent: false,
    searchByTag: false,
    searching: false,
    showManageTool: false
  };

  async componentDidMount() {
    if (isAuthenticated()) this.setState({ authContent: true });

    try {
      const tools = await api.get('/tools');
      this.props.setTools(tools.data);
    } catch (error) {
      if (error.response.status === 500) this.props.history.push('/internal-error');
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
        if (error.response.status === 500) this.props.history.push('/internal-error');
      }
    } else {
      try {
        const tools = await api.get(`/tools?title=${searchFor}`);
        this.setState({ searching: false });
        this.props.setTools(tools.data);

        this.props.history.push(`/?title=${searchFor}`);
      } catch (error) {
        if (error.response.status === 500) this.props.history.push('/internal-error');
      }
    }
  };

  tagClickedHandler = async tag => {
    try {
      const tools = await api.get(`/tools?tag=${tag}`);
      this.setState({ searching: false });
      this.props.setTools(tools.data);
    } catch (error) {
      if (error.response.status === 500) this.props.history.push('/internal-error');
    }
  };

  actionButtonClicked = (tool, action) => {
    this.toggleManageToolHandler();
    this.setState({ tool, action });
  };

  toggleManageToolHandler = () => {
    this.setState({ showManageTool: !this.state.showManageTool, tool: {}, action: '' });
  };

  render() {
    const {
      searchFor,
      searchByTag,
      authContent,
      searching,
      showManageTool,
      tool,
      action
    } = this.state;

    const addTool = (
      <ManageTools
        toggleShow={this.toggleManageToolHandler}
        show={showManageTool}
        tool={tool}
        action={action}
      >
        test modaltest modaltest modaltest modaltest modaltest modal
      </ManageTools>
    );

    return (
      <StyledMain>
        {showManageTool ? addTool : null}

        <h1>VUTTR</h1>
        <h3>Very Useful Tools to Remember</h3>

        <ActionsBar
          searchFor={searchFor}
          searchByTag={searchByTag}
          searching={searching}
          inputChanged={this.inputChangedHandler}
          onSearch={this.searchHandler}
          showButton={authContent}
          toggleShow={this.toggleManageToolHandler}
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
                onDelete={() => this.actionButtonClicked(tool, 'delete')}
                onEdit={() => this.actionButtonClicked(tool, 'edit')}
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
