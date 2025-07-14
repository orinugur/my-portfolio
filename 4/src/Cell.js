import React from "react";
import "./Cell.css";

function Cell({ value }) {
  let className = "Cell";
  let style = {};
  if (value) {
    className += value.ghost ? " ghost" : " filled";
    style.background = value.ghost ? "rgba(200,200,200,0.2)" : value.color;
    style.borderColor = value.ghost ? "#bbb" : value.color;
  }
  return <div className={className} style={style}></div>;
}

export default Cell;