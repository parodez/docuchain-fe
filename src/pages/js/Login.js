import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import api from "../../api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = res.data.token;

      localStorage.setItem("token", token);

      navigate("/home");
    } catch (error) {
      alert("Error logging in: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: "url(/gulodBG.jpg)" }}
    >
      <div className="login-container">
        {/* Logo sits above the card (as in the mockup) */}
        <img
          className="login-logo"
          src="/gulodLogo.png"
          alt="Gulod National Highschool logo"
        />

        <div className="login-card">
          <h1 className="login-title">Sign in</h1>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <a href="/" className="forgot-password">
              Forgot Password?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
