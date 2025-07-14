import React from "react";

const COLORS = [
  "#222",    // 0: 빈칸
  "#00f0f0", // 1: I
  "#0000f0", // 2: J
  "#f0a000", // 3: L
  "#f0f000", // 4: O
  "#00f000", // 5: S
  "#a000f0", // 6: T
  "#f00000"  // 7: Z
];

function Cell({ value }) {
  return (
    <div
      className="cell"
      style={{
        background: COLORS[value] || COLORS[0],
        border: value ? "1px solid #888" : "1px solid #333"
      }}
    />
  );
}

export default Cell;