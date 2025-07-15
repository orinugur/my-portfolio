import React, { useState } from "react";
import CryptoChart from "./components/CryptoChart";
import CryptoSummary from "./components/CryptoSummary";
import "./App.css";

const COINS = [
  { id: "bitcoin", symbol: "BTC", name: "비트코인" },
  { id: "ethereum", symbol: "ETH", name: "이더리움" }
];

function App() {
  const [selectedCoin, setSelectedCoin] = useState(COINS[0].id);

  return (
    <div className="App">
      <header>
        <h1>Crypto Trading Dashboard</h1>
      </header>
      <main>
        <div className="coin-select-bar">
          {COINS.map((coin) => (
            <button
              key={coin.id}
              className={`coin-btn${selectedCoin === coin.id ? " active" : ""}`}
              onClick={() => setSelectedCoin(coin.id)}
            >
              {coin.name} ({coin.symbol})
            </button>
          ))}
        </div>
        <CryptoSummary coinId={selectedCoin} />
        <CryptoChart coinId={selectedCoin} />
      </main>
      <footer>
        <p>© 2025 Crypto Dashboard</p>
      </footer>
    </div>
  );
}

export default App;