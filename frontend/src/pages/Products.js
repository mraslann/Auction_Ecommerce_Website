import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        // Fetch current user
        const userRes = await fetch("http://localhost:8080/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (userRes.ok) {
          const userData = await userRes.json();
          setCurrentUser(userData);
        } else {
          throw new Error("Unauthorized");
        }

        // Fetch products
        const productRes = await fetch("http://localhost:8080/api/products", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!productRes.ok) {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const productData = await productRes.json();
        setProducts(productData);
      } catch (error) {
        setMessage("❌ Could not load products. Please login again.");
      }
    };

    fetchData();
  }, [navigate]);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already in cart
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("✅ Added to cart!");
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== productId));
      } else {
        alert("❌ Failed to delete product.");
      }
    } catch (err) {
      alert("❌ An error occurred.");
    }
  };

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

              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleAddToCart(product)}>🛒 Add to Cart</button>
              </div>
              {currentUser && currentUser.id === product.ownerId && (
                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => navigate(`/products/edit/${product.id}`)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(product.id)} style={{ marginLeft: "10px" }}>🗑️ Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Products;
