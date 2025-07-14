import React, { useState } from "react";
import Board from "./Board";
import "./App.css";

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="app-container">
      <h1>갤러그 클론</h1>
      <div className="score">점수: {score}</div>
      <Board setScore={setScore} />
      <footer>
        <small>© 2025 갤러그 클론. React로 제작.</small>
      </footer>
    </div>
  );
}

export default App;