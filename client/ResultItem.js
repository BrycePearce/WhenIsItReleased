import React from 'react';


class ResultItem extends React.Component {

  handleClick(imdbid) {
    //query with imdbid, get new info and send it to details page
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
    {/* onClick bind -> When li is clicked, we send the items imdbId to handleClick and run our query. */ }
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