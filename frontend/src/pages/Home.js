import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <nav>
        <h2>🏪 eCommerce</h2>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <div className="content">
        <h1>Welcome to the eCommerce Platform 🚀</h1>
        <p>Start buying and selling your products now.</p>
      </div>
    </div>
  );
};

export default Home;
