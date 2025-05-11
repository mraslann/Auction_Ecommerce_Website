import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login to view your profile.");
      return;
    }

    fetch("http://localhost:8080/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => {
        setMessage("❌ Failed to load profile. Please login again.");
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  if (message) return <p>{message}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="container">
      <h2>👤 User Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Add more fields like user.name if available */}
      <button onClick={() => navigate("/products")}>← Back to Products</button>
    </div>
  );
};

export default Profile;
