import React from 'react';
import { render } from 'react-dom';
import ResultLi from './ResultLi';
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

  //CONSUME THE API (get imdb info from this later)
  populate(keystrokes) {
    let query = "http://www.omdbapi.com/?s=";
    console.log("welcome to populate, keystroke: " + keystrokes);
    fetch(query + keystrokes)
      .then((response) => {
        response.json().then((json) => {
          console.log("oh heyoo " + JSON.stringify(json.Search[0].imdbID));
           this.setState({ results: json.Search });
          //return "http://www.omdbapi.com/?i=t" + json.Search.imdbID;
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
        <div className="resultLiArea">
          <ResultLi className="resultsLiText" list={this.state.results} />
        </div>
      </div>
    )
  }
}

//first param is what we want to render, second param is where we render it
//(don't change this)
render(<Container />, document.getElementById('container'));