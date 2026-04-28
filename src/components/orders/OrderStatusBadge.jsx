export default function OrderStatusBadge({ status }) {
  let bgcolor = "";
  let textcolor = "white";
  let label = "";

  if (status === "Pending") {
    bgcolor = "orange";
    label = "Beklemede";
  } else if (status === "Preparing") {
    bgcolor = "yellow";
    textcolor = "black";
    label = "Hazırlanıyor";
  } else if (status === "Shipped") {
    bgcolor = "blue";
    label = "Kargolandı";
  } else if (status === "Delivered") {
    bgcolor = "green";
    label = "Teslim Edildi";
  } else {
    bgcolor = "gray";
    label = "Bilinmeyen Durum";
  }
  const badgeStyle = {
    backgroundColor: bgcolor,
    color: textcolor,
    padding: "5px 10px",
    borderRadius: "12px",
    fontWeight: "bold",
    display: "inline-block",
  };
  return <span style={badgeStyle}>{label}</span>;
}
