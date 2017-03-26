import React from 'react';


class ResultItem extends React.Component {

  handleClick(imdbid) {
    //release date/etc query
    fetch('http://www.omdbapi.com/?i=' + imdbid)
      .then((response) => {
        response.json().then((json) => {
          imdbInfo: json
          this.context.router.push({
            pathname: 'details',
            state: {
              info: json
            }
          });
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
//request the router context in your component
ResultItem.contextTypes = {
    router: React.PropTypes.object
};

export default ResultItem;