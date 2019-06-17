import React, { Component } from 'react';

import Spinner from '../../components/Spinner';

class Home extends Component {
  handleScroll = event => {
    console.log('entered');
  };

  render() {
    return (
      <>
        <Spinner />
        <h1 onMouseEnter={this.handleScroll} id="title">
          Home
        </h1>
        <p>Paragraph</p>
      </>
    );
  }
}

export default Home;
