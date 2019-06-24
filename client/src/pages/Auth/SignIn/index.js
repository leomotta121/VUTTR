import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import api from '../../../services/api';

import { login } from '../../../services/auth';
import FormValidator from '../../../helper/FormValidator';
import { afterSubmitRules } from './validationsRules';

import color from '../../../helper/colors';
import StyledForm from './style';
import Input from '../../../components/Input';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.afterSubmitValidator = new FormValidator(afterSubmitRules);

    this.state = {
      email: '',
      password: '',
      validation: this.afterSubmitValidator.valid(),
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

    const validation = this.afterSubmitValidator.validate(this.state);
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
    let afterSubmitValidator = this.submitted
      ? this.afterSubmitValidator.validate(this.state)
      : this.state.validation;
    let disabledButton = true;

    if (email && password && afterSubmitValidator.isValid) disabledButton = null;

    return (
      <Card mtb="30">
        <StyledForm onSubmit={this.formSubmitHandler}>
          <h1>Sign In</h1>

          <Input
            type="email"
            placeholder="e.g. john@doe.com"
            name="email"
            value={email}
            onChange={this.inputChangedHandler}
            afterSubmitValidator={afterSubmitValidator.email}
            label="Email"
            customEmailMessage={customEmailMessage}
          />

          <Input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={this.inputChangedHandler}
            afterSubmitValidator={afterSubmitValidator.password}
            label="Password"
            customPasswordMessage={customPasswordMessage}
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
            {this.state.buttonClicked ? <Spinner /> : 'Sign In'}
          </Button>

          <Link to="/signup">Or sign up here</Link>
        </StyledForm>
      </Card>
    );
  }
}

export default withRouter(SignIn);
