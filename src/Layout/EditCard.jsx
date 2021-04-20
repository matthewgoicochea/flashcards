import React, { Fragment, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { readCard, readDeck, updateCard } from "../utils/api";
import BreadcrumbBar from "./BreadcrumbBar";
import CardForm from "./CardForm";

function EditCard({ newCard, setNewCard, currentDeck }) {
  const params = useParams();
  const deckId = params.deckId;
  const cardId = params.cardId;
  const history = useHistory();

  // initializes component for editing
  const [editCardState, setEditCardState] = useState({
    edit: false,
  });

  // loads deck and card to edit
  useEffect(() => {
    const abortController = new AbortController();
    setNewCard({ front: "", back: "" });
    readDeck(deckId, abortController.signal)
      .then((deck) => {
        setEditCardState({ ...editCardState, edit: true, deckName: deck.name });
        return readCard(cardId, abortController.signal);
      })
      .then((card) => {
        setEditCardState({
          ...editCardState,
          edit: true,
          deckName: editCardState.deckName,
          front: card.front,
          back: card.back,
        });
      });
    return () => abortController.abort();
  }, []);

  const onCancel = () => {
    setEditCardState({ edit: false });
    history.push(`/decks/${deckId}`);
  };

  // compiles and submits updated card
  const onSubmit = () => {
    const editedCard = {
      id: cardId,
      front: editCardState.front,
      back: editCardState.back,
      deckId: parseInt(deckId),
    };
    updateCard(editedCard);
    history.push(`/decks/${deckId}`);
		// resets edit component 
    setEditCardState({ edit: false });
  };

  if (editCardState.edit) {
    return (
      <Fragment>
        <BreadcrumbBar
          nav1={`Deck ${currentDeck.name}`}
          link1={`/decks/${deckId}`}
          nav2={`Edit Card ${cardId}`}
        />
        <h2 className="mt-2">Edit Card</h2>
        <CardForm
          newCard={newCard}
          setNewCard={setNewCard}
          editCardState={editCardState}
          setEditCardState={setEditCardState}
          cardFront={editCardState.front}
          cardBack={editCardState.back}
        />
        <button
          className="btn btn-secondary mr-2"
          id="doneEditCard"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          id="submitEditCard"
          onClick={onSubmit}
        >
          Submit
        </button>
      </Fragment>
    );
  }
  return "Loading";
}

export default EditCard;
