import "./Game.css";
import { useState, useRef } from "react";

const BOARD_SIZE = 3;
const PLAYER = {
  X: "x",
  O: "o",
};
const STATUS = {
  RUNNING: "running",
  TIE: "תיקו",
  THERE_IS_WINNER: "המנצח הוא ",
};

export default function Game() {
  const isXTurn = useRef(true);
  const winner = useRef("");
  const turns = useRef(0);
  const [gameStatus, setGameStatus] = useState(STATUS.RUNNING);
  const [gameBoard, setGameBoard] = useState(
    new Array(BOARD_SIZE).fill("").map(() => new Array(BOARD_SIZE).fill(""))
  );

  function handlePlayerClick(row: number, colum: number): void {
    if (gameStatus != STATUS.RUNNING) return;

    turns.current = turns.current + 1;
    const newGameBoard = [...gameBoard];
    const currentPlayer = isXTurn.current ? PLAYER.X : PLAYER.O;
    newGameBoard[row][colum] = currentPlayer;
    isXTurn.current = !isXTurn.current;
    setGameBoard(newGameBoard);
    setGameStatus(checkForWinner(currentPlayer, row, colum));
  }

  function checkForWinner(player: string, row: number, colum: number): string {
    /* check row */
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (gameBoard[row][i] != player) {
        break;
      }
      if (i == BOARD_SIZE - 1) {
        winner.current = player;
        return STATUS.THERE_IS_WINNER;
      }
    }

    /* check colum */
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (gameBoard[i][colum] != player) {
        break;
      }
      if (i == BOARD_SIZE - 1) {
        winner.current = player;
        return STATUS.THERE_IS_WINNER;
      }
    }

    /* check diagonal */
    if (row == colum) {
      for (let i = 0; i < BOARD_SIZE; i++) {
        if (gameBoard[i][i] != player) {
          break;
        }
        if (i == BOARD_SIZE - 1) {
          winner.current = player;
          return STATUS.THERE_IS_WINNER;
        }
      }
    }

    /* check reverse diagonal */
    if (row + colum == BOARD_SIZE - 1) {
      for (let i = 0; i < BOARD_SIZE; i++) {
        if (gameBoard[i][BOARD_SIZE - 1 - i] != player) {
          break;
        }
        if (i == BOARD_SIZE - 1) {
          winner.current = player;
          return STATUS.THERE_IS_WINNER;
        }
      }
    }

    /* check draw */
    if (turns.current == BOARD_SIZE * BOARD_SIZE) {
      return STATUS.TIE;
    }

    return STATUS.RUNNING;
  }

  return (
    <>
      {gameStatus == STATUS.RUNNING ? (
        <div>{isXTurn.current ? PLAYER.X : PLAYER.O} תור</div>
      ) : (
        <div dir="rtl">
          {gameStatus == STATUS.THERE_IS_WINNER
            ? STATUS.THERE_IS_WINNER + winner.current
            : STATUS.TIE}
        </div>
      )}

      <div
        id="game-board"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
        }}
      >
        {gameBoard.map((row, i) =>
          row.map((colum, j) => (
            <button
              onClick={() => handlePlayerClick(i, j)}
              disabled={gameBoard[i][j] != ""}
            >
              {colum}
            </button>
          ))
        )}
      </div>
    </>
  );
}
