import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

class App extends Component {
  state = { result: {} }

  componentDidMount() {
    this.getResult();
  }

  getResult = () => {
    const endpoint = window.location.host;
    const socket = socketIOClient(endpoint);

    socket.on("FromAPI", data => {
	    this.setState({ result: data })
    });
  }

  render() {
    return (
      <div className="App">
	    Result is: { this.state.result.field }
      </div>
    );
  }
}

export default App;
