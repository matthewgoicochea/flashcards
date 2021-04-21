import React, { Fragment } from "react";
import { useRouteMatch } from "react-router";

function CardForm({ editCardState, setEditCardState, newCard, setNewCard }) {
  const { url } = useRouteMatch();
  const isNew = url.includes("new");

  const handleChange = (event) => {
    if (isNew) {
      setNewCard({ ...newCard, [event.target.name]: event.target.value });
    } else {
      setEditCardState({
        ...editCardState,
        [event.target.name]: event.target.value,
      });
    }
  };

  if (isNew) {
    return (
      <Fragment>
        <div className="mb-3">
          <label htmlFor="Front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            type="text"
            name="front"
            onChange={handleChange}
            value={newCard.front}
            rows="2"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="Back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            type="text"
            name="back"
            onChange={handleChange}
            value={newCard.back}
            rows="2"
          ></textarea>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="mb-3">
        <label htmlFor="Front" className="form-label">
          Front
        </label>
        <textarea
          className="form-control"
          id="front"
          type="text"
          name="front"
          onChange={handleChange}
          value={editCardState.front}
          rows="2"
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="Back" className="form-label">
          Back
        </label>
        <textarea
          className="form-control"
          id="back"
          type="text"
          name="back"
          onChange={handleChange}
          value={editCardState.back}
          rows="2"
        ></textarea>
      </div>
    </Fragment>
  );
}

export default CardForm;
