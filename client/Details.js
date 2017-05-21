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
import OmdbKey from './OmdbKey';

class Details extends React.Component {

  constructor(props) {
    super(props);
    //if we have props, use them, otherwise set info to null
    this.state = {
      info: this.props.location.state ? this.props.location.state.info : null,
      dvdRelease: ''
    };
  }

  componentWillMount() {
    let releaseDate = '';

    //OMDB call for external load
    if (!this.state.info) {
      fetch('http://www.omdbapi.com/?i=' + this.props.params.id + '&apikey=' + OmdbKey)
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
          const releasePath = json.release_dates

          //find the date for US release
          if (releasePath.results.length > 0) {
            for (let i = 0; i < releasePath.results.length; i += 1) {
              //find the US release array #
              if (releasePath.results[i].iso_3166_1 == "US") {
                //now find the type: 4 digital, 5 physical
                for (let q = 0; q < releasePath.results[i].release_dates.length; q += 1) {
                  if (releasePath.results[i].release_dates[q].type == "4") {
                    releaseDate = moment(releasePath.results[i].release_dates[q].release_date).format('MMMM Do YYYY');
                  }
                  else if (releasePath.results[i].release_dates[q].type == "5") {
                    releaseDate = moment(releasePath.results[i].release_dates[q].release_date).format('MMMM Do YYYY');
                  }
                }
                this.setState({ dvdRelease: releaseDate });
                break;
              }
            }
          }

          //OMDB (only calling this if there is no TMDB release date)
          if (releaseDate === '') {
            fetch('http://www.omdbapi.com/?i=' + this.props.params.id + '&apikey=' + OmdbKey)
              .then((response) => {
                response.json().then((json) => {
                  this.setState({ dvdRelease: json.DVD });
                });
              });
          }
        });
      });

  }

  render() {
    if (!this.state.info) {
      return <div>Not found</div>
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
    if (this.state.dvdRelease === undefined || this.state.dvdRelease === "") {
      releaseDate = "unknown";
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