import { Link } from "react-router-dom";
export default function Navbar({isOpen, setIsOpen}) {
  
    const sidebarStyle={
        width: isOpen? "280px": "0px",
        height:"100vh",
        position:"fixed",
        top:0,
        left:0,
        background:"#fff",  
        display:"flex",
        flexDirection:"column", 
        gap:"20px",
        padding: isOpen? "20px": "0px",
        overflow:"hidden",
        transition:"width 0.3s ease",
        boxShadow: isOpen? "2px 0 5px rgba(0,0,0,0.1)": "none",
        zIndex:1001,
    }
    return (
        <>
          <button onClick={()=>setIsOpen(!isOpen)} style={{position:"fixed", top:"20px", left:"20px",zIndex:1002, cursor:"pointer", background:"#b66dff", border:"none",padding:"10px 15px", fontSize:"20px"}}>
                {isOpen? "X": "☰"}
            </button>
              <nav style={sidebarStyle} >
          
            {isOpen &&  <h2 style={{margin:"0", padding:"10px", marginTop:"50px"}}>Sipariş Paneli</h2>}
            <div style={{display:"flex", flexDirection:"column", gap:"10px", marginTop:"20px", transition:"opacity 0.3s ease", opacity:isOpen? 1:0}}>
        <Link to="/" style={linkStyle} >Dashboard</Link>
        <Link to="/orders" style={linkStyle} >Orders</Link>
        <Link to="/products" style={linkStyle} >Products</Link>
        <Link to="/create-order" style={linkStyle} >Create Order</Link>
        </div>
        </nav>
        </>
      
    );
}
const linkStyle={
    textDecoration:"none",
    color:"#333",   
    fontSize:"18px",
    fontWeight:"bold",
    padding:"10px",
    whiteSpace:"nowrap"

}