import "./App.css";
import Die from "./Die";
import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [diceArray, setDiceArray] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);

  function createNewDie() {
    return {
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    let diceArray = [];
    for (let i = 0; i < 10; i++) {
      diceArray.push(createNewDie());
    }
    return diceArray;
  }

  function newDice() {
    setRolls((prevRolls) => prevRolls + 1);
    if (tenzies) {
      setTenzies((oldTenzies) => !oldTenzies);
      setDiceArray(allNewDice());
    } else {
      setDiceArray((prevDiceArray) =>
        prevDiceArray.map((die) => {
          return die.isHeld ? die : createNewDie();
        })
      );
    }
  }

  React.useEffect(() => {
    const allHeld = diceArray.every((die) => {
      return die.isHeld;
    });

    const randomObj = diceArray[1];

    const sameValue = diceArray.every((die) => {
      return die.value == randomObj.value;
    });

    if (allHeld && sameValue) {
      setTenzies((oldTenzies) => !oldTenzies);
    }
  }, [diceArray]);

  React.useEffect(() => {
    console.log(tenzies);
    setRolls(0);
  }, [tenzies]);

  const diceElements = diceArray.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      holdDice={() => holdDice(die.id)}
      isHeld={die.isHeld}
      id={die.id}
    />
  ));

  function holdDice(id) {
    setDiceArray((prevDiceArray) =>
      prevDiceArray.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  function freedom() {
    console.log("reeeee");
  }

  return (
    <>
      <main>
        {tenzies && <Confetti />}
        <div id="primary">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div id="dies-container">{diceElements}</div>
          <button onClick={newDice}>{tenzies ? "New Game" : "Roll"}</button>
          <button onClick={freedom}>CLick me</button>
          <p className="rolls">number of rolls {rolls}</p>
        </div>
      </main>
    </>
  );
}

export default App;
