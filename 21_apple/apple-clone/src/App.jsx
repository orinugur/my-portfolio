import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/common/Nav";
import Footer from "./components/common/Footer";
import StorePage from "./pages/StorePage";

function App() {
  return (
    <Router>
      <div className="app-root">
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<StorePage />} />
            {/* 추후 NotFound, Home 등 추가 가능 */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
