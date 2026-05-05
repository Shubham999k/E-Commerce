import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Toast from "./components/Toast";
import Footer from "./components/Footer";

function App() {

  const [toast, setToast] = useState({
    show: false,
    message: ""
  });

  const showToast = (msg) => {
    setToast({ show: true, message: msg });

    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home showToast={showToast} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      <Footer />

      {/* TOAST MUST Be HERE */}
      <Toast show={toast.show} message={toast.message} />

    </BrowserRouter>
  );
}

export default App;