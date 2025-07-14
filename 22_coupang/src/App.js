import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryNav from './components/CategoryNav';
import Banner from './components/Banner';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <CategoryNav />
      <Banner />
      <ProductList />
      <Footer />
    </div>
  );
}

export default App;