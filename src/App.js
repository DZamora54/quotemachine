import React from 'react';
import ReactDOM from 'react-dom';
// import logo from './logo.svg';
import './Normalize.css'
import './App.css';

// Link to QuoteGarden
const randomQuote = "https://quote-garden.herokuapp.com/api/v3/quotes/random";

// Declaring variable to store quote text and quote author
let myQuote = {
  quoteAuthor: "Anonymous",
  quoteText: "No Comment"
};

// State gets quote from QuoteGarden and stores returned values in myQuote
const getQuote = () => {
  console.log("getting quote");
  fetch(randomQuote)
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((data) => {
      // console.log(data.data[0]["quoteAuthor"]);
      // console.log(data.data[0]["quoteText"]);
      myQuote.quoteAuthor = data.data[0]["quoteAuthor"];
      myQuote.quoteText = data.data[0]["quoteText"];
    });
};
// End gets quote from QuoteGarden and stores returned values in myQuote

// Calls getQuote when window loads
window.addEventListener("load", getQuote);

// Start QuoteMachine component
class QuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteAuthor: "",
      quoteText: "",
      twitterUrl: ""
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // Updates state when the component renders
  componentDidMount() {
    console.log("component mounted");
    fetch(randomQuote)
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        this.setState({ quoteAuthor: data.data[0]["quoteAuthor"] });
        this.setState({ quoteText: data.data[0]["quoteText"] });
        this.setState({twitterUrl: data.data[0]["quoteText"]+"-"+data.data[0]["quoteAuthor"]})
      });
  }

  // Handles the click event on the "New Quote" button
  handleClick() {
    console.log("handling click");
    getQuote();
    this.setState({
      quoteAuthor: myQuote.quoteAuthor,
      quoteText: myQuote.quoteText,
      twitterUrl: myQuote.quoteText+"-"+myQuote.quoteAuthor
    });
  }

  // Renders the elements to the screen
  render() {
    return (
      <div id="quote-box">
        <p id="text">{this.state.quoteText}</p>
        <p id="author">{this.state.quoteAuthor}</p>
        <div id="buttons">
        <button id="new-quote" onClick={() => this.handleClick()}>
          New Quote
        </button>
        <button>
        <a
          className="twitter-share-button"
          id="tweet-quote"
          href={"https://twitter.com/intent/tweet?text=" + this.state.quoteText + " - " + this.state.quoteAuthor}
          target="blank"
        >
          Tweet Quote
        </a>
        </button>
        </div>
      </div>
    );
  }
}
// End QuoteMachine component

// quote renders QuoteMachine
const quote = () => {
  ReactDOM.render(<QuoteMachine />, document.getElementById("root"));
};

quote();

export default QuoteMachine