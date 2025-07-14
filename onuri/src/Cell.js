import React from "react";
import "./Cell.css";

// value: 0(빈칸), 1(블럭), 2(고정된 블럭) 등
function Cell({ value }) {
  return (
    <div className={`Cell${value ? " filled" : ""}`}></div>
  );
}

export default Cell;