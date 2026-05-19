import { useState, useEffect } from "react";
import api from "../services/api";

function ProductStatusBadge({ stock }) {
  let bgcolor = "";
  let textcolor = "";
  let label = "";
  let bordercolor = "";
  if (stock === 0) {
    bgcolor = "#fef2f2";
    textcolor = "#ef4444";
    bordercolor = "#fca5a5";
    label = "Tükendi";
  } else if (stock < 10) {
    bgcolor = "#fffbeb";
    textcolor = "#d97706";
    bordercolor = "#fde68a";
    label = "Az Stok";
  } else {
    bgcolor = "#f0fdf4";
    textcolor = "#16a34a";
    bordercolor = "#bbf7d0";
    label = "Stokta Var";
  }
  const badgeStyle = {
    backgroundColor: bgcolor,
    color: textcolor,
    padding: "5px 12px",
    borderRadius: "6px",
    border: `1px solid ${bordercolor}`,
    fontWeight: "600",
    fontSize: "12px",
    display: "inline-block",
    textAlign: "center",
    minWidth: "70px",
  };
  return <span style={badgeStyle}>{label}</span>;
}
export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response?.data || []);
      })
      .catch((err) => {
        console.log("Ürünler alınırken hata:", err);
        alert("Ürünler yüklenirken hata oluştu. Lütfen tekrar deneyiniz.");
      });
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2 style={{ margin: "0 0 5px 0", color: "#1e293b", fontSize: "24px" }}>
          {" "}
          Ürünler
        </h2>
        <p style={{ margin: "0", color: "#64748b", fontSize: "16px" }}>
          Tüm ürünleri görüntüleyin ve yönetin
        </p>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Kategori</th>
            <th>Fiyat</th>
            <th>Stok</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product?.id}>
              <td>{product?.name}</td>
              <td>{product?.category}</td>
              <td>{product?.price}TL</td>
              <td>{product?.stock}</td>
              <td>
                <ProductStatusBadge stock={product?.stock} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div></div>
    </div>
  );
}
