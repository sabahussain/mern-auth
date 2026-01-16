import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/profile",
          { headers: { Authorization: token } }
        );
        setUser(data);
      } catch {
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    getProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    user && (
      <div className="profile-card">
        <h2>Profile</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    )
  );
}

export default Profile;
