import React, { Fragment, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";
import BreadcrumbBar from "./BreadcrumbBar";

function AddCard({
  setCurrentDeck,
  currentDeck,
  newCard,
  setNewCard,
  editCardState,
  setEditCardState,
}) {
  const history = useHistory();
  const params = useParams();
  const deckId = params.deckId;

  // sets current deck
  useEffect(() => {
    const abortController = new AbortController();
    const deck = readDeck(deckId);
    deck.then((deck) => {
      setCurrentDeck({ ...currentDeck, name: deck.name });
    });
    return () => abortController.abort();
  }, [deckId]);

  const OnDone = () => {
    history.push(`/decks/${deckId}`);
  };

  // saves card and re-initializes AddCard component
  const OnSave = () => {
    createCard(currentDeck.id, newCard);
    setNewCard({ ...newCard, front: "", back: "" });
    history.push(`/decks/${deckId}/cards/new`);
  };

  return (
    <Fragment>
      <BreadcrumbBar
        nav1={currentDeck.name}
        link1={`/decks/${deckId}`}
        nav2={"Add Card"}
      />
      <h3>{currentDeck.name}: Add Card</h3>
      <CardForm
        newCard={newCard}
        setNewCard={setNewCard}
        cardFront={"Front side of card"}
        cardBack={"Back side of card"}
        editCardState={editCardState}
        setEditCardState={setEditCardState}
      />
      <button
        className="btn btn-secondary mr-2"
        id="doneAddCard"
        onClick={OnDone}
      >
        Done
      </button>
      <button className="btn btn-primary" id="saveAddCard" onClick={OnSave}>
        Save
      </button>
    </Fragment>
  );
}

export default AddCard;
