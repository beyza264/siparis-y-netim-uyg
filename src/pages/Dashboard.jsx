import { useState, useEffect } from "react"
import api from "../services/api";
export default function Dashboard() {
  const[orders, setOrders] = useState([]);
 useEffect(() => {
  api.get("/orders")
  .then((response) => {setOrders(response?.data);})
  .catch((err) => {console.log("Siparişler alınırken hata:", err); alert("Siparişler alınırken hata oluştu. Lütfen tekrar deneyiniz.");});
 }, []);

  const totalOrders = orders?.length||0;
  const pendingOrders = orders.filter((order) => order?.status === "Pending")?.length||0;
  const shippedOrders = orders.filter((order) => order?.status === "Shipped")?.length||0;
  const deliveredOrders = orders.filter((order) => order?.status === "Delivered")?.length||0;
  const preparingOrders = orders.filter((order) => order?.status === "Preparing")?.length||0;
  return (
      <div style={{padding: "30px",maxWidth:"1200px", margin:"0 auto"}} >
        <h1 style={{color:"#333", marginBottom:"30px", fontSize:"25px"}} >Dashboard</h1>
      

    <div style={{display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px"}} >
      <div style={{...cardStyle, background:"#b66dff"}}  >
        <h3 style={titleStyle} >Toplam Sipariş</h3>
        <p style={{margin:"0", fontSize:"36px", fontWeight:"bold"}}  >{totalOrders}</p>
      </div>

       <div style={{...cardStyle, background:"#fe7c70"}} >
         <h3 style={titleStyle} >Pending (Beklemede)</h3>
         <p style={{margin:"0", fontSize:"36px", fontWeight:"bold"}}  >{pendingOrders}</p>
       </div>
    
       <div style={{...cardStyle, background:"#047edf"}} > 
          <h3 style={titleStyle} >Preparing (Hazırlanıyor)</h3>
          <p style={{margin:"0", fontSize:"36px", fontWeight:"bold"}}  >{preparingOrders}</p>
       </div>
        <div style={{...cardStyle, background:"#07cdae"}} >
          <h3 style={titleStyle} >Shipped (Kargoda)</h3>
          <p style={{margin:"0", fontSize:"36px", fontWeight:"bold"}}  >{shippedOrders}</p>
       </div>
        <div style={{...cardStyle, background:"#117"}} >
          <h3 style={titleStyle} >Delivered (Teslim Edildi)</h3>
          <p style={{margin:"0", fontSize:"36px", fontWeight:"bold"}}  >{deliveredOrders}</p>
       </div>

    </div>
    </div>
  )
}

const cardStyle = {
  padding: "20px",
  borderRadius: "8px",
  color:"white",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  backgroundColor: "#4CAF50",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",

};

const titleStyle = {
  margin: "0",
  fontSize: "18px",
  fontWeight: "500",
};  