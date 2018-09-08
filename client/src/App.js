import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import socketIOClient from "socket.io-client";
import './App.css';
import TextDisplay from './TextDisplay.js'
import TextStepper from './TextStepper.js'


class App extends Component {
  render() {
    return (
  <Router>
    <div>
      <Route exact path="/" component={TextDisplay} />
      <Route path="/step" component={TextStepper} />
    </div>
  </Router>
    );
  }
}

export default App;
