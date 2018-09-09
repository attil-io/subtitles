import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import "./TextDisplay.css"

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
      <div className="container">
      <div className="content">
	    { this.state.text }
      </div>
      </div>
    );
  }
}

export default TextDisplay;
