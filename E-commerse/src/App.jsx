import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Toast from "./components/Toast";
import Footer from "./components/Footer";

import { CartProvider } from "./context/CartContext";// ✅ ADD THIS

function App() {

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const showToast = (msg, type = "success") => {
    setToast({ show: true, message: msg, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };
  return (
    <CartProvider showToast={showToast}>   {/* ✅ HERE */}

      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />

        <Toast
          show={toast.show}
          message={toast.message}
          type={toast.type}
        />

      </BrowserRouter>

    </CartProvider>
  );
}

export default App;