import React, { useEffect, useState } from "react";
import { fetchBitcoinMarketChart } from "../utils/api";
import "../styles/Chart.css";

function Chart() {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBitcoinMarketChart()
      .then((data) => setChartData(data))
      .catch((err) => setError("데이터를 불러올 수 없습니다."));
  }, []);

  return (
    <div className="chart-container">
      <h2>비트코인 가격(최근 7일)</h2>
      {error && <div className="error">{error}</div>}
      <svg width="100%" height="300">
        {/* 차트 데이터가 있을 때만 선 그리기 */}
        {chartData.length > 1 && (
          <polyline
            fill="none"
            stroke="#f7931a"
            strokeWidth="2"
            points={
              chartData
                .map(
                  (d, i) =>
                    `${(i * 600) / (chartData.length - 1)},${300 -
                      ((d[1] - Math.min(...chartData.map((v) => v[1]))) *
                        250) /
                        (Math.max(...chartData.map((v) => v[1])) -
                          Math.min(...chartData.map((v) => v[1])) || 1)}`
                )
                .join(" ")
            }
          />
        )}
      </svg>
      <div className="chart-labels">
        <span>최저: {chartData.length ? Math.min(...chartData.map((v) => v[1])).toLocaleString() : "-"} USD</span>
        <span>최고: {chartData.length ? Math.max(...chartData.map((v) => v[1])).toLocaleString() : "-"} USD</span>
      </div>
    </div>
  );
}

export default Chart;