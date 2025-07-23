import React from "react";
import "../styles/Enemy.css";

function Enemy() {
  return (
    <div className="cell enemy">
      <span role="img" aria-label="enemy">
        🤖
      </span>
    </div>
  );
}

export default Enemy;