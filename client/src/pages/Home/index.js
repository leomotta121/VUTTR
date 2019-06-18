import React, { Component } from 'react';

import api from '../../services/api';

// import Spinner from '../../components/Spinner';
import Tool from '../../components/Tool';

class Home extends Component {
  state = {
    tools: [],
    errorMessage: ''
  };

  async componentDidMount() {
    try {
      const tools = await api.get('/tools');
      this.setState({ tools: tools.data });
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  }

  render() {
    const { tools, errorMessage } = this.state;

    const error = <p>{errorMessage}</p>;

    return (
      <main>
        <h1>VUTTR</h1>
        {tools
          ? tools.map(tool => (
              <Tool
                key={tool._id}
                title={tool.title}
                link={tool.link}
                description={tool.description}
                tags={tool.tags}
                showButton={true}
              />
            ))
          : error}
      </main>
    );
  }
}

export default Home;
