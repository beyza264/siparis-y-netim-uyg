import { useState, useEffect} from "react"
import api from "../services/api";

export default  function Products() {
const [products, setProducts] = useState([]);
    useEffect(() => {
        api.get("/products")
        .then((response) => {setProducts(response.data);})
        .catch((err) => {console.log("Ürünler alınırken hata:", err);});    
    }, []);

    return ( 
    <div>
        <h1>Ürünler</h1>
          <div>
    {products.map((product) => (
        <div key={product.id} style={{border:"1px solid #ccc", padding:"15px", marginBottom:"10px", borderRadius:"5px"}}>
            <span>{product.name}</span>
            
             <span style={{display:"block", marginTop:"5px", color:"#555"}}>{product.category}</span>    
    <span style={{float:"right", fontWeight:"bold"}}>{product.price}TL</span>
    <span> {product.stock} Adet {product.stock < 10 ? <span style={{color:"red"}}>düşük stok</span> : <span style={{color:"green"}}>stokta</span>}</span>
        </div>
    ))}
</div>
    </div>
  )     
    
} 