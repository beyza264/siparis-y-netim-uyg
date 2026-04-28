import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/orders")
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error.message}</p>;

  const filteredOrders = orders.filter((order) => {
    const matchesName = order.customerName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      statusFilter === "" ||
      order.status === statusFilter;
    return matchesName && matchesStatus;
  });

  return (
    <>
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Müşteri Adı ile Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">Tüm Durumlar</option>
          <option value="Pending">Beklemede</option>
          <option value="Preparing">Hazırlanıyor</option>
          <option value="Shipped">Kargolandı</option>
          <option value="Delivered">Teslim Edildi</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Sipariş No</th>
            <th>Müşteri Adı</th>
            <th>Tarih</th>
            <th>Durum</th>
            <th>Tutar</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerName}</td>
              <td>{order.date}</td>
              <td>
                <OrderStatusBadge status={order.status} />
              </td>
              <td>{order.totalAmount} TL</td>
              <td>
                <Link to={`/orders/${order.id}`}>
                  <button>Detay</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
