import React, { Component } from 'react';
import url from 'url';
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
		 {
			 this.props.choices.map(function(choice, index) {
				 return <option value={index}>{choice}</option>
			 })
		 }
                 </select></div>
	 )
  }
}

class TextStepper extends Component {

  state = { titles: [],
            text: [], activeIdx : 0 }

  componentDidMount() {
    this.listOptions()
    this.fetchText(this.state.activeIdx)
  }

  listOptions() {
    fetch('/api/listOfTexts')
      .then(response => response.json())
      .then(data => this.setState({ titles: data }));
  }

  fetchText(textIdx) {
    fetch('/api/text' + url.format({ query: {id: textIdx}}) )
      .then(response => response.json())
      .then(data => this.setState({ text: data, activeIdx : 0 }));
  }

  getLine(idx) {
    let {text} = this.state
    if ((idx < 0) || (idx >= text.length)) {
       return ""
    }
    return text[idx]
  }

  setActiveIdx(idx) {
    let {text} = this.state
    if ((idx < 0) || (idx >= text.length)) {
       return 
    }
    fetch('/api/setline' + url.format({ query: {id: idx}}))
    this.setState({ activeIdx: idx }) 
  }

  chooserOnChange(evt) {
    this.fetchText(evt.target.value)
  }


  backOnClick(evt) {
    this.setActiveIdx(this.state.activeIdx - 1)
  }

  forwardOnClick(evt) {
    this.setActiveIdx(this.state.activeIdx + 1)
  }


  render() {
    return (
      <div>
	    <Chooser choices={this.state.titles} onchange={this.chooserOnChange.bind(this)} />
	    <div>
	         <input className="stepButton" type="button" value="&lt;" onClick={this.backOnClick.bind(this)}/>
	         <input className="stepButton" type="button" value="&gt;" onClick={this.forwardOnClick.bind(this)}/>
	    </div>
    <Line active={false} text={this.getLine(this.state.activeIdx - 2)} />
	    <Line active={false} text={this.getLine(this.state.activeIdx - 1)} />
	    <Line active={true} text={this.getLine(this.state.activeIdx)} />
	    <Line active={false} text={this.getLine(this.state.activeIdx + 1)} />
	    <Line active={false} text={this.getLine(this.state.activeIdx + 2)} />

      </div>
    );
  }
}

export default TextStepper;
