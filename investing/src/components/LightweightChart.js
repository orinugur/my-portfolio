import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { fetchCandleDataByTicker } from "../utils/api";

function LightweightChart({ ticker }) {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    let chart;
    let candleSeries;
    let resizeObserver;
    let destroyed = false;

    async function drawChart() {
      const data = await fetchCandleDataByTicker(ticker);
      if (destroyed || !chartContainerRef.current) return;

      // 컨테이너가 0px이면 차트가 안 보이므로 최소 크기 보장
      const width = chartContainerRef.current.clientWidth || 350;
      const height = chartContainerRef.current.clientHeight || 400;

      chart = createChart(chartContainerRef.current, {
        width,
        height,
        layout: {
          background: { color: "#fff" },
          textColor: "#222",
        },
        grid: {
          vertLines: { color: "#eee" },
          horzLines: { color: "#eee" },
        },
        timeScale: {
          borderColor: "#ccc",
          timeVisible: true,
          secondsVisible: false,
        },
        rightPriceScale: {
          borderColor: "#ccc",
        },
      });

      candleSeries = chart.addCandlestickSeries({
        upColor: "#d32f2f",
        downColor: "#1976d2",
        borderUpColor: "#d32f2f",
        borderDownColor: "#1976d2",
        wickUpColor: "#d32f2f",
        wickDownColor: "#1976d2",
      });

      candleSeries.setData(
        data.map((item) => ({
          time: item.time,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }))
      );

      chart.timeScale().fitContent();

      // 반응형 리사이즈
      resizeObserver = new ResizeObserver(() => {
        if (chart && chartContainerRef.current) {
          chart.applyOptions({ width: chartContainerRef.current.clientWidth });
        }
      });
      resizeObserver.observe(chartContainerRef.current);
    }

    drawChart();

    return () => {
      destroyed = true;
      if (resizeObserver && chartContainerRef.current) {
        resizeObserver.unobserve(chartContainerRef.current);
      }
      if (chart) {
        chart.remove();
      }
    };
  }, [ticker]);

  return (
    <div className="chart-container">
      <h2>Lightweight Candlestick Chart</h2>
      <div
        ref={chartContainerRef}
        style={{
          width: "100%",
          minWidth: 320,
          height: 400,
          minHeight: 300,
          background: "#fff",
        }}
      />
    </div>
  );
}

export default LightweightChart;