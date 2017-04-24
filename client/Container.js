import React from 'react';
import { render } from 'react-dom';
import ResultList from './ResultList';
import ResultItem from './ResultItem';
import InputBox from './InputBox';
import Logo from './Logo';
class Container extends React.Component {
  constructor(props) {
    super(props)
    this.focus = this.focus.bind(this);
    this.state = {
      results: []
    }
  }

  //test this: focus, textInput
  focus() {
    this.textInput.focus();
  }

  populate(keystrokes) {
    let query = "http://www.omdbapi.com/?s=";
    fetch(query + keystrokes)
      .then((response) => {
        response.json().then((json) => {
          this.setState({ results: json.Search });
        });
      });
  }

  render() {
    return (
      <div>
        <div className="contentContainer">
          <h1>Enter a movie</h1>
          <div className="inputBoxArea">
            <InputBox onChange={this.populate.bind(this)} />
          </div>
          <div className="resultListArea">
            <ResultList className="resultListText" list={this.state.results} />
          </div>
        </div>
        <Logo />
      </div>
    )
  }
}

export default Container;