import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { result: {} }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getResult();
  }

  getResult = () => {
    // Get the passwords and store them in state
    fetch('/api/result')
      .then(res => res.json())
      .then(result => this.setState({ result }));
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
