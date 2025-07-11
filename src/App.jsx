import { useState } from "react";
import { languages } from "./language";
import  { generateRandomWord }  from "./message";
import clsx from "clsx";

function App() {
  
  

  const [words, setWords] = useState(() => generateRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  
  const wrongGuessCount = guessedLetters.filter(letter => !words.includes(letter));

  const isGameWon = words.split("").every(letter => guessedLetters.includes(letter));

  const isGameLost = wrongGuessCount.length >= languages.length-1;

  const isGameOver = isGameWon || isGameLost;

  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  function addGuessedLetter(letter) {
    setGuessedLetters((prev) =>
      prev.includes(letter) ? prev : [...prev, letter]
    );
  }

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount.length
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    };
    const className = clsx("chip", isLanguageLost && "lost")
    return <span className={className} style={styles}>{lang.name}</span>;
  });

  const letterElements = words
    .split("")
    .map((letter, index) => <span key={index} >{guessedLetters.includes(letter) ? letter.toUpperCase() : ""}</span>);

  const keyboardElements = alphabets.split("").map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && words.includes(letter);
    const isWrong = isGuessed && !words.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    return (
      <button
       disabled={isGameOver}
        className={className}
       key={index} onClick={() => addGuessedLetter(letter)}>
        {letter.toUpperCase()}
      </button>
    );
  });

  function reset() {
    setWords(generateRandomWord());
    setGuessedLetters([]);
  }
  

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      {isGameWon && <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! </p>
      </section>}
      {isGameLost && <section className="game-loss">
        <h2>You loss!</h2>
        <p>Better luck next time!</p>
      </section>}
      
      <section className="language-chips">{languageElements}</section>
      <section className="word">{letterElements}</section>
      <section className="keyboard"> {keyboardElements} </section>
      {isGameOver && <section className="game">
        <button onClick={reset}>New Game</button>
      </section>}
    </main>
  );
}

export default App;
