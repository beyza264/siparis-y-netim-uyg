import "./App.css";
import CreateOrder from "../pages/CreateOrder";
import Dashboard from "../pages/Dashboard";
import OrderDetail from "../pages/OrderDetail";
import Orders from "../pages/Orders";
import Products from "../pages/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/layout/navbar";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/create-order" element={<CreateOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
