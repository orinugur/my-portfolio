import React from "react";
import "./Enemy.css";

function Enemy({ x, y, width, height }) {
  return (
    <div
      className="enemy"
      style={{
        left: x,
        top: y,
        width,
        height,
        position: "absolute"
      }}
    />
  );
}

export default Enemy;