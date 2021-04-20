import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Fragment>
      <Link to="/decks/new">
        <button
          type="button"
          className="btn btn-secondary mb-2"
          id="createDeck"
        >
          Create Deck
        </button>
      </Link>
    </Fragment>
  );
}

export default Home;
