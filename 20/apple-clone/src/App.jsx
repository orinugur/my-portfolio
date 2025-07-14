import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import HeroSection from "./components/HeroSection";
import ProductPreview from "./components/ProductPreview";
import StorePage from "./components/StorePage";
import Footer from "./components/Footer";
import "./styles/NavigationBar.css";
import "./styles/HeroSection.css";
import "./styles/ProductPreview.css";
import "./styles/StorePage.css";
import "./styles/Footer.css";

function App() {
  return (
    <Router>
      <NavigationBar />
      <main style={{ paddingTop: 56 }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <ProductPreview />
              </>
            }
          />
          <Route path="/store" element={<StorePage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
