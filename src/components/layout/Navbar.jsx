import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <nav style={{display:"flex", gap:"20px", padding:"18px",background:'#f4f4f4'}} >
        <Link to="/">Dashboard</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/products">Products</Link>
        <Link to="/create-order">Create Order</Link>
        </nav>
    );
}