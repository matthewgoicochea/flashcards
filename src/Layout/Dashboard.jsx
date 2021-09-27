import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DeckList from "./DeckList";
import { listAllCards } from "../utils/api";
import { listDecks } from "../utils/api";

function Dashboard({ state, setState, allDecks, OnClick, setAllDecks }) {
  function toggleDarkMode() {
    setState({ ...state, darkMode: !state.darkMode });

    const body = document.querySelector("body");
    const buttons = document.querySelectorAll("button");
    const listItems = document.querySelectorAll("li");
    const cards = document.querySelectorAll(".card");
    const sun = document.querySelector("#sun");
    const moon = document.querySelector("#moon");

    if (state.darkMode) {
      // toggle on
      sun.classList.remove("d-none");
      moon.classList.add("d-none");

      body.classList.add("bg-dark");
      body.classList.add("text-light");
      body.classList.remove("text-dark");

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
    } else {
      //toggle off
      sun.classList.add("d-none");
      moon.classList.remove("d-none");

      body.classList.remove("bg-dark");
       body.classList.remove("text-light");
      body.classList.add("text-dark");

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
    }
  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="col h1">Dashboard</h1>
        <div className="col text-end">
          <button className="btn shadow-none" onClick={toggleDarkMode}>
            <i className="bi bi-brightness-high text-light" id="sun"></i>
            <i className="bi bi-moon text-dark" id="moon"></i>
          </button>
        </div>
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
      <p>Decks: {/*allDecks.length*/}</p>
      <p>Cards: {/*state.cards.length*/}</p>
      <div className="study-checklist"></div>
      <DeckList
        state={state}
        setState={setState}
        OnClick={OnClick}
        allDecks={allDecks}
        setAllDecks={setAllDecks}
      />
    </div>
  );
}

export default Dashboard;

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
