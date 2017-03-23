import React from 'react';
import Container from './Container';
class InputBox extends React.Component {

  change() {
    this.props.onChange(this.textInput.value);
  }

  render() {
    return (
      <input
        type="text"
        className="inputArea"
        placeholder="Rogue One"
        ref={(input) => { this.textInput = input; }}
        onChange={this.change.bind(this)} />
    )
  }
}

export default InputBox;