import React from "react";
import { Link } from "react-router-dom";

function Dashboard({ state, allDecks }) {
  const onSave = (event) => {
    console.log(checks);
    //add checked to array values
    const save = [];
    checks.forEach((item) => {
      const inputs = document.querySelectorAll("input");
      for (let i = 0; i < inputs.length; i++) {}
    });
  };

  const checks = [];
  const onChange = (event) => {
    checks.push(event.target.value);
  };

  const allDecksArray = Array.from(allDecks);

  const studyChecklist = allDecksArray.map((deck) => {
    return (
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value={deck.name}
          id={`${deck.id}`}
          onChange={onChange}
        />
        <label class="form-check-label" for={`${deck.id}`}>
          {deck.name}
        </label>
      </div>
    );
  });

  return (
    <div className="container">
      <h1 className="h1">Dashboard</h1>
      <Link to="/decks/new">
        <button
          type="button"
          className="btn btn-secondary mb-2"
          id="createDeck"
        >
          Create Deck
        </button>
      </Link>
      <p>Decks: {allDecks.length}</p>
      <p>Cards: {state.cards.length}</p>
      <div className="study-checklist"></div>
    </div>
  );
}

export default Dashboard;
