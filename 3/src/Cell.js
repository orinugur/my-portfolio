import React from "react";
import "./Cell.css";

function Cell({ value, color }) {
  return (
    <div
      className="Cell"
      style={{
        background: value ? color : "#222",
        border: value ? "1.5px solid #444" : "1px solid #333",
      }}
    />
  );
}

export default Cell;