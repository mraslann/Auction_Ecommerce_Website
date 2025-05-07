import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:8080/api/products", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
            localStorage.removeItem("token");
            navigate("/"); // or "/login"
          }
          

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setMessage("❌ Could not load products. Please login again.");
      }
    };

    fetchProducts();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>🛒 Products</h2>
        <button onClick={() => navigate("/products/create")}>➕ Create Product</button>
        {message && <p>{message}</p>}
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <p><strong>${product.price}</strong></p>
              <img src={product.imageUrl} alt={product.name} style={{ width: "200px" }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Products;
