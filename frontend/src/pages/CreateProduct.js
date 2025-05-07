import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      setMessage("✅ Product created successfully!");
      setTimeout(() => navigate("/products"), 1500);
    } else {
      const error = await response.text();
      setMessage("❌ Failed to create product: " + error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="text" name="description" placeholder="Description" onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" step="0.01" onChange={handleChange} required />
          <input type="text" name="imageUrl" placeholder="Image URL" onChange={handleChange} required />
          <button type="submit">Create</button>
        </form>

        {/* 🔙 Back to Products Button */}
        <button onClick={() => navigate("/products")} style={{ marginTop: "10px" }}>
          🔙 Back to Products
        </button>

        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default CreateProduct;
