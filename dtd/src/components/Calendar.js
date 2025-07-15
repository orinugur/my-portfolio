import React, { useState } from "react";
import { getMonthMatrix, getMonthName, getToday } from "../utils/date";
import "../App.css";

function Calendar() {
  const today = getToday();
  const [year, setYear] = useState(today.year);
  const [month, setMonth] = useState(today.month);

  const monthMatrix = getMonthMatrix(year, month);

  const handlePrev = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNext = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrev}>&lt;</button>
        <span>{year}년 {getMonthName(month)}</span>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <table className="calendar-table">
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>
          {monthMatrix.map((week, i) => (
            <tr key={i}>
              {week.map((date, j) => (
                <td
                  key={j}
                  className={
                    date === today.date && month === today.month && year === today.year
                      ? "today"
                      : date === 0
                      ? "empty"
                      : ""
                  }
                >
                  {date !== 0 ? date : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;