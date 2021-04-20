import React from "react";
import { useRouteMatch } from "react-router";

function DeckForm({
  OnClick,
  newDeckObject,
  setNewDeckObject,
  editState,
  setEditState,
  onCancel,
  onSubmit,
}) {
  // create deck handler
  const handleChange = (event) => {
    setNewDeckObject({
      ...newDeckObject,
      [event.target.name]: event.target.value,
    });
  };

  const handleNameChange = (event) => {
    setEditState({
      ...editState,
      deckName: event.target.value,
      editedDeck: { ...editState.editedDeck, name: event.target.value },
    });
  };

  const handleDescriptionChange = (event) => {
    setEditState({
      ...editState,
      deckDescription: event.target.value,
      editedDeck: { ...editState.editedDeck, description: event.target.value },
    });
  };

  const { url } = useRouteMatch();

  if (url.includes("edit")) {
    return (
      <>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="deckName"
            onChange={handleNameChange}
            value={editState.deckName}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="deckDescription"
            rows="3"
            onChange={handleDescriptionChange}
            value={editState.deckDescription}
          ></textarea>
          <button
            className="btn btn-secondary mr-2 mt-2"
            id="cancelEditDeck"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary mt-2"
            id="submitEditDeck"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </>
    );
  }

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="deck-name" className="form-label">
          Name
        </label>
        <input
          className="form-control"
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={newDeckObject.name}
          placeholder="Deck Name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="deck-description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          type="password"
          name="description"
          onChange={handleChange}
          value={newDeckObject.description}
          placeholder="Brief description of the deck"
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary mr-2"
        id="cancelCreateDeck"
        onClick={OnClick}
      >
        Cancel
      </button>
      <button
        type="button"
        className="btn btn-primary"
        id="submitCreateDeck"
        onClick={OnClick}
      >
        Submit
      </button>
    </form>
  );
}

export default DeckForm;
