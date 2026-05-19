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
    api
      .get("/products")
      .then((response) => {
        setProductList(response?.data || []);
      })
      .catch((error) => {
        console.error("Ürünler yüklenirken hata oluştu:", error);
        alert("Ürünler yüklenirken hata oluştu. Lütfen tekrar deneyiniz.");
      });
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
      (p) => String(p?.id) === String(selectedProduct),
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
  const handleRemoveProduct = (idToRemove) => {
    setOrderItems(orderItems.filter((item) => item.id !== idToRemove));
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
  };
  return (
    <div className="orders-page">
      <div className="orders-header">
        <div>
          <h1
            style={{ margin: "0 0 5px 0", color: "#1e293b", fontSize: "24px" }}
          >
            Yeni Sipariş Oluştur
          </h1>
          <p style={{ margin: "0", color: "#64748b", fontSize: "16px" }}>
            Yeni Sipariş Oluşturunuz.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr",
          gap: "24px",
          alignItems: "start",
        }}
      >
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Müşteri Bilgileri</h3>

          <div style={formRowStyle}>
            <label style={labelStyle}> Ad Soyad</label>
            <input
              type="text"
              placeholder="Müşteri Adı"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>E-posta</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={formRowStyle}>
            <label style={labelStyle}>Adres</label>
            <textarea
              placeholder="Adres"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
            />
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Sipariş Ürünleri</h3>

          <div
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "25px",
              alignItems: "flex-end",
            }}
          >
            <div style={{ flex: "2" }}>
              <label
                style={{
                  ...labelStyle,
                  display: "block",
                  marginBottom: "8px",
                  marginTop: "0",
                }}
              >
                Ürün
              </label>
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
            </div>

            <div style={{ flex: 1 }}>
              <label
                style={{
                  ...labelStyle,
                  display: "block",
                  marginBottom: "8px",
                  marginTop: "0",
                }}
              >
                Adet
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={inputStyle}
              />
            </div>
            <button
              className="btn-primary"
              onClick={handleAddProduct}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginLeft: "27px",
                marginBottom: "4px",
              }}
            >
              Ürün Ekle
            </button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Ürün</th>
                <th>Adet</th>
                <th>Fiyat</th>
                <th>Toplam</th>
                <th>işlem</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: "500" }}>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price} TL</td>
                  <td>{item.totalPrice} TL</td>
                  <td>
                    <button
                      onClick={() => handleRemoveProduct(item.id)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            <span>Genel Toplam:</span>
            <span>{grandTotal} TL</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "24px",
            }}
          >
            <button className="btn-secondary">iptal</button>
            <button className="btn-primary" onClick={handleCompleteOrder}>
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #e2e8f0",
};

const cardTitleStyle = {
  color: "#1e293b",
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
};

const formRowStyle = {
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "15px",
  gap: "12px",
};

const labelStyle = {
  width: "100px",
  fontSize: "14px",
  fontWeight: "500",
  color: "#475569",
  marginTop: "12px",
};

const inputStyle = {
  flex: 1,
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  fontSize: "14px",
  outline: "none",
  color: "#1e293b",
  backgroundColor: "#f8fafc",
  transition: "border-color 0.2s",
};
