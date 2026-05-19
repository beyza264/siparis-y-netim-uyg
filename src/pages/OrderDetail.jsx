import { useState, useEffect } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
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
    <div className="orders-page" >
      <div className="orders-header" >
        <div>
          <h2 style={{margin:"0 0 5px 0 ",color:"#1e293b", fontSize:"24px"}} >Sipariş Detayı</h2>
          <p style={{margin:"0", color:"#64748b", fontSize:"14px", marginBottom:"10px"}} >Sipariş detaylarını görüntüleyin ve yönetin</p>
        </div>
      <Link to="/orders"  style={{ padding:"8px 15px", borderRadius:"4px", fontSize:"14px", textDecoration:"none", marginTop:"20px", color:"#3b82f6", border:"1px solid #bfdbfe"}} >
        Siparişlere Geri Dön
      </Link>
</div> 
 <div style={{display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:"24px, alignItems: 'start'"}} >
   <div style={{display:"flex", flexDirection:"column", gap:"24px"}} >
       <section style={cardStyle} >
        <h3  style={cardTitleStyle}>Müşteri Bilgileri</h3>
         <div style={infoRowStyle} >
          <span style={labelStyle} >Ad Soyad</span>
            <span style={valueStyle} >{order.customerName}</span>
         </div>
          <div style={infoRowStyle} >
            <span style={labelStyle} >E-posta</span>
            <span style={{...valueStyle, color:"#2563eb"}} >{order.email}</span>
          </div>
          <div style={{...infoRowStyle, borderBottom:"none",paddingBottom:"0",alignItems:"flex-start"}} >  
            <span style={labelStyle} >Adres</span>
            <span style={{...valueStyle, lineHeight:"1.5"}} >{order.address}</span>
          </div>
             </section>

             <section style={cardStyle} >
        <h3 style={cardTitleStyle} >Sipariş Bilgileri</h3>
          <div style={infoRowStyle} >
            <span style={labelStyle} >Sipariş No</span>
            <span style={valueStyle} >{order.id}</span>
          </div>
          <div style={infoRowStyle} >
            <span style={labelStyle} >Tarih</span>
            <span style={valueStyle} >{new Date(order.date).toLocaleDateString()}</span>
          </div>
          <div style={infoRowStyle} >
            <span style={labelStyle} >Güncel Durum</span>
            <div style={valueStyle} >
              <OrderStatusBadge status={order.status} />
            </div>
          </div>

          <div style={{marginTop:"20px"}} >
            <select value={newStatus} onChange={(e)=>setNewStatus(e.target.value)  }
            style={inputStyle} >
              <option value="Pending">Beklemede</option>
              <option value="Preparing">Hazırlanıyor</option>
              <option value="Shipped">Kargoda</option>
              <option value="Delivered">Teslim Edildi</option>
            </select>
            <button onClick={handleUpdateStatus} style={{marginLeft:"10px", padding:"8px 15px", cursor:"pointer", backgroundColor:"#ffff", color:"#4CAF50", border:"1px solid #c5e2c7", borderRadius:"4px", marginTop:"10px"}} >
              Durumu Güncelle
            </button>
          </div>
             </section>
   </div>
      
      <div style={{display:"flex", flexDirection:"column", gap:"24px"}} >
    
      <section style={cardStyle} > 
        <h3 style={cardTitleStyle} >Sipariş Ürünleri</h3>
        <table className="table" >
          <thead>
            <tr>
              <th>Ürün Adı</th>
              <th>Adet</th>
              <th>Fiyat</th>
              <th>Toplam</th>
            </tr>
          </thead>
          <tbody>
            {order?.products?.map((product)=>(
           <tr  key={product?.id}>
              <td style={{fontWeight:"500", display:"flex", alignItems:"center", gap:"10px"}} >{product?.name}</td>
                <td>{product?.quantity}</td>
                <td>{product?.price}</td>
                <td>{(product?.quantity * product?.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </section>

      <section style={cardStyle} >
     <h3>Sipariş Özeti</h3>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px", padding:"20px", borderTop:"1px solid #f1f5f9"}} >
        <span style={{fontSize:"18px", fontWeight:"600", color:"#1e293b"}} >Toplam Tutar</span>
        <span style={{fontSize:"20px", fontWeight:"bold", color:"#1e293b"}} >{order?.totalAmount}</span>
        </div>
      </section>
      </div>  
       
      
        </div>
  </div>
  );
}
const cardStyle = {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius:"12px",
    border: "1px solid #e2e8f0"
}
const cardTitleStyle = {
    marginBottom:"15px",
    color:"#1e293b",
    fontSize:"20px",
    fontWeight:"600",
    display:"flex",
    alignItems:"center",
}

const infoRowStyle = {
    display:"flex",
    alignItems:"center",
    borderBottom:"1px solid #f1f5f9",
    paddingBottom:"12px",
    gap:"10px",
    marginBottom:"12px",
}

const labelStyle = {
    color:"#64748b",
    fontSize:"14px",
     width:"120px",
    fontWeight:"500",} 

const valueStyle = {
  flex:1,
  color:"#1e293b",
  fontSize:"16px",
  fontWeight:"500",
}
const inputStyle = {
  width:"100%",
  padding:"10px 15px",
  border:"1px solid #e2e8f0",
  borderRadius:"6px",
  fontSize:"14px",  
  Outline:"none",
  color:"#1e293b",
  backgroundColor:"#f8fafc",
  Transition:"border-color 0.3s"
};