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

  constructor(props) {
    super(props);
    //if there are no props, set state to null
    this.state = {
      info: this.props.location.state ? this.props.location.state.info : null,
      dvdRelease: ''
    };

  }

  componentWillMount() {
    let releaseDate = '';

    //OMDB call for external load
    if (!this.state.info) {
      console.log("external load");
      fetch('http://www.omdbapi.com/?i=' + this.props.params.id)
        .then((response) => {
          response.json().then((json) => {
            this.setState({ info: json });
          });
        });
    }

    //TMDB
    fetch('http://api.themoviedb.org/3/movie/' + this.props.params.id + "?api_key=" + Key + '&append_to_response=release_dates')
      .then((response) => {
        response.json().then((json) => {
          //check if there is a valid dvd release date
          if (json.release_dates.results[9].release_dates[3]) {
            console.log("TMDB found it");
            console.log(json.release_dates.results[9].release_dates[3].release_date);
            releaseDate = moment(json.release_dates.results[9].release_dates[3].release_date).format('MMM Do YYYY');
            this.setState({ dvdRelease: releaseDate });
          }

          //OMDB (only calling this if there is no TMDB release date)
          if (releaseDate === '') {
            fetch('http://www.omdbapi.com/?i=' + this.props.params.id)
              .then((response) => {
                response.json().then((json) => {
                  console.log("OMDB found it");
                  console.log(json.DVD);
                  this.setState({ dvdRelease: json.DVD });
                });
              });
          }
        });
      });
  }

  render() {
    if (!this.state.info) {
      return <div>Loading...</div>
    }
    let releaseDate = this.state.dvdRelease;
    let imdbRating = '';
    let rtRating = '';
    let metaRating = '';
    let poster = '';
    let rtImage = Fresh;
    imdbRating = this.state.info.imdbRating;

    if (this.state.info.Ratings.length <= 1) {
      rtRating = "N/A";
      rtImage = ratingnotfound;
    } else {
      rtRating = this.state.info.Ratings[1].Value;
    }

    if (this.state.info.Poster == "N/A") {
      poster = posternotfound;
    }
    else {
      poster = this.state.info.Poster;
    }
    if (this.state.info.Ratings.length <= 2) {
      metaRating = "N/A";
    } else {
      metaRating = this.state.info.Ratings[2].Value;
    }
    //rt rating
    if (rtRating <= 60) {
      rtImage = NotFresh;
    }

    return (
      <div>
        <div className="detailsContainer">
          <img className="detailsPoster" src={poster} />
          <div className="mainInfo">
            <div>
              <div className="ratings">
                <div className="rating">
                  <img className="image" src={rtImage} />
                  <span>{rtRating}</span>
                </div>
                <div className="rating">
                  <img className="image" src={mta} />
                  <span>{metaRating}</span>
                </div>
                <div className="rating">
                  <img className="image" src={imdb} />
                  <span>{imdbRating}</span>
                </div>
              </div>
              <div className="title">{this.state.info.Title} </div>
              <div className="releaseDate">{releaseDate}</div>
              <div className="plot">{this.state.info.Plot} </div>
              <div className="overviewDetailsArea">
                <div className="left">
                  <div className="details"> <p>Country</p>{this.state.info.Country} </div>
                  <div className="details"> <p>Rating</p>{this.state.info.Rated} </div>
                </div>
                <div className="right">
                  <div className="details"> <p>Genre</p>{this.state.info.Genre} </div>
                  <div className="details"> <p>Runtime</p>{this.state.info.Runtime} </div>
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