import { useNavigate } from "react-router-dom";
import "../index.css"; // Optional if you separate styles into Navbar.css later

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/products")}>
        <h2 className="navbar-logo">🛍️ ShopEasy</h2>
      </div>
      <div className="navbar-right">
        <button onClick={() => navigate("/products")}>Products</button>
        <button onClick={() => navigate("/products/create")}>Create</button>
        <button onClick={() => navigate("/cart")}>🛒 Cart</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
