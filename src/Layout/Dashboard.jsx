import React, { Fragment } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <Fragment>
      <h1 className="h1">Dashboard</h1>
      <p>Decks:</p>
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
