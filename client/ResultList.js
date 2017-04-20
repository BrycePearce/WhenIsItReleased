import React from 'react';
import ResultItem from './ResultItem';

class ResultList extends React.Component {

  //query for imdbID, send it to resultItem
  handleClick(eventLi) {
    //release date/etc query
    fetch('http://www.omdbapi.com/?i=' + eventLi.imdbID)
      .then((response) => {
        response.json().then((json) => {
          //query for imdbID for each item, which we sent to ResultItem
          this.setState({ imdbInfo: json.props.list["0"].imdbID });
        });
      });
  }

  render() {
    //handle null cases
    if (this.props.list == undefined) {
      return null;
    }
    let resultItems = this.props.list.map((eventLi, index) => {
      //send props to ResultItem
      return <ResultItem key={index} name={eventLi.Title} imdbid={eventLi.imdbID} releaseYear={eventLi.Year} />
    })



    //render everything using an ordered list
    return (
      <ol>
        {resultItems}
      </ol>
    )
  }
}
export default ResultList;