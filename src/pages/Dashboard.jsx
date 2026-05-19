import { useState, useEffect } from "react";
import api from "../services/api";
import {
  FiPackage,
  FiClock,
  FiSettings,
  FiTruck,
  FiCheckCircle,
} from "react-icons/fi";
export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    api
      .get("/orders")
      .then((response) => {
        setOrders(response?.data);
      })
      .catch((err) => {
        console.log("Siparişler alınırken hata:", err);
        alert("Siparişler alınırken hata oluştu. Lütfen tekrar deneyiniz.");
      });
  }, []);

  const totalOrders = orders?.length || 0;
  const pendingOrders =
    orders.filter((order) => order?.status === "Pending")?.length || 0;
  const shippedOrders =
    orders.filter((order) => order?.status === "Shipped")?.length || 0;
  const deliveredOrders =
    orders.filter((order) => order?.status === "Delivered")?.length || 0;
  const preparingOrders =
    orders.filter((order) => order?.status === "Preparing")?.length || 0;
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Sipariş ve ürün durumlarını anlık olarak görüntüleyin.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon-wrapper bg-blue">
            <FiPackage />
          </div>
          <h3 className="stat-title">Toplam Sipariş</h3>
          <p className="stat-value">{totalOrders}</p>
        </div>

        <div className="stat-card">
          <div className="icon-wrapper bg-orange">
            <FiClock />
          </div>
          <h3 className="stat-title">Beklemede</h3>
          <p className="stat-value">{pendingOrders}</p>
        </div>

        <div className="stat-card">
          <div className="icon-wrapper bg-blue">
            <FiSettings />
          </div>
          <h3 className="stat-title">Hazırlanıyor</h3>
          <p className="stat-value">{preparingOrders}</p>
        </div>
        <div className="stat-card">
          <div className="icon-wrapper bg-purple">
            <FiTruck />
          </div>
          <h3 className="stat-title">Kargoda</h3>
          <p className="stat-value">{shippedOrders}</p>
        </div>
        <div className="stat-card">
          <div className="icon-wrapper bg-green">
            <FiCheckCircle />
          </div>
          <h3 className="stat-title">Teslim Edildi</h3>
          <p className="stat-value">{deliveredOrders}</p>
        </div>
      </div>
    </div>
  );
}
