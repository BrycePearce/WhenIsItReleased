import React from 'react';
import ReactDOM from 'react-dom'; //for componentDidMount
import moment from 'moment';
import Key from './Key';
import Fresh from './static/fresh.png';
import NotFresh from './static/notfresh.png';
import imdb from './static/imdb.png';
import mta from './static/mta.png';
import ratingnotfound from './static/ratingnotfound.png';
import posternotfound from './static/notfound.png';
import Logo from './Logo';
class Details extends React.Component {

  //run the query when details page loads
  componentDidMount() {
    //TODO: add handler for shows/movies that don't exist here. (e.g. Steven Universe)
    fetch('http://api.themoviedb.org/3/movie/' + this.props.location.state.info.imdbID + "?api_key=" + Key + '&append_to_response=release_dates')
      .then((response) => {
        response.json().then((json) => {
          //document.body.style.backgroundImage = "url('https://image.tmdb.org/t/p/w1920" + json.backdrop_path + "')";
          this.setState({ tmbdInfo: json });
        });
      });
  }

  render() {
    let releaseDate = '';
    let imdbRating = '';
    let rtRating = '';
    let metaRating = '';
    let poster = '';
    let rtImage = Fresh;
    if (this.state === null || this.state.tmbdInfo.release_dates === undefined) {
      return null;
    } else {
      const releasePath = this.state.tmbdInfo.release_dates;
      releaseDate = this.props.location.state.info.DVD;
      //console.log(releaseDate);
      imdbRating = this.props.location.state.info.imdbRating;

      if (this.props.location.state.info.Ratings.length <= 1) {
        rtRating = "N/A";
        rtImage = ratingnotfound;
      } else {
        rtRating = this.props.location.state.info.Ratings[1].Value;
      }

      if (this.props.location.state.info.Poster == "N/A") {
        poster = posternotfound;
      }
      else {
        poster = this.props.location.state.info.Poster;
      }
      metaRating = this.props.location.state.info.Ratings[2].Value;
      //if we can't find the release date with OMDB, search using TMDB api
      if (this.props.location.state.info.DVD === "N/A") {
        //find the date for US release
        if (releasePath.results.length > 0) {
          for (var i = 0; i < releasePath.results.length; i += 1) {
            if (releasePath.results[i].iso_3166_1 == "US") {
              //now find the type: 4 digital, 5 physical
              for (var q = 0; q < releasePath.results[i].release_dates.length; q += 1) {
                if (releasePath.results[i].release_dates[q].type == "4") {
                  releaseDate = moment(releasePath.results[i].release_dates[q].release_date).format('MMMM Do YYYY');
                }
                else if (releasePath.results[i].release_dates[q].type == "5") {
                  releaseDate = moment(releasePath.results[i].release_dates[q].release_date).format('MMMM Do YYYY');
                }
                else releaseDate = "No US release found";
              }
              break;
            }
          }
        } else {
          releaseDate = "No date found";
        }
      }
      console.log(rtRating);
      //rt rating
      if (rtRating <= 60) {
        rtImage = NotFresh;
      }
    }

    return (
      <div>
        <div className="detailsContainer">
          <img className="detailsPoster" src={poster} />
          <div className="mainInfo">
            <div>
              <div className="ratings">
                <img className="rating" src={rtImage} /> {rtRating}
                <img className="rating" src={mta} /> {metaRating}
                <img className="rating" src={imdb} /> {imdbRating}
              </div>
              <div className="title">{this.props.location.state.info.Title} </div>
              <div className="releaseDate">{releaseDate}</div>
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
        <Logo />
      </div>

    )
  }
}
export default Details;