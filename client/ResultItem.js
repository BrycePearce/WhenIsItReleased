import React from 'react';


class ResultItem extends React.Component {

  handleClick(imdbid) {

    console.log(imdbid);
    //release date/etc query
    fetch('http://www.omdbapi.com/?i=' + imdbid)
      .then((response) => {
        response.json().then((json) => {
          this.setState({ imdbInfo: json });
        });
      });
  }

  render() {
    let poster = '';
    let description = '';
    let rating = '';

    return (
      <li onClick={this.handleClick.bind(this, this.props.imdbid)}>
        <div className="liTitleYear">{this.props.name + ' (' + this.props.releaseYear + ')'}</div>
      </li>
    )
  }
}

export default ResultItem;