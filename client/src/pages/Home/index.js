import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from '../../services/api';

import * as toolsActions from '../../store/ducks/tools';
import { isAuthenticated } from '../../services/auth';

import StyledMain from './style';
import Tool from '../../components/Tool';
import ActionsBar from '../../components/ActionsBar';
import ManageTools from '../../components/ManageTools';
import ReactPaginate from 'react-paginate';

class Home extends Component {
  _isMounted = false;

  state = {
    tool: {},
    action: '',
    searchFor: '',
    authContent: false,
    searchByTag: false,
    searching: false,
    showManageTool: false,
    navigateThruTags: false,
    navigateThruTitle: false,
    totalPages: 1,
    currentPage: 1
  };

  async componentDidMount() {
    this._isMounted = true;

    if (isAuthenticated() && this._isMounted) this.setState({ authContent: true });

    try {
      const searchURLParam = new URLSearchParams(this.props.location.search);
      const page = searchURLParam.get('page');
      const tag = searchURLParam.get('tag');
      const title = searchURLParam.get('title');
      let tagBool;
      let titleBool;
      let tools;

      if (tag && !title) {
        tools = await api.get(`/tools/?page=${page}&tag=${tag}`);
        tagBool = true;
        titleBool = false;
      } else if (title && !tag) {
        tools = await api.get(`/tools/?page=${page}&title=${title}`);
        tagBool = false;
        titleBool = true;
      } else {
        tools = await api.get(`/tools/?page=${page ? page : 1}`);
        tagBool = false;
        titleBool = false;
      }

      this.props.setTools(tools.data.docs);

      if (this._isMounted) {
        this.setState({
          totalPages: tools.data.totalPages,
          currentPage: tools.data.page - 1,
          navigateThruTags: tagBool,
          navigateThruTitle: titleBool
        });
      }
    } catch (error) {
      if (error.response.status === 500) this.props.history.push('/internal-error');
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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
        const tools = await api.get(`/tools/?tag=${searchFor}&page=1`);

        this.props.setTools(tools.data.docs);

        if (this._isMounted) {
          this.setState({
            searching: false,
            navigateThruTags: true,
            pageNavigationHandler: false,
            totalPages: tools.data.totalPages,
            currentPage: tools.data.page - 1
          });
        }

        this.props.history.push(`/?tag=${searchFor}&page=1`);
      } catch (error) {
        if (error.response.status === 500) this.props.history.push('/internal-error');
      }
    } else {
      try {
        const tools = await api.get(`/tools/?title=${searchFor}&page=1`);

        this.props.setTools(tools.data.docs);

        if (this._isMounted) {
          this.setState({
            searching: false,
            navigateThruTags: false,
            navigateThruTitle: true,
            totalPages: tools.data.totalPages,
            currentPage: tools.data.page - 1
          });
        }

        this.props.history.push(`/?title=${searchFor}&page=1`);
      } catch (error) {
        if (error.response.status === 500) this.props.history.push('/internal-error');
      }
    }
  };

  pageNavigationHandler = async index => {
    try {
      const page = index.selected + 1;
      const { navigateThruTags, navigateThruTitle } = this.state;
      const searchURLParam = new URLSearchParams(this.props.location.search);
      const tag = searchURLParam.get('tag');
      const title = searchURLParam.get('title');
      let tools;

      if (navigateThruTags) {
        tools = await api.get(`/tools/?page=${page}&tag=${tag}`);
        this.props.history.push(`/?tag=${tag}&page=${page}`);
        console.log('[Navigating thru tags], page: ' + page);
      } else if (navigateThruTitle) {
        tools = await api.get(`/tools/?page=${page}&title=${title}`);
        this.props.history.push(`/?title=${title}&page=${page}`);
        console.log('[Navigating thru title], page: ' + page);
      } else {
        tools = await api.get(`/tools/?page=${page}`);
        this.props.history.push(`/?page=${page}`);
        console.log('[Navigating], page: ' + page);
      }

      if (this._isMounted) {
        this.setState({ totalPages: tools.data.totalPages, currentPage: tools.data.page - 1 });
      }
      this.props.setTools(tools.data.docs);
    } catch (error) {
      if (error.response.status === 500) this.props.history.push('/internal-error');
    }
  };

  tagClickedHandler = async tag => {
    try {
      const tools = await api.get(`/tools?tag=${tag}&page=1`);

      this.props.setTools(tools.data.docs);

      if (this._isMounted) {
        this.setState({
          searching: false,
          navigateThruTitle: false,
          navigateThruTags: true,
          totalPages: tools.data.totalPages,
          currentPage: tools.data.page - 1
        });
      }

      this.props.history.push(`/?tag=${tag}&page=1`);
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
      action,
      totalPages
    } = this.state;

    let error;
    let shouldRenderPagination = false;

    if (this.props.tools.length < 1) error = 'Sorry, nothing was found :(';
    if (totalPages > 1) shouldRenderPagination = true;

    return (
      <StyledMain>
        {showManageTool ? (
          <ManageTools
            toggleShow={this.toggleManageToolHandler}
            show={showManageTool}
            tool={tool}
            action={action}
          >
            test modaltest modaltest modaltest modaltest modaltest modal
          </ManageTools>
        ) : null}

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
        {!error ? (
          this.props.tools.map(tool => (
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
        ) : (
          <h3 className="error-message">{error}</h3>
        )}

        {shouldRenderPagination ? (
          <ReactPaginate
            pageCount={this.state.totalPages}
            pageRangeDisplayed={3}
            marginPagesDisplayed={3}
            onPageChange={index => this.pageNavigationHandler(index)}
            forcePage={this.state.currentPage}
            containerClassName="pagination-container"
            activeLinkClassName="active"
            nextLabel="Next >"
            previousLabel="< Previous"
          />
        ) : null}
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
