import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/orders/${id}`)
      .then((response) => {
        setOrder(response.data);
        setNewStatus(response.data.status);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hata:", error);
        setLoading(false);
      });
  }, [id]);

  const handleUpdateStatus = () => {
    axios
      .patch(`http://localhost:3001/orders/${id}`, { status: newStatus })
      .then((response) => {
        setOrder(response.data);
        alert("Sipariş durumu güncellendi!");
      })
      .catch((err) => console.log("Güncelleme hatası:", err));
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (!order) return <p>Sipariş bulunamadı!</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/orders" style={{ textDecoration: "none", color: "blue" }}>
       Listeye Geri Dön
      </Link>

      <h2 style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
        Sipariş Detayı ({order.id})
      </h2>

      <section style={{ marginBottom: "20px" }}>
        <h3>Müşteri Bilgileri</h3>
        <p>
          <strong>Ad:</strong> {order.customerName}
        </p>
        <p>
          <strong>E-posta:</strong> {order.email}
        </p>
        <p>
          <strong>Adres:</strong> {order.address}
        </p>
        <p>
          <strong>Tarih:</strong> {new Date(order.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Güncel Durum:</strong>{" "}
          <OrderStatusBadge status={order.status} />
        </p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h3>Sipariş İçeriği</h3>
        <ul>
          {order.products &&
            order.products.map((product) => (
              <li key={product.id}>
                {product.name} - {product.quantity} Adet - ({product.price} TL)
              </li>
            ))}
        </ul>
        <p>
          <strong>Toplam Tutar:</strong> {order.totalAmount} TL
        </p>
      </section>

      <section
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <h4>Sipariş Durumunu Yönet</h4>
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px" }}
        >
          <option value="Pending">Beklemede</option>
          <option value="Preparing">Hazırlanıyor</option>
          <option value="Shipped">Kargoda</option>
          <option value="Delivered">Teslim Edildi</option>
        </select>
        <button
          onClick={handleUpdateStatus}
          style={{
            marginLeft: "10px",
            padding: "8px 15px",
            cursor: "pointer",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Durumu Güncelle
        </button>
      </section>
    </div>
  );
}
