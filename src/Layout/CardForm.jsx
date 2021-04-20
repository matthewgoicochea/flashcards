import React, { Fragment } from "react";
import { useRouteMatch } from "react-router";

function CardForm({ editCardState, setEditCardState, newCard }) {
  const { url } = useRouteMatch();

  const handleChange = (event) => {
    setEditCardState({
      ...editCardState,
      [event.target.name]: event.target.value,
    });
  };

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
          value={url.includes("new") ? newCard.front : editCardState.front}
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
          value={url.includes("new") ? newCard.back : editCardState.back}
          rows="2"
        ></textarea>
      </div>
    </Fragment>
  );
}

export default CardForm;
