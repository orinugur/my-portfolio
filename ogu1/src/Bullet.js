import React from "react";
import "./Bullet.css";

function Bullet({ x, y, width, height }) {
  return (
    <div
      className="bullet"
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

export default Bullet;