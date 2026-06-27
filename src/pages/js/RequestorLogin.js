import React, { useRef, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUserRole } from "../../auth";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";

function RequestorLogin() {
  const role = getUserRole();

  if (["Requestor"].includes(role)) {
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

      {/* <EmailForm email={email} setEmail={setEmail} /> */}
      <EmailForm />

      {/* BOTTOMBAR */}
      <footer className="bottombar">
        © 2025 DocuChain | All Rights Reserved
      </footer>
    </div>
  );
}

export default RequestorLogin;

const OTPInput = ({ email }) => {
  const navigate = useNavigate();
  const length = 6;
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);

  const verifyOtp = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/auth/verify-otp", data);
      return res.data;
    },
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp.mutateAsync({ email, otp: otp.join("") });

      localStorage.setItem("token", res.token);
      navigate("/requestor/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-center">Enter OTP</h2>
      <div className="flex justify-center gap-3">
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
      <button
        type="submit"
        // onClick={handleSubmit}
        // style={styles.button}
        className={`h-[36px] rounded bg-[#d7d7d7] bold cursor-pointer hover:bg-[#a4ccb4] w-full`}
      >
        {verifyOtp.isPending ? "Verifying OTP..." : "Verify OTP"}
      </button>
      {verifyOtp.isError && (
        <div className="text-center text-red-500 text-xs font-semibold tracking-wide">
          <p>{verifyOtp.error.response?.data.message}</p>
        </div>
      )}
    </form>
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

const EmailForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const getOtp = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/auth/requestor-otp", data);
      return res.data;
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await getOtp.mutateAsync({ email: formData.email });
      console.log(res);
    } catch (error) {
      console.error(error);
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

        {!getOtp.isSuccess && (
          <div className="login-card">
            <h1 className="login-title">Requestor Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={getOtp.isPending}
                className={`h-[36px] rounded bg-[#d7d7d7] bold cursor-pointer hover:bg-[#a4ccb4]`}
              >
                {getOtp.isPending ? "Sending OTP..." : "Get OTP"}
              </button>
            </form>
            {getOtp.isError && (
              <div className="text-center py-2 text-red-500 text-xs font-semibold tracking-wide">
                {/* <p>Error sending OTP</p> */}
                <p>
                  {getOtp.error.response?.data.message ?? "Error sending OTP"}
                </p>
              </div>
            )}
          </div>
        )}
        {getOtp.isSuccess && (
          <div className="login-card">
            <OTPInput email={formData.email} />
          </div>
        )}
      </div>
    </div>
  );
};
