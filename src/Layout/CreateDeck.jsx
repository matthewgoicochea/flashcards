import React, { Fragment } from "react";
import BreadcrumbBar from "./BreadcrumbBar";
import DeckForm from "./DeckForm";

function CreateDeck({ OnClick, newDeckObject, setNewDeckObject }) {
  return (
    <Fragment>
      <BreadcrumbBar nav1={"Create Deck"} />
      <h1>Create Deck</h1>
      <DeckForm
        OnClick={OnClick}
        newDeckObject={newDeckObject}
        setNewDeckObject={setNewDeckObject}
      />
    </Fragment>
  );
}

export default CreateDeck;
