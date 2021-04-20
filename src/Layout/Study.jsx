import React, { useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import BreadcrumbBar from "./BreadcrumbBar";

function Study({ currentDeck, setCurrentDeck }) {
  const params = useParams();
  const deckId = params.deckId;
  const history = useHistory();

  // loads current deck and sets state
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then((deck) => {
      setCurrentDeck({
        id: deck.id,
        name: deck.name,
        description: deck.description,
        cards: [deck.cards],
        cardNumber: 0,
        flipped: false,
        study: true,
      });
    });
    return () => abortController.abort();
  }, []);

  // flips card
  const onFlip = () => {
    setCurrentDeck({ ...currentDeck, flipped: !currentDeck.flipped });
  };

  // next button handler
  const onNext = () => {
    if (currentDeck.cardNumber + 1 === currentDeck.cards[0].length) {
      const restart = window.confirm(
        "Restart cards? \n \n Click 'cancel' to return to the home page."
      );
      if (restart) {
        history.go(0);
      } else {
        setCurrentDeck({});
        history.push("/");
      }
    }
    // sets next card
    setCurrentDeck({
      ...currentDeck,
      cardNumber: currentDeck.cardNumber + 1,
      flipped: false,
    });
  };

  // card buttons
  const flipBtn = (
    <button onClick={onFlip} className="btn btn-secondary">
      Flip
    </button>
  );

  const bothBtns = (
    <>
      <button
        onClick={onFlip}
        id="flipFront"
        className="btn btn-secondary mr-2"
      >
        Flip
      </button>
      <button onClick={onNext} id="flipNext" className="btn btn-primary">
        Next
      </button>
    </>
  );

  // compiles current card
  const studyCard = (number, total, front, back) => (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          Card {number} of {total}
        </h5>
        <p>{currentDeck.flipped ? back : front}</p>
        {currentDeck.flipped ? bothBtns : flipBtn}
      </div>
    </div>
  );

  const notEnoughCards = (num) => {
    let message = "init";
    if (num === 1) {
      message = "There is 1 card in this deck.";
    } else {
      message = `There are ${num} cards in this deck.`;
    }
    return (
      <>
        <BreadcrumbBar
          nav1={currentDeck.name}
          link1={`/decks/${deckId}`}
          nav2={"Study"}
        />
        <h1>Study: {currentDeck.name} </h1>
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards to study. {message}</p>
        <Link
          to={`/decks/${deckId}/cards/new`}
          className="btn btn-primary"
          id="addCards"
        >
          Add Cards
        </Link>
      </>
    );
  };

  // renders study session
  if (currentDeck.study) {
    if (currentDeck.cards[0].length <= 2) {
      return notEnoughCards(currentDeck.cards[0].length);
    }
    return (
      <>
        <BreadcrumbBar
          nav1={currentDeck.name}
          link1={`/decks/${deckId}`}
          nav2={"Study"}
        />
        <h1>Study: {currentDeck.name} </h1>
        {studyCard(
          currentDeck.cardNumber + 1,
          currentDeck.cards[0].length,
          currentDeck.cards[0][currentDeck.cardNumber].front,
          currentDeck.cards[0][currentDeck.cardNumber].back
        )}
      </>
    );
  }
  return <h1>Loading</h1>;
}

export default Study;
