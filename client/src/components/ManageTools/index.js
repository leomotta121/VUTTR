import React, { Component } from 'react';

import FormValidator from '../../helper/FormValidator';

import colors from '../../helper/colors';

import StyledForm from './style';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';

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
        message: 'Tag is too long'
      }
    ]);

    this.state = {
      title: '',
      description: '',
      link: '',
      tagInput: '',
      tags: [],
      validation: this.validator.valid()
    };

    this.submitted = false;
  }

  inputChangedHandler = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      console.log('submitted');
    }
  };

  inputKeyDownHandler = event => {
    const validation = this.validator.validate(this.state);

    if ((event.keyCode === 13 || event.keyCode === 32) && !validation.tagInput.message) {
      const { value } = event.target;

      this.setState({
        tags: [...this.state.tags, value],
        tagInput: ''
      });

      console.log(value, this.state);
    }
  };

  render() {
    const { title, description, link, tags } = this.state;
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
    let disabledButton = true;
    let customTagMessage;

    if (title && description && link && tags.length > 0 && validation.isValid)
      disabledButton = null;

    if (this.state.tagInput.length > 12) customTagMessage = 'has-error';

    return (
      <Modal toggleShow={this.props.toggleShow} show={this.props.show} title={this.props.title}>
        <StyledForm>
          <div className={validation.title.isInvalid ? 'has-error' : null}>
            <label htmlFor="title">Title:</label>
            <Input
              type="text"
              placeholder="e.g. React.js"
              name="title"
              onChange={this.inputChangedHandler}
              value={this.state.title}
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
              value={this.state.description}
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
              value={this.state.link}
            />
            <span className="error-message">{validation.link.message}</span>
          </div>

          <div className={validation.tagInput.isInvalid ? 'has-error' : null}>
            <label htmlFor="tagInput">Tags:</label>
            <Input
              type="text"
              placeholder="e.g. node"
              name="tagInput"
              value={this.state.tagInput}
              onChange={this.inputChangedHandler}
              onKeyDown={this.inputKeyDownHandler}
            />
            <span className="error-message">{validation.tagInput.message}</span>
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
        </StyledForm>
      </Modal>
    );
  }
}

export default ManageTools;
