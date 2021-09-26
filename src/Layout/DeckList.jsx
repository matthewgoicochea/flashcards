import React, { useEffect, Fragment } from "react";
import { useHistory } from "react-router";
import { listAllCards, listDecks } from "../utils/api";

function DeckList({ state, setState, OnClick, allDecks, setAllDecks }) {
  const history = useHistory();

  // creates iterable array from allDecks
  const newAllDecksArray = Array.from(allDecks);

  // returns list items in card format
  const listItemDecks = newAllDecksArray.map((deck) =>
    createCardForDeck(deck.name, deck.description, deck.id, deck.cards.length)
  );

  // loads all decks
  useEffect(() => {
    const abortController = new AbortController();
    async function loadState() {
      const cards = await listAllCards(abortController.signal);
      setState({ ...state, cards: cards });
    }
    loadState();
    //
    async function loadDecksWithCards() {
      const decks = await listDecks(abortController.signal);
      setAllDecks(decks);
    }
    loadDecksWithCards();
    return () => abortController.abort();
  }, [setAllDecks]);

  async function deleteDeck(event) {
    const restart = window.confirm(
      "Delete this deck? \n \n You will not be able to recover it."
    );
    if (restart) {
      const deckIdToDelete = event.target.parentNode.id;
      fetch(`http://localhost:5000/decks/${deckIdToDelete}`, {
        method: "DELETE",
      });
      history.go(0);
    }
  }

  // creates cards from allDecks
  function createCardForDeck(name, description, id, cardsNum) {
    return (
      <Fragment key={id}>
        <li className="list-group-item">
          <div className="card border-0">
            <div className="card-body" id={id}>
              <h5 className="card-title">{name}</h5>
              <p>{`${cardsNum} cards`}</p>
              <p className="card-text">{description}</p>
              <button
                to="/"
                className="btn btn-secondary mr-1"
                id="viewDeck"
                onClick={OnClick}
              >
                View
              </button>
              <button
                to="/"
                className="btn btn-primary mr-1"
                id="studyDeck"
                onClick={OnClick}
              >
                Study
              </button>
              <button
                to="/"
                className="btn btn-danger"
                id="deleteDeck"
                onClick={deleteDeck}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ul className="list-group">{listItemDecks}</ul>
    </Fragment>
  );
}

export default DeckList;
