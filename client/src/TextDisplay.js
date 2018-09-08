import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

class TextDisplay extends Component {
  state = { text: "Hello :)" }

  componentDidMount() {
    this.getResult();
  }

  getResult = () => {
    const endpoint = window.location.host;
    const socket = socketIOClient(endpoint);

    socket.on("text", data => {
	    this.setState({ text: data })
    });
  }

  render() {
    return (
      <div className="App">
	    { this.state.text }
      </div>
    );
  }
}

export default TextDisplay;
