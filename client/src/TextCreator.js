import React, { Component } from 'react';
import socketIOClient from "socket.io-client";


class TextCreator extends Component {
  render() {
    return (
      <div>
	    ID <input type="text" />
	    <br />
	    name <input type="text" />
      </div>
    );
  }
}

export default TextCreator;
