import { useState } from "react";
import "./App.css";
import Game from "../components/Game";
import logo from "../assets/Tic_tac_toe.png";

const APP_NAME = "איקס עיגול";

function App() {
  const [gameCounter, setGameCounter] = useState(0);

  return (
    <div id="game-container">
      <div id="header">
        <h1>{APP_NAME}</h1>
        <img src={logo} />
      </div>
      <Game key={gameCounter} />
      <button
        id="rest-game-btn"
        onClick={() => setGameCounter(gameCounter + 1)}
      >
        משחק חדש
      </button>
    </div>
  );
}

export default App;
