import React from 'react';
class Details extends React.Component {

  render() {
    return (
      <div className="detailsContainer">
        <div className="mainInfo">
          <div className="posterArea">
            <img className="detailsPoster" src={this.props.location.state.info.Poster} />
          </div>
          <div className="titlePlot">
            <div className="title">{this.props.location.state.info.Title} </div>
            <div className="plot">{this.props.location.state.info.Plot} </div>
          </div>
        </div>
        <div className="overviewDetailsArea">
          <div className="country">{this.props.location.state.info.Country}</div>
          <div className="rating">{this.props.location.state.info.Rated}</div>
          <div className="runtime">{this.props.location.state.info.Runtime}</div>
          <div className="genre">{this.props.location.state.info.Genre}</div>
        </div>

      </div>
    )
  }
}
export default Details;