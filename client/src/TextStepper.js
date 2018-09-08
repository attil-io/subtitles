import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import "./TextStepper.css"

class Line extends Component {
  render() {
	  return (
	  <div className={this.props.active ? 'activeLine' : 'inactiveLine'}>{this.props.active ? "CURRENTLY DISPLAYED: " : ""}<p>{this.props.text}</p> </div>
	  )
  }
}

class Chooser extends Component {
  render () {
         return (
		 <div><select onChange={this.props.onchange}>
  			<option value="volvo">Volvo</option>
  			<option value="saab">Saab</option>
  			<option value="mercedes">Mercedes</option>
  			<option value="audi">Audi</option>
		</select></div>
	 )
  }
}

class TextStepper extends Component {

  state = { text: [], activeIdx : 0 }

  chooserOnChange(evt) {
    console.log(evt.target.value)
  }


  backOnClick(evt) {
    console.log("back")
  }

  forwardOnClick(evt) {
    console.log("forward")
  }


  render() {
    return (
      <div>
	    <Chooser onchange={this.chooserOnChange.bind(this)} />
	    <Line active={false} text="before1" />
	    <Line active={false} text="before2" />
	    <Line active={true} text="active line" />
	    <Line active={false} text="after1" />
	    <Line active={false} text="after2" />

	    <div>
	    	<input type="button" value="&lt;" onClick={this.backOnClick.bind(this)}/>
	    	<input type="button" value="&gt;" onClick={this.forwardOnClick.bind(this)}/>
	    </div>
      </div>
    );
  }
}

export default TextStepper;
