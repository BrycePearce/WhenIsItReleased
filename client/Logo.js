import React from 'react';
import tmLogo from './static/logo.png';

class Logo extends React.Component {
  render() {
    return (
      <div>
        <div className="tmdbTM"> <img id="logo" src={tmLogo} /> This product uses the TMDb API but is not endorsed or certified by TMDb.</div>
      </div>
    )
  }
}

export default Logo;