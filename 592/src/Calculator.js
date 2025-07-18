import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "=") {
      try {
        // eslint-disable-next-line no-eval
        const evalResult = eval(input);
        setResult(evalResult);
      } catch {
        setResult("오류");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "C", "+",
    "="
  ];

  return (
    <div className="calculator">
      <div className="display">
        <input
          type="text"
          value={input}
          readOnly
          className="input"
          aria-label="입력"
        />
        <div className="result" aria-label="결과">
          {result !== "" ? "= " + result : ""}
        </div>
      </div>
      <div className="buttons">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            className={btn === "=" ? "equal" : btn === "C" ? "clear" : ""}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;