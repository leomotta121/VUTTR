import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import api from '../../../services/api';

import FormValidator from '../../../helper/FormValidator';
import { afterSubmitRules } from './validationRules';

import color from '../../../helper/colors';
import StyledForm from './style';
import Input from '../../../components/Input';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';

class SignUp extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.afterSubmitValidator = new FormValidator(afterSubmitRules(this.passwordMatch));

    this.state = {
      name: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      validation: this.afterSubmitValidator.valid(),
      isEmailTaken: false,
      buttonClicked: false
    };

    this.submitted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  passwordMatch = (confirmation, state) => state.password === confirmation;

  inputChangedHandler = event => {
    event.preventDefault();

    if (event.target.name === 'email') this.setState({ isEmailTaken: false });

    this.setState({ [event.target.name]: event.target.value });
  };

  formSubmitHandler = async event => {
    event.preventDefault();
    this.setState({ buttonClicked: true });

    const afterSubmitValidator = this.afterSubmitValidator.validate(this.state);
    this.setState({ validation: afterSubmitValidator });
    this.submitted = true;

    if (
      afterSubmitValidator.isValid &&
      this.passwordMatch(this.state.confirmPassword, this.state)
    ) {
      const { name, lastName, email, password } = this.state;

      try {
        await api.post('/signup', {
          name,
          lastName,
          email,
          password
        });

        this.props.history.push('/signin');
      } catch (error) {
        let isEmailTaken = false;

        if (error.response.status === 500) this.props.history.push('/internal-error');

        if (error.response.data.message === 'The email is already in use.') {
          isEmailTaken = true;
        }

        if (this._isMounted) {
          this.setState({ isEmailTaken, buttonClicked: false });
        }
      }
    }

    if (this._isMounted) this.setState({ buttonClicked: false });
  };

  render() {
    const { name, lastName, email, password, confirmPassword, isEmailTaken } = this.state;
    let afterSubmitValidator = this.submitted
      ? this.afterSubmitValidator.validate(this.state)
      : this.state.validation;

    let disabledButton = true;
    let emailTakenMessage;

    if (name && lastName && email && password && confirmPassword && afterSubmitValidator.isValid)
      disabledButton = null;

    if (isEmailTaken) {
      afterSubmitValidator.email.isInvalid = true;
      emailTakenMessage = 'Email already in use';
    }

    return (
      <Card mtb="30">
        <StyledForm onSubmit={this.formSubmitHandler}>
          <h1>Sign Up</h1>

          <Input
            type="text"
            placeholder="e.g. John"
            name="name"
            value={name}
            onChange={this.inputChangedHandler}
            afterSubmitValidator={afterSubmitValidator.name}
            label="Name"
          />

          <Input
            type="text"
            placeholder="e.g. Doe"
            name="lastName"
            value={lastName}
            onChange={this.inputChangedHandler}
            afterSubmitValidator={afterSubmitValidator.lastName}
            label="Last Name"
          />

          <Input
            type="email"
            placeholder="e.g. john@doe.com"
            name="email"
            value={email}
            onChange={this.inputChangedHandler}
            afterSubmitValidator={afterSubmitValidator.email}
            label="Email"
            isEmailTaken={isEmailTaken}
            emailTakenMessage={emailTakenMessage}
          />

          <Input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={this.inputChangedHandler}
            afterSubmitValidator={afterSubmitValidator.password}
            label="Password"
          />

          <Input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.inputChangedHandler}
            afterSubmitValidator={afterSubmitValidator.confirmPassword}
            label="Confirm Password"
          />

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
