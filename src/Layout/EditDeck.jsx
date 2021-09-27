import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { readDeck, updateDeck } from "../utils/api";
import BreadcrumbBar from "./BreadcrumbBar";
import DeckForm from "./DeckForm";

function EditDeck({ OnClick, newDeckObject }) {
  const params = useParams();
  const deckId = params.deckId;
  const history = useHistory();

  const [editState, setEditState] = useState({
    decks: { name: "", description: "" },
    deckName: "...loading",
    placeholderDescription: "...loading",
    editedDeck: {
      id: deckId,
      name: "",
      description: "",
    },
  });

  const onCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  // submits updated deck
  const onSubmit = (event) => {
    const abortController = new AbortController();
    updateDeck(editState.editedDeck, abortController.signal);
    history.push(`/decks/${deckId}`);
    return () => abortController.abort();
  };

  // loads deck to edit and sets edit state
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      const deck = await readDeck(deckId, abortController.signal);
      setEditState({
        ...editState,
        name: deck.name,
        deckName: deck.name,
        deckDescription: deck.description,
      });
    }
    loadDeck();
    return () => abortController.abort();
  }, [deckId, editState]);

  return (
    <>
      <BreadcrumbBar
        nav1={editState.name}
        link1={`/decks/${deckId}`}
        nav2={"Edit Deck"}
      />
      <h2>Edit Deck</h2>
      <DeckForm
        OnClick={OnClick}
        newDeckObject={newDeckObject}
        editState={editState}
        setEditState={setEditState}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default EditDeck;
