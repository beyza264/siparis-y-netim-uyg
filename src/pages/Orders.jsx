import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import OrderStatusBadge from "../components/orders/OrderStatusBadge";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  useEffect(() => {
    api
      .get("/orders")
      .then((response) => {
        setOrders(  response?.data || []);
        setLoading(false);
      })
      .catch((error) => { 
        setError(error);
        setLoading(false);
        alert("Siparişler alınırken hata oluştu. Lütfen tekrar deneyiniz.");
      });
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error.message}</p>;

  const filteredOrders = orders.filter((order) => {
    const matchesName = (order?.customerName||"")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      statusFilter === "" ||
      order?.status === statusFilter;
    return matchesName && matchesStatus;
  });
   
  const sortedOrders = [...filteredOrders].sort((a, b) => { return new Date(b?.date) - new Date(a?.date) });
  return (
    <>
      <div className="orders-page">
        <div className="orders-header" >
            <div>
              <h2 style={{margin:"0 0 5px 0 ",color:"#1e293b", fontSize:"24px"}} >Siparişler</h2>
              <p style={{margin:"0", color:"#64748b", fontSize:"14px"}} >Tüm siparişleri görüntüleyin ve yönetin</p>
            </div>
        </div>

        <div className="filters-section" >
        <div className="search-box" >

          <input
          type="text"
          placeholder="Müşteri Adı ile Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
    
        
        
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

      <table className="table" >
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
          {sortedOrders.map((order) => (
            <tr key={order?.id}>
              <td>{order?.id}</td>
              <td>{order?.customerName}</td>
              <td>{order?.date}</td>
              <td>
                <OrderStatusBadge status={order?.status} />
              </td>
              <td>{order?.totalAmount} TL</td>
              <td>
                <Link to={`/orders/${order?.id}`}>
                  <button className="btn-outline-blue" >Detay</button>
                </Link>
                <button className="btn-outline-red" onClick={() => {
                  setSelectedOrder(order?.id);
                  setIsOpenModel(true);
                }}>  
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpenModel && (
        <div style={{
          position: "fixed",  
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}> 
            <div style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "5px",
             
            }}>
            <p>silmek istediğinize emin misiniz?</p>
           <div>

            <button onClick={() => {
              api.delete(`/orders/${selectedOrder}`)
              .then(() => {
               setIsOpenModel(false);

               setOrders(prevOrders => prevOrders.filter(order => order?.id !== selectedOrder));
                alert("Sipariş başarıyla silindi.");
              })
              .catch((err) => {
                console.log("Sipariş silinirken hata:", err);
                alert("Sipariş silinirken hata oluştu. Lütfen tekrar deneyiniz.");
              }); 
            }}  className="btn-danger" >
              Evet
            </button>

            <button onClick={() => setIsOpenModel(false)} className="btn-secondary" >
              Hayır
            </button>
           </div>
            </div>
        </div>
      )}
      </div>

    </>
  );
}
