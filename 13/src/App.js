import React from "react";
import "./styles/App.css";
import GameCanvas from "./components/GameCanvas";

function App() {
  return (
    <div className="app-container">
      <h1>Counter Strike FPS (React)</h1>
      <div className="game-root">
        <GameCanvas />
      </div>
    </div>
  );
}

export default App;