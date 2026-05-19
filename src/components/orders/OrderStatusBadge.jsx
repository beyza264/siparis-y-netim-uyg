export default function OrderStatusBadge({ status }) {
  let bgcolor = "";
  let textcolor = "";
  let label = "";

  if (status === "Pending") {
    bgcolor = "#fffbeb";
    textcolor = "#d97706";
    label = "Beklemede";
  } else if (status === "Preparing") {
    bgcolor = "#eff6ff";
    textcolor = "#2563eb";
    label = "Hazırlanıyor";
  } else if (status === "Shipped") {
    bgcolor = "#faf5ff";
    textcolor = "#9333ea";
    label = "Kargolandı";
  } else if (status === "Delivered") {
    bgcolor = "#f0fdf4";
    textcolor = "#16a34a";
    label = "Teslim Edildi";
  } else {
    bgcolor = "#f1f5f9";
    textcolor = "#64748b";
    label = "Bilinmeyen Durum";
  }
  const badgeStyle = {
    backgroundColor: bgcolor,
    color: textcolor,
    padding: "6px 12px",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "12px",
    display: "inline-block",
    border: `1px dashed ${textcolor}`,
  };
  return <span style={badgeStyle}>{label}</span>;
}
