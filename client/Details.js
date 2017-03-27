import React from 'react';
class Details extends React.Component {

  render() {
    return (
      <div className="detailsContainer">
        <img className="detailsPoster" src={this.props.location.state.info.Poster} />
        <div className="mainInfo">
          <div>
            <div className="title">{this.props.location.state.info.Title} </div>
            <div className="plot">{this.props.location.state.info.Plot} </div>
            <div className="overviewDetailsArea">
              <div className="left">
                <div className="details"> <p>Country</p>{this.props.location.state.info.Country} </div>
                <div className="details"> <p>Rating</p>{this.props.location.state.info.Rated} </div>
              </div>
              <div className="right">
                <div className="details"> <p>Genre</p>{this.props.location.state.info.Genre} </div>
                <div className="details"> <p>Runtime</p>{this.props.location.state.info.Runtime} </div>
              </div>
            </div>
          </div>
          <div className="searchAgain"><a className="returnText" href="/">Search Again</a></div>
        </div>
      </div>

    )
  }
}
export default Details;