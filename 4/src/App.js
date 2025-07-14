import React, { useState } from "react";
import Board from "./Board";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const handleScore = (lines) => {
    // 간단한 점수 계산: 한 줄당 100점
    setScore((prev) => prev + lines * 100);
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className="App">
      <h1>React Tetris</h1>
      <div className="score">점수: {score}</div>
      {gameOver ? (
        <div className="game-over">
          <div>게임 오버!</div>
          <button onClick={handleRestart}>다시 시작</button>
        </div>
      ) : (
        <Board
          onScore={handleScore}
          onGameOver={handleGameOver}
          gameOver={gameOver}
          key={gameOver ? "reset" : "play"}
        />
      )}
    </div>
  );
}

export default App;