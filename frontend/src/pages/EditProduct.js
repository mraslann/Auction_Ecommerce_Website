import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError("❌ Could not load product.");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      navigate("/products");
    } catch (err) {
      setError("❌ Failed to update product.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>✏️ Edit Product</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
          />
          <input
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />
          <input
            name="imageUrl"
            placeholder="Image URL"
            value={product.imageUrl}
            onChange={handleChange}
          />
          <button type="submit">💾 Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
