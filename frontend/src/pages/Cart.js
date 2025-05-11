import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleIncrease = (productId) => {
    const newCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(newCart);
  };

  const handleDecrease = (productId) => {
    const newCart = cart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(newCart);
  };

  const handleRemove = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    updateCart(newCart);
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>🛒 Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <div>
                  <button onClick={() => handleIncrease(item.id)}>➕</button>
                  <button onClick={() => handleDecrease(item.id)}>➖</button>
                  <button onClick={() => handleRemove(item.id)}>❌ Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cart.length > 0 && (
          <div>
            <h3>Total: ${getTotal()}</h3>
            <button onClick={() => alert("🧾 Checkout coming soon!")}>
              ✅ Checkout
            </button>
          </div>
        )}

        <button onClick={() => navigate("/products")} style={{ marginTop: "20px" }}>
          🔙 Back to Products
        </button>
      </div>
    </>
  );
};

export default Cart;
