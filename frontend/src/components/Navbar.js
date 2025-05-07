import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <button onClick={() => navigate("/products")} style={styles.button}>🛒 Products</button>
      <button onClick={() => navigate("/products/create")} style={styles.button}>➕ Create Product</button>
      <button onClick={handleLogout} style={styles.button}>🚪 Logout</button>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ccc",
    justifyContent: "center",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default Navbar;
