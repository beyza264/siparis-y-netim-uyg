import "./App.css";
import CreateOrder from "../pages/CreateOrder";
import Dashboard from "../pages/Dashboard";
import OrderDetail from "../pages/OrderDetail";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useState } from "react";
function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Router>
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        style={{
          transition: "margin-left 0.3s ease",
          marginLeft: isOpen ? "280px" : "0px",
          padding: "80px 20px 20px 20px",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/create-order" element={<CreateOrder />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
