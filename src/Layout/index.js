import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import DeckList from "./DeckList";
import Study from "./Study";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import { createDeck, deleteCard, deleteDeck } from "../utils/api";
import ViewDeck from "./ViewDeck";

function Layout() {
  // lifted states
  const [allDecks, setAllDecks] = useState({});
  const [currentDeck, setCurrentDeck] = useState({});
  const [newDeckObject, setNewDeckObject] = useState({
    name: "",
    description: "",
  });
  const [newCard, setNewCard] = useState({ front: "", back: "" });

  // for navigation
  const history = useHistory();

  // resets current deck at home screen
  useEffect(() => {
    const abortController = new AbortController();
    setCurrentDeck({});
    return () => abortController.abort();
  }, []);

  // global button handler
  const OnClick = (event) => {
    const btnType = event.target.id;
    const deckId = event.target.parentNode.id;
    if (btnType === "viewDeck") {
      history.push(`/decks/${deckId}`);
    }
    if (btnType === "studyDeck") {
      history.push(`/decks/${deckId ? deckId : currentDeck.id}/study`);
    }
    if (btnType === "cancelCreateDeck") {
      history.push("/");
    }
    if (btnType === "submitCreateDeck") {
      createDeck(newDeckObject).then((deck) =>
        history.push(`/decks/${deck.id}`)
      );
    }
    if (btnType === "addCards") {
      history.push(`/decks/${deckId ? deckId : currentDeck.id}/cards/new`);
    }
    if (btnType === "deleteCard") {
      const restart = window.confirm(
        "Delete this card? \n \n You will not be able to recover it."
      );
      if (restart) {
        deleteCard(event.target.parentNode.id);
        history.go(0);
      }
    }
    if (btnType === "editDeck") {
      history.push(`/decks/${event.target.value}/edit`);
    }
    if (btnType === "cancelEditDeck") {
      history.push(`/decks/${deckId ? deckId : currentDeck.id}/`);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          {/* HOME */}
          <Route exact={true} path="/">
            <Home />
            <DeckList
              OnClick={OnClick}
              allDecks={allDecks}
              setAllDecks={setAllDecks}
            />
          </Route>
          {/* EDIT CARD */}
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard
              newCard={newCard}
              setNewCard={setNewCard}
              currentDeck={currentDeck}
            />
          </Route>
          {/* ADD CARD */}
          <Route path="/decks/:deckId/cards/new">
            <AddCard
              newCard={newCard}
              setNewCard={setNewCard}
              currentDeck={currentDeck}
              setCurrentDeck={setCurrentDeck}
            />
          </Route>
          {/* NEW DECK */}
          <Route path={`/decks/new`}>
            <CreateDeck
              OnClick={OnClick}
              newDeckObject={newDeckObject}
              setNewDeckObject={setNewDeckObject}
            />
          </Route>
          {/* EDIT DECK */}
          <Route path={`/decks/:deckId/edit`}>
            <EditDeck OnClick={OnClick} newDeckObject={newDeckObject} />
          </Route>
          {/* STUDY DECK */}
          <Route path={`/decks/:deckId/study`}>
            <Study currentDeck={currentDeck} setCurrentDeck={setCurrentDeck} />
          </Route>
          {/* VIEW DECK */}
          <Route path="/decks/:deckId">
            <ViewDeck
              OnClick={OnClick}
              currentDeck={currentDeck}
              setCurrentDeck={setCurrentDeck}
            />
          </Route>
          {/* NOT FOUND */}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
