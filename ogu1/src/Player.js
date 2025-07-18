import React from "react";
import "./Player.css";

function Player({ x, y, width, height }) {
  return (
    <div
      className="player"
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

export default Player;