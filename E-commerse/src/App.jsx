import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

function App() {

  const [search, setSearch] = useState("");

  const products = [
    // your products array
  ];

  return (
    <BrowserRouter>
      <Navbar />

      <SearchBar
        value={search}
        onChange={setSearch}
        products={products}
      />

      <Routes>
        <Route path="/" element={<Home search={search} />} />
        <Route path="/cart" element={<Cart search={search} />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;