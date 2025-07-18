import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductSection from "./components/ProductSection";
import Footer from "./components/Footer";
import StorePage from "./pages/StorePage";
import "./styles/common.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <ProductSection />
            </>
          }
        />
        <Route path="/store" element={<StorePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;