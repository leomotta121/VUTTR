import React, { Component } from 'react';
import api from '../../services/api';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as toolsActions from '../../store/ducks/tools';

import FormValidator from '../../helper/FormValidator';

import colors from '../../helper/colors';

import Container from './style';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import Card from '../Card';

class ManageTools extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: 'title',
        method: 'isEmpty',
        validWhen: false,
        message: 'Title is required.'
      },
      {
        field: 'description',
        method: 'isEmpty',
        validWhen: false,
        message: 'Description is required.'
      },
      {
        field: 'link',
        method: 'isEmpty',
        validWhen: false,
        message: 'Link is required.'
      },
      {
        field: 'link',
        method: 'isURL',
        validWhen: true,
        message: 'Not valid url.'
      },
      {
        field: 'tagInput',
        method: 'isByteLength',
        args: [{ min: 0, max: 12 }],
        validWhen: true,
        message: 'Tag is too long.'
      },
      {
        field: 'tags',
        method: 'isEmpty',
        validWhen: false,
        message: 'Add at least one tag.'
      }
    ]);

    this.state = {
      _id: '',
      title: '',
      description: '',
      link: '',
      tagInput: '',
      tags: [],
      validation: this.validator.valid(),
      editMode: false,
      deleteMode: false
    };

    this.submitted = false;
  }

  componentDidMount() {
    const { title, description, link, tags, _id } = this.props.tool;
    if (this.props.action === 'edit')
      this.setState({ editMode: true, title, description, link, tags });

    if (this.props.action === 'delete')
      this.setState({ deleteMode: true, title, description, link, tags, _id });
  }

  inputChangedHandler = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  formSubmitHandler = async event => {
    event.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid && this.state.tags.length > 0) {
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
          this.submitted = false;
          this.setState({ title: '', description: '', link: '', tags: [] });
          this.props.toggleShow();
        } catch (error) {}
      } else if (this.state.deleteMode) {
        const id = this.props.tool._id;

        try {
          await api.delete(`/tools/${id}`);

          this.props.deleteTool(id);
          this.submitted = false;
          this.setState({ title: '', description: '', link: '', tags: [] });
          this.props.toggleShow();
        } catch (error) {}
      } else {
        const { title, description, link, tags } = this.state;

        const response = await api.post('/tools', {
          title,
          description,
          link,
          tags
        });

        const tool = response.data;
        this.props.addTool(tool);
        this.submitted = false;
        this.setState({ title: '', description: '', link: '', tags: [] });
        this.props.toggleShow();
      }
    }
  };

  inputKeyDownHandler = event => {
    const validation = this.validator.validate(this.state);

    if (
      (event.keyCode === 13 || event.keyCode === 32) &&
      !validation.tagInput.message &&
      this.state.tagInput.length > 0
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
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
    let disabledButton = true;
    let customTagMessage;

    let modalTitle = '+ Add new tool';
    if (editMode) modalTitle = 'Edit Tool';
    if (deleteMode) modalTitle = 'Delete Tool';

    if (title && description && link && tags.length > 0 && validation.isValid)
      disabledButton = null;

    if (this.state.tagInput.length > 12) customTagMessage = 'Tag is too long';

    const tagsAdded = tags.map(tag => (
      <Card key={tag} className="tag-container">
        <span className="delete-tag" onClick={() => this.removeTagHandler(tag)}>
          x
        </span>
        <span className="tag"> {`#${tag}`}</span>
      </Card>
    ));

    const AddOrRemoveModal = (
      <Container>
        <div className={validation.title.isInvalid ? 'has-error' : null}>
          <label htmlFor="title">Title:</label>
          <Input
            type="text"
            placeholder="e.g. React.js"
            name="title"
            onChange={this.inputChangedHandler}
            value={title}
          />
          <span className="error-message">{validation.title.message}</span>
        </div>

        <div className={validation.description.isInvalid ? 'has-error' : null}>
          <label htmlFor="description">Description:</label>
          <Input
            type="text"
            placeholder="e.g. It is a good tool for..."
            name="description"
            onChange={this.inputChangedHandler}
            value={description}
          />
          <span className="error-message">{validation.description.message}</span>
        </div>

        <div className={validation.link.isInvalid ? 'has-error' : null}>
          <label htmlFor="link">Link:</label>
          <Input
            type="text"
            placeholder="e.g. http://www.express.com"
            name="link"
            onChange={this.inputChangedHandler}
            value={link}
          />
          <span className="error-message">{validation.link.message}</span>
        </div>

        {tagsAdded}

        <div
          className={
            validation.tagInput.isInvalid
              ? 'has-error'
              : null || customTagMessage
              ? 'has-error'
              : null || validation.tags.isInvalid
              ? 'has-error'
              : null
          }
        >
          <label htmlFor="tagInput">Tags:</label>
          <Input
            type="text"
            placeholder="Press Enter or Space to add tags"
            name="tagInput"
            value={tagInput}
            onChange={this.inputChangedHandler}
            onKeyDown={this.inputKeyDownHandler}
          />
          <span className="error-message">
            {customTagMessage
              ? customTagMessage
              : null || validation.tags.message
              ? validation.tags.message
              : null || validation.tagInput.message
              ? validation.tagInput.message
              : null}
          </span>
        </div>

        <Button
          onClick={this.formSubmitHandler}
          bgColor={colors.regular.blue}
          hoverColor={colors.dark.blue}
          activeColor={colors.darker.blue}
          fontColor={colors.regular.white}
          disabledColor={colors.lighter.blue}
          disabled={disabledButton}
        >
          Send
        </Button>
      </Container>
    );

    const deleteModal = (
      <Container>
        Are you sure you want to remove <strong>{title}</strong>?
        <div className="delete-actions">
          <Button
            onClick={this.props.toggleShow}
            bgColor={colors.regular.red}
            hoverColor={colors.dark.red}
            activeColor={colors.darker.red}
            fontColor={colors.regular.white}
          >
            cancel
          </Button>
          <Button
            onClick={this.formSubmitHandler}
            bgColor={colors.regular.blue}
            hoverColor={colors.dark.blue}
            activeColor={colors.darker.blue}
            fontColor={colors.regular.white}
          >
            Yes, remove
          </Button>
        </div>
      </Container>
    );

    return (
      <Modal
        toggleShow={this.props.toggleShow}
        show={this.props.show}
        title={modalTitle}
        overflow={deleteMode ? 'hidden' : null}
      >
        {deleteMode ? deleteModal : AddOrRemoveModal}
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(toolsActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(withRouter(ManageTools));
