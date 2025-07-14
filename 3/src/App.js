import React, { useState, useCallback } from "react";
import Board from "./Board";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGameOver = useCallback(() => {
    setIsGameOver(true);
  }, []);

  const handleScoreChange = useCallback((newScore) => {
    setScore(newScore);
  }, []);

  const handleRestart = () => {
    setScore(0);
    setIsGameOver(false);
  };

  return (
    <div className="App">
      <h1>React Tetris</h1>
      <div className="score-box">
        점수: <span className="score">{score}</span>
      </div>
      <div style={{ position: "relative", margin: "0 auto" }}>
        <Board
          onGameOver={handleGameOver}
          onScoreChange={handleScoreChange}
          isGameOver={isGameOver}
          setIsGameOver={setIsGameOver}
          key={isGameOver ? "gameover" : "playing"}
        />
        {isGameOver && (
          <div className="gameover-overlay">
            <div className="gameover-box">
              <div className="gameover-title">게임 오버</div>
              <div className="gameover-score">최종 점수: {score}</div>
              <button className="restart-btn" onClick={handleRestart}>
                다시 시작
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="desc">
        <p>방향키로 블록을 조작하세요.<br />한 줄이 완성되면 사라집니다.</p>
      </div>
    </div>
  );
}

export default App;