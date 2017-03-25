import React from 'react';
import { render } from 'react-dom';
import ResultList from './ResultList';
import ResultItem from './ResultItem';
import InputBox from './InputBox';

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
      <div className="contentContainer">
        <h1>Possible Results</h1>
        <div className="inputBoxArea">
          <InputBox onChange={this.populate.bind(this)} />
        </div>
        <div className="resultListArea">
          <ResultList className="resultListText" list={this.state.results} />
        </div>
      </div>
    )
  }
}

render(<Container />, document.getElementById('container'));