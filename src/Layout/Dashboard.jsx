import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Dashboard({ allDecks }) {
  return (
    <Fragment>
      {console.log(allDecks)}
      <h1 className="h1">Dashboard</h1>
      <p>Decks: {allDecks.length}</p>
      <p>Cards: {allDecks.length}</p>
      <p>Study Checklist:</p>
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

export default Dashboard;
