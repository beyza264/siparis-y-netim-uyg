import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((response) => {
        setOrder(response?.data || null);
        setNewStatus(response?.data?.status||"");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Hata:", error);
        alert("Sipariş detayları alınırken hata oluştu. Lütfen tekrar deneyiniz.");
        setLoading(false);
      });
  }, [id]);

  const handleUpdateStatus = () => {
    api
      .patch(`/orders/${id}`, { status: newStatus })
      .then((response) => {
        setOrder(response?.data || null);
        alert("Sipariş durumu güncellendi!");
      })
      .catch((err) => {
        console.log("Güncelleme hatası:", err);
        alert("Sipariş durumu güncellenirken hata oluştu. Lütfen tekrar deneyiniz.");
      });
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (!order) return <p>Sipariş bulunamadı!</p>;

  return (
    <div style={containerStyle}>
      <Link to="/orders" style={{ textDecoration: "none", color: "#f4f4f4", fontWeight: "600", display: "inline-block", marginBottom: "20px",border:"1px solid #f4f4f4", padding:"8px 15px", borderRadius:"4px", background:"#b66dff" }}>
       Listeye Geri Dön
      </Link>

      <h2 style={titleStyle}>
        Sipariş Detayı ({order.id})
      </h2>

      <section style={cardStyle}>
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

      <section style={cardStyle}>
        <h3 style={titleStyle} >Sipariş İçeriği</h3>
        <ul>
          {
            order?.products?.map((product) => (
              <li key={product?.id}>
                {product?.name} - {product?.quantity} Adet - ({product?.price} TL)
              </li>
            ))}
        </ul>
        <p>
          <strong>Toplam Tutar:</strong> {order?.totalAmount} TL
        </p>
      </section>

      <section
        style={cardStyle}
      >
        <h4 style={titleStyle}>Sipariş Durumunu Yönet</h4>
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
const containerStyle={
  backgroundColor: "#fff",
  padding: "30px",
  borderRadius: "8px",
  boxShadow: "0 0px 15px rgba(0,0,0,0.05)",
  maxWidth: "800px",
  margin: "40px auto",
}

 const titleStyle={
  color:"#b66dff",
  marginBottom:"20px",
  paddingBottom:"15px",
  borderBottom:"2px solid #f0f0f0",
}
const cardStyle={
  backgroundColor: "#fcfcfc",
  padding: "15px",
  border: "1px solid #eee",
  borderRadius: "8px",
  marginBottom: "20px",
}