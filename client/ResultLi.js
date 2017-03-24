import React from 'react';

class ResultLi extends React.Component {

  handleClick(eventLi) {
    alert(eventLi.Poster);

    //release date/etc query
    fetch('http://www.omdbapi.com/?i=' + eventLi.imdbID)
      .then((response) => {
        response.json().then((json) => {
          this.setState({ results: json });
        });
      });
  }

  render() {
    let poster = '';
    let description = '';
    let rating;
    //handle null cases
    if (this.props.list == undefined) {
      return null;
    }

    let resultItems = this.props.list.map((eventLi, index) => {
      if (this.state != null) {
        console.log(this.state.results.Poster);
        poster = this.state.results.Poster;
        // console.log(this.state.results);
      } if (this.state != null) { description = this.state.results.Plot; }
      if (this.state != null) {rating = this.state.results.imdbRating}
      return <li key={index} onClick={this.handleClick.bind(this, eventLi)}> <div className="liTitleYear">{eventLi.Title} {"(" + eventLi.Year + ")"} </div> </li>;
    });



    //render everything using an ordered list
    return (
      <div className="liArea">
        <ol>
          {resultItems}
        </ol>
        <img className="resultsArea" src={poster} />
        <div className="description">{description} </div>
      </div>
    )
  }
}


export default ResultLi;