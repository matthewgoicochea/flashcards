import React, { Fragment, useEffect } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import BreadcrumbBar from "./BreadcrumbBar";

function ViewDeck({ OnClick, currentDeck, setCurrentDeck }) {
  const params = useParams();
  const deckId = params.deckId;
  const history = useHistory();

  // sets current deck
  useEffect(() => {
    const abortController = new AbortController();
    const deck = readDeck(deckId, abortController.signal);
    deck.then((deck) => {
      setCurrentDeck({
        name: deck.name,
        description: deck.description,
        cards: deck.cards,
        id: deck.id,
        study: false,
      });
    });
    return () => abortController.abort();
  }, []);

  // delete deck handler
  async function deleteDeck(event) {
    const abortController = new AbortController();
    const restart = window.confirm(
      "Delete this deck? \n \n You will not be able to recover it."
    );
    if (restart) {
      fetch(`http://localhost:5000/decks/${currentDeck.id}`, {
        method: "DELETE",
        signal: abortController.signal,
      });
      history.push("/");
    }
    return () => abortController.abort();
  }

  const deckControlButtons = (
    <>
      <div className="row mb-4">
        <div className="col">
          <button
            className="btn btn-secondary mr-2"
            id="editDeck"
            onClick={OnClick}
            value={deckId}
          >
            Edit
          </button>
          <button
            className="btn btn-primary mr-2"
            id="studyDeck"
            onClick={OnClick}
          >
            Study
          </button>
          <button
            className="btn btn-primary mr-2"
            id="addCards"
            onClick={OnClick}
          >
            Add Cards
          </button>
        </div>
        <div className="col text-right">
          <button
            className="btn btn-danger"
            id="deleteDeck"
            onClick={deleteDeck}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );

  const { url } = useRouteMatch();

  // edit card handler
  const OnEditCard = (event) => {
    const cardId = event.target.parentNode.id;
    history.push(`${url}/cards/${cardId}/edit`);
  };

  const cardTemplate = (front, back, id) => (
    <Fragment key={id}>
      <li className="list-group-item">
        <div className="row">
          <div className="col-sm-6">
            <div className="card border-0">
              <div className="card-body">
                <p className="card-text">{front}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card border-0">
              <div className="card-body">
                <p className="card-text">{back}</p>
              </div>
              <div className="text-right" id={`${id}`}>
                <button
                  className="btn btn-secondary mr-2"
                  id="editCard"
                  onClick={OnEditCard}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  id="deleteCard"
                  onClick={OnClick}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  );

  // compiles cards as list items for current deck
  const cards = currentDeck.cards
    ? currentDeck.cards.map((card) =>
        cardTemplate(card.front, card.back, card.id)
      )
    : "loading...";

  return (
    <Fragment>
      <BreadcrumbBar nav1={currentDeck.name} />
      <h4>{currentDeck.name}</h4>
      <p>{currentDeck.description}</p>
      {deckControlButtons}
      <h2>Cards</h2>
      <ul className="list-group mb-4">{cards}</ul>
    </Fragment>
  );
}

export default ViewDeck;
