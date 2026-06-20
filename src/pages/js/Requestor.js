import React, { useRef, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function Requestor() {
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/requestor/dashboard" replace />;
  }

  return (
    <div>
      {/* TOPBAR */}
      <header className="topbar">
        <div className="topbar-left">
          <img src="/gulodLogo.png" alt="Logo" className="logo" />
          <span className="school-name">Gulod National Highschool</span>
        </div>
      </header>

      <EmailForm email={email} setEmail={setEmail} />

      {/* BOTTOMBAR */}
      <footer className="bottombar">
        © 2025 DocuChain | All Rights Reserved
      </footer>
    </div>
  );
}

export default Requestor;

const OTPInput = ({ email }) => {
  const navigate = useNavigate();
  const length = 6;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    // alert("Entered OTP: " + otp.join(""));
    // if (otp.join("") === "123123") navigate("/requestor/requests");

    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otp.join("") }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to verify OTP");
      }

      localStorage.setItem("token", data.token);

      navigate("/requestor/dashboard");
    } catch (error) {
      alert("Error verifying OTP: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Enter OTP</h2>
      <div style={styles.inputs}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            style={styles.input}
          />
        ))}
      </div>
      <button onClick={handleSubmit} style={styles.button}>
        Verify
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial",
  },
  inputs: {
    display: "flex",
    gap: "10px",
    margin: "20px 0",
  },
  input: {
    width: "40px",
    height: "50px",
    textAlign: "center",
    fontSize: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

const EmailForm = ({ email, setEmail }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail(formData.email);
    console.log("Request submitted for:", formData.email);
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
          {!email && <h1 className="login-title">Request Document</h1>}
          {email ? (
            <OTPInput email={email} />
          ) : (
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

              <button type="submit" className="login-button">
                Send OTP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
