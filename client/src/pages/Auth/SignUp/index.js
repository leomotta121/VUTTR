import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import StyledForm from './style';

import color from '../../../helper/colors';

import FormValidator from '../../../helper/FormValidator';

import Input from '../../../components/Input';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.validator = new FormValidator([
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'First name is required.'
      },
      {
        field: 'lastName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Last name is required.'
      },
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
      },
      {
        field: 'confirmPassword',
        method: 'isEmpty',
        validWhen: false,
        message: 'Confirmation is required.'
      },
      {
        field: 'confirmPassword',
        method: this.passwordMatch,
        validWhen: true,
        message: 'Passwords do not match.'
      }
    ]);

    this.state = {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      validation: this.validator.valid(),
      buttonClicked: false
    };

    this.submitted = false;
  }

  passwordMatch = (confirmation, state) => state.password === confirmation;

  inputChangedHandler = event => {
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = event => {
    event.preventDefault();

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid && this.passwordMatch(this.state.confirmPassword, this.state)) {
      console.log('ok');
    }
  };

  render() {
    const { name, lastName, email, password, confirmPassword } = this.state;
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
    let disabledButton = true;

    if (name && lastName && email && password && confirmPassword && validation.isValid)
      disabledButton = null;

    return (
      <Card mtb="30">
        <StyledForm onSubmit={this.formSubmitHandler}>
          <h1>Sign Up</h1>

          <div className={validation.name.isInvalid ? 'has-error' : null}>
            <label htmlFor="name">First Name:</label>
            <Input
              type="text"
              placeholder="e.g. John"
              name="name"
              onChange={this.inputChangedHandler}
            />
            <span className="error-message">{validation.name.message}</span>
          </div>

          <div className={validation.lastName.isInvalid ? 'has-error' : null}>
            <label htmlFor="lastName">Last Name:</label>
            <Input
              type="text"
              placeholder="e.g. Doe"
              name="lastName"
              onChange={this.inputChangedHandler}
            />
            <span className="error-message">{validation.lastName.message}</span>
          </div>

          <div className={validation.email.isInvalid ? 'has-error' : null}>
            <label htmlFor="email">Email:</label>
            <Input
              type="email"
              placeholder="e.g. john@doe.com"
              name="email"
              onChange={this.inputChangedHandler}
            />
            <span className="error-message">{validation.email.message}</span>
          </div>

          <div className={validation.password.isInvalid ? 'has-error' : null}>
            <label htmlFor="password">Password:</label>
            <Input
              type="password"
              placeholder="password"
              name="password"
              onChange={this.inputChangedHandler}
            />
            <span className="error-message">{validation.password.message}</span>
          </div>

          <div className={validation.confirmPassword.isInvalid ? 'has-error' : null}>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <Input
              type="password"
              placeholder="confirm password"
              name="confirmPassword"
              onChange={this.inputChangedHandler}
            />
            <span className="error-message">{validation.confirmPassword.message}</span>
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
            {this.state.buttonClicked ? <Spinner /> : 'Sign Up'}
          </Button>

          <Link to="/signin">Or sign in here</Link>
        </StyledForm>
      </Card>
    );
  }
}

export default withRouter(SignUp);
