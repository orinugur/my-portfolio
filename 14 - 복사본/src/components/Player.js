import React from "react";
import "../styles/Player.css";

function Player({ facing }) {
  return (
    <div className={`cell player ${facing}`}>
      <span role="img" aria-label="player">
        🧑‍🎤
      </span>
    </div>
  );
}

export default Player;