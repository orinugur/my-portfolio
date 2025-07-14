import React from "react";
import {
  MARIO,
  GROUND,
  OBSTACLE,
  ENEMY,
  GOAL,
  BULLET,
  MUSHROOM
} from "./utils";
import "./Cell.css";

// bullet: {x, y, dir} | undefined, marioPos: [x, y], poweredUp: boolean
function Cell({ type, bullet, marioPos, poweredUp }) {
  let content = null;
  let className = "cell";
  let bulletElem = null;

  switch (type) {
    case MARIO:
      content = (
        <span
          role="img"
          aria-label="mario"
          className={poweredUp ? "mario-powered" : ""}
        >🧑‍🔧</span>
      );
      className += " mario";
      if (poweredUp) className += " powered";
      break;
    case GROUND:
      content = <span role="img" aria-label="ground">🟫</span>;
      className += " ground";
      break;
    case OBSTACLE:
      content = <span role="img" aria-label="obstacle">🟧</span>;
      className += " obstacle";
      break;
    case ENEMY:
      content = <span role="img" aria-label="enemy">👾</span>;
      className += " enemy";
      break;
    case GOAL:
      content = <span role="img" aria-label="goal">🏁</span>;
      className += " goal";
      break;
    case MUSHROOM:
      content = <span role="img" aria-label="mushroom">🍄</span>;
      className += " mushroom";
      break;
    default:
      content = null;
  }

  // 총알이 이 칸에 있으면, 마리오와의 거리로 크기 조절
  if (bullet && marioPos) {
    const dist = Math.abs(bullet.x - marioPos[0]) + Math.abs(bullet.y - marioPos[1]);
    // 가까울수록 크고, 멀수록 작게(최소 1.2rem, 최대 2.2rem)
    const fontSize = `${2.2 - Math.min(dist, 5) * 0.2}rem`;
    bulletElem = (
      <span
        className="bullet"
        role="img"
        aria-label="bullet"
        style={{ fontSize, position: "absolute", zIndex: 2, pointerEvents: "none" }}
      >🔥</span>
    );
  }

  return (
    <div className={className} style={{ position: "relative" }}>
      {content}
      {bulletElem}
    </div>
  );
}

export default Cell;