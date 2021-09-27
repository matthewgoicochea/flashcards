import React from "react";
import { Link } from "react-router-dom";

function Dashboard({ state, setState, allDecks }) {
  function toggleDarkMode() {
    setState({ ...state, darkMode: !state.darkMode });

    const body = document.querySelector("body");
    const buttons = document.querySelectorAll("button");
    const listItems = document.querySelectorAll("li");
    const cards = document.querySelectorAll(".card");
    const header = document.querySelector(".header");

    if (state.darkMode) {
      // toggle on
      body.classList.add("bg-dark");
      body.classList.add("text-light");
      buttons.forEach((btn) => {
        btn.classList.add("text-light");
      });
      listItems.forEach((item) => {
        item.classList.add("bg-dark");
        item.classList.add("border-light");
      });
      cards.forEach((card) => {
        card.classList.add("bg-dark");
        card.classList.add("text-light");
      });
      header.classList.remove("bg-dark");
      header.classList.add("bg-darker");
    } else {
      //toggle off
      body.classList.remove("bg-dark");
      body.classList.remove("text-light");
      buttons.forEach((btn) => {
        btn.classList.remove("text-light");
      });
      listItems.forEach((item) => {
        item.classList.remove("bg-dark");
      });
      cards.forEach((card) => {
        card.classList.remove("bg-dark");
        card.classList.remove("text-light");
      });
      header.classList.add("bg-dark");
      header.classList.remove("bg-darker");
    }
  }

  /*
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
  });*/

  return (
    <div className="container">
      <div className="row">
        <h1 className="col h1">Dashboard</h1>
        <button
          className="col text-end btn shadow-none d-none"
          onClick={toggleDarkMode}
        >
          mode
        </button>
      </div>
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
