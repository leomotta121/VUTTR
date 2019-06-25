import React, { Component } from 'react';
import api from '../../services/api';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toolsActions from '../../store/ducks/tools';
import FormValidator from '../../helper/FormValidator';
import { afterSubmitRules, liveRules } from './validationRules';

import Container from './style';
import Modal from '../Modal';
import AddOrRemoveModal from './AddOrRemoveModal';
import DeleteModal from './DeleteModal';

class ManageTools extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.liveValidator = new FormValidator(liveRules);

    this.afterSubmitValidator = new FormValidator(afterSubmitRules);

    this.state = {
      _id: '',
      title: '',
      description: '',
      link: '',
      tagInput: '',
      tags: [],
      afterSubmitValidation: this.afterSubmitValidator.valid(),
      editMode: false,
      deleteMode: false
    };

    this.submitted = false;
  }

  componentDidMount() {
    this._isMounted = true;

    const { title, description, link, tags, _id } = this.props.tool;
    if (this.props.action === 'edit')
      this.setState({ editMode: true, title, description, link, tags });

    if (this.props.action === 'delete')
      this.setState({ deleteMode: true, title, description, link, tags, _id });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  inputChangedHandler = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  resetItialState = () => {
    this.submitted = false;
    this.props.toggleShow();
    if (this._isMounted) {
      this.setState({ title: '', description: '', link: '', tags: [] });
    }
  };

  redirectErrorPages = status => {
    if (status === 401) this.props.history.push('/signin');
    if (status === 500) this.props.history.push('/internal-error');
  };

  formSubmitHandler = async event => {
    event.preventDefault();

    const afterSubmitValidator = this.afterSubmitValidator.validate(this.state);
    this.setState({ validation: afterSubmitValidator });
    this.submitted = true;

    if (afterSubmitValidator.isValid && this.state.tags.length > 0) {
      if (this.state.editMode) {
        const { title, description, link, tags } = this.state;
        const id = this.props.tool._id;

        try {
          const response = await api.patch(`/tools/${id}`, {
            title,
            description,
            link,
            tags
          });

          const tool = response.data;
          this.props.editTool(tool);
          this.resetItialState();
        } catch (error) {
          this.redirectErrorPages(error.response.status);
        }
      } else if (this.state.deleteMode) {
        const id = this.props.tool._id;

        try {
          await api.delete(`/tools/${id}`);

          this.props.deleteTool(id);
          this.resetItialState();
        } catch (error) {
          this.redirectErrorPages(error.response.status);
        }
      } else {
        const { title, description, link, tags } = this.state;

        try {
          const response = await api.post('/tools', {
            title,
            description,
            link,
            tags
          });

          const tool = response.data;
          this.props.addTool(tool);
          this.resetItialState();
        } catch (error) {
          this.redirectErrorPages(error.response.status);
        }
      }
    }
  };

  inputKeyDownHandler = event => {
    const afterSubmitValidator = this.afterSubmitValidator.validate(this.state);
    const liveValidator = this.liveValidator.validate(this.state);

    if (
      (event.keyCode === 13 || event.keyCode === 32) &&
      !afterSubmitValidator.tagInput.message &&
      !liveValidator.tagInput.message
    ) {
      const { value } = event.target;
      const tags = this.state.tags;

      if (tags.indexOf(value) === -1) {
        this.setState({
          tags: [...tags, value],
          tagInput: ''
        });
      }
    }
  };

  removeTagHandler = tagName => {
    const tags = this.state.tags.filter(tag => tag !== tagName);

    this.setState({ tags });
  };

  render() {
    const { title, description, link, tags, tagInput, editMode, deleteMode } = this.state;
    let afterSubmitValidator = this.submitted
      ? this.afterSubmitValidator.validate(this.state)
      : this.state.afterSubmitValidation;

    const liveValidator = this.liveValidator.validate(this.state);

    let disabledButton = true;

    let modalTitle = '+ Add new tool';
    if (editMode) modalTitle = 'Edit Tool';
    if (deleteMode) modalTitle = 'Delete Tool';

    if (title && description && link && tags.length > 0 && afterSubmitValidator.isValid)
      disabledButton = null;

    return (
      <Modal
        toggleShow={this.props.toggleShow}
        show={this.props.show}
        title={modalTitle}
        overflow={deleteMode ? 'hidden' : null}
        key="pose1"
      >
        {deleteMode ? (
          <Container key="pose2">
            <DeleteModal
              title={title}
              toggleShow={this.props.toggleShow}
              formSubmitHandler={this.formSubmitHandler}
            />
          </Container>
        ) : (
          <Container key="pose3">
            <AddOrRemoveModal
              tags={tags}
              removeTagHandler={this.removeTagHandler}
              title={title}
              description={description}
              link={link}
              tagInput={tagInput}
              afterSubmitValidator={afterSubmitValidator}
              liveValidator={liveValidator}
              disabledButton={disabledButton}
              formSubmitHandler={this.formSubmitHandler}
              inputChangedHandler={this.inputChangedHandler}
              inputKeyDownHandler={this.inputKeyDownHandler}
            />
          </Container>
        )}
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(toolsActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(withRouter(ManageTools));
