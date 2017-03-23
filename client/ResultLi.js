import React from 'react';

class ResultLi extends React.Component {

  handleClick(eventLi) {
    alert(eventLi.Title);
  }

  render() {
    console.log("desu ^^ :D " + JSON.stringify(this.props.list));
    //use map to create <li>'s, so that resultItems will be a clickable array of li's.
    let resultItems = this.props.list.map((eventLi, index) => {
      console.log("this.props.list = " + this.props.list);
      //tie click events together for each li (add this to bind so you can do things like this.setState (adds context from this component))
      return <li key={index} onClick={this.handleClick.bind(this, eventLi)}>/> <div className="liTitle">{eventLi.Title} </div> </li>;

    });

    //render everything using an ordered list
    return (
      <ol>
        {resultItems}
      </ol>
    )
  }
}


export default ResultLi;