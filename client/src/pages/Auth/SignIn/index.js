import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import api from '../../../services/api';
import { login } from '../../../services/auth';

import StyledForm from './style';

import color from '../../../helper/colors';

import FormValidator from '../../../helper/FormValidator';

import Input from '../../../components/Input';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'Email is required.'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'This is not a valid email.'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password is required.'
      }
    ]);

    this.state = {
      email: '',
      password: '',
      validation: this.validator.valid(),
      buttonClicked: false,
      customEmailMessage: '',
      customPasswordMessage: ''
    };

    this.submitted = false;
  }

  inputChangedHandler = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
      customEmailMessage: '',
      customPasswordMessage: ''
    });
  };

  formSubmitHandler = async event => {
    event.preventDefault();
    this.setState({ buttonClicked: true });

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      const { email, password } = this.state;

      try {
        const response = await api.post('/signin', {
          email,
          password
        });

        login(response.data.token);

        this.props.history.push('/');
      } catch (error) {
        this.setState({ buttonClicked: false });

        if (error.response.data.message === 'Email is not registered.')
          this.setState({ customEmailMessage: error.response.data.message });

        if (error.response.data.message === 'Password is incorrect.')
          this.setState({ customPasswordMessage: error.response.data.message });
      }
    }

    this.setState({ buttonClicked: false });
  };

  render() {
    const { email, password, customEmailMessage, customPasswordMessage } = this.state;
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
    let disabledButton = true;

    if (email && password && validation.isValid) disabledButton = null;

    return (
      <Card mtb="30">
        <StyledForm onSubmit={this.formSubmitHandler}>
          <h1>Sign In</h1>

          <div
            className={
              validation.email.isInvalid
                ? 'has-error'
                : null || customEmailMessage
                ? 'has-error'
                : null
            }
          >
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              placeholder="e.g. john@doe.com"
              name="email"
              onChange={this.inputChangedHandler}
            />
            <span className="error-message">
              {customEmailMessage ? customEmailMessage : validation.email.message}
            </span>
          </div>

          <div
            className={
              validation.password.isInvalid
                ? 'has-error'
                : null || customPasswordMessage
                ? 'has-error'
                : null
            }
          >
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              placeholder="password"
              name="password"
              onChange={this.inputChangedHandler}
            />
            <span className="error-message">
              {customPasswordMessage ? customPasswordMessage : validation.password.message}
            </span>
          </div>

          <Button
            type="submit"
            bgColor={color.regular.blue}
            hoverColor={color.dark.blue}
            activeColor={color.darker.blue}
            fontColor={color.regular.white}
            disabledColor={color.lighter.blue}
            disabled={disabledButton}
          >
            {this.state.buttonClicked ? <Spinner /> : 'Sign In'}
          </Button>

          <Link to="/signup">Or sign up here</Link>
        </StyledForm>
      </Card>
    );
  }
}

export default withRouter(SignIn);
