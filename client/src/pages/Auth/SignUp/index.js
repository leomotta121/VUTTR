import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { StyledForm } from './style';

import color from '../../../helper/colors';

import Input from '../../../components/Input';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';

class SignUp extends Component {
  state = {
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    buttonClicked: false
  };

  inputChangedHandler = event => {
    event.preventDefault();

    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    let error;
    return (
      <Card mtb="30">
        <StyledForm onSubmit={() => {}}>
          <h1>Sign Up</h1>

          {error ? <div className="errorModal">error message</div> : null}

          <label htmlFor="name">
            First Name:
            <Input
              type="text"
              placeholder="e.g. John"
              name="name"
              onChange={this.inputChangedHandler}
            />
          </label>

          <label htmlFor="lastName">
            Last Name:
            <Input
              type="text"
              placeholder="e.g. Doe"
              name="lastName"
              onChange={this.inputChangedHandler}
            />
          </label>

          <label htmlFor="email">
            Email:
            <Input
              type="email"
              placeholder="e.g. john@doe.com"
              name="email"
              onChange={this.inputChangedHandler}
            />
          </label>

          <label htmlFor="password">
            Password:
            <Input
              type="password"
              placeholder="password"
              name="password"
              onChange={this.inputChangedHandler}
            />
          </label>

          <label htmlFor="confirmPassword">
            Confirm Password:
            <Input
              type="password"
              placeholder="confirm password"
              name="confirmPassword"
              onChange={this.inputChangedHandler}
            />
          </label>

          <Button
            type="submit"
            bgColor={color.regular.blue}
            hoverColor={color.dark.blue}
            activeColor={color.darker.blue}
            fontColor={color.regular.white}
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
