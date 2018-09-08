import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import TextDisplay from './TextDisplay.js'


class App extends Component {
  render() {
    return (
      <div className="App">
	    <TextDisplay />
      </div>
    );
  }
}

export default App;
