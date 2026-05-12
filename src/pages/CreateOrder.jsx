import { useState, useEffect } from "react";
import api from "../services/api";
export default function CreateOrder() {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [orderItems, setOrderItems] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    api.get("/products")
      .then((response) => {
        setProductList(response?.data||[]);
      })
      .catch((error) =>{
        console.error("Ürünler yüklenirken hata oluştu:", error),
      alert("Ürünler yüklenirken hata oluştu. Lütfen tekrar deneyiniz.");
   } );
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();  
    if (!selectedProduct) {
      alert("Lütfen ürün seçiniz");
      return;
    }
    if (quantity < 1) {
      alert("Lütfen geçerli bir miktar giriniz");
      return;
    }
    const productDetail = productList.find(
      (p) => String(p?.id) === String(selectedProduct)
    );

    if (!productDetail) {
      console.error("Seçilen ürün bulunamadı:", selectedProduct);
      alert("Seçilen ürün bulunamadı");
      return;
    }
    const newItem = {
      id: Date.now(),
      name: productDetail.name,
      price: productDetail.price,
      quantity: parseInt(quantity),
      totalPrice: productDetail.price * parseInt(quantity),
    };
    setOrderItems([...orderItems, newItem]);
    setSelectedProduct("");
    setQuantity(1);
  };
  const grandTotal = orderItems.reduce(
    (total, item) => total + item.totalPrice,
    0,
  );
 
const handleCompleteOrder = () => {
  if (!customerName || !email || !address) {
    alert("Lütfen müşteri bilgilerini eksiksiz doldurunuz");
    return;
  }
  if (orderItems.length === 0) {
    alert("Lütfen en az bir ürün ekleyiniz");
    return;
  }
  alert("Sipariş başarıyla oluşturuldu!");
}
  return (
    <div
      style={{
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0px 15px rgba(0,0,0,0.05)",
        maxWidth: "600px",
        margin: "20px auto",
      }}
    >
      <h1
        style={{
          color: "#b66dff",
          fontWeight: "600",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        Yeni Sipariş Oluştur
      </h1>
      <div>
        <h4 style={{ color: "#555", fontWeight: "500", fontSize: "16px" }}>
          Müşteri Bilgileri
        </h4>
        <input
          type="text"
          placeholder="Müşteri Adı"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Adres"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          style={inputStyle}
        >
          <option value="">Ürün Seçiniz</option>
          {productList?.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - ${product.price}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{
            padding: "12px 15px",
            marginBottom: "15px",
            border: "1px solid #e2e2e2",
            borderRadius: "5px",
            fontSize: "14px",
            outline: "none",
            margin: "10px",
          }}
        />

        <button
          onClick={handleAddProduct}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#b66dff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Ürün Ekle
        </button>
      </div>

      <div>
        <h3>Sipariş Özeti</h3>
        {orderItems?.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              borderBottom: "1px dashed #ccc",
              padding: "10px 0",
            }}
          >
            <span style={{ color: "#555" }}>
              {item.name} (x{item.quantity})
            </span>
            <span style={{ color: "#b66dff", fontWeight: "bold" }}>
              {item.totalPrice}TL
            </span>
          </div>
        ))}
        <h4>Genel Toplam: {grandTotal}TL</h4>
        <button onClick={handleCompleteOrder} style={buttonStyle}>
          Siparişi Tamamla
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 15px",
  marginBottom: "15px",
  border: "1px solid #e2e2e2",
  borderRadius: "5px",
  fontSize: "14px",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#b66dff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
