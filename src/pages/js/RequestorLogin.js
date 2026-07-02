import React, { useRef, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getUserRole } from "../../auth";
import { useMutation } from "@tanstack/react-query";
import api from "../../api";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

function RequestorLogin() {
  const role = getUserRole();

  if (["Requestor"].includes(role)) {
    return <Navigate to="/requestor/dashboard" replace />;
  }

  return (
    <div className="flex flex-col h-dvh">
      {/* TOPBAR */}
      {/* <header className="topbar">
        <div className="topbar-left">
          <img src="/gulodLogo.png" alt="Logo" className="logo" />
          <span className="school-name">Gulod National Highschool</span>
        </div>
      </header> */}

      {/* <EmailForm email={email} setEmail={setEmail} /> */}

      <div className="flex flex-1 h-1 bg-red-200">
        <EmailForm />
      </div>

      {/* BOTTOMBAR */}
      {/* <footer className="bottombar">
        © 2025 DocuChain | All Rights Reserved
      </footer> */}
    </div>
  );
}

export default RequestorLogin;

const OTPInput = ({ email }) => {
  const navigate = useNavigate();
  const length = 6;
  const inputsRef = useRef([]);

  const { handleSubmit, control, setValue, watch } = useForm({
    defaultValues: {
      otp: Array(length).fill(""),
    },
  });

  const otp = watch("otp");

  const verifyOtp = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/auth/verify-otp", data);
      return res.data;
    },

    onSuccess: (res) => {
      const token = res.token;
      localStorage.setItem("token", token);
      navigate("/requestor/dashboard");
    },
  });

  const isOtpComplete = otp?.every((d) => d !== "");

  const handleChange = (value, index, onChange) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setValue("otp", newOtp, { shouldValidate: true });
    onChange(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const onSubmit = (data) => {
    const otpString = data.otp.join("");

    if (!isOtpComplete || otpString.length !== length) return;

    verifyOtp.mutate({
      email,
      otp: otpString,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h2 className="text-center">Enter OTP</h2>

      <Controller
        control={control}
        name="otp"
        render={({ field }) => (
          <div className="flex justify-center gap-3">
            {field.value.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index, field.onChange)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-10 h-10 text-center border rounded"
              />
            ))}
          </div>
        )}
      />

      <button
        type="submit"
        disabled={!isOtpComplete || verifyOtp.isPending}
        className={`h-[36px] rounded w-full cursor-pointer
          ${
            isOtpComplete
              ? "bg-[#a4ccb4] hover:bg-[#8fbba0]"
              : "bg-[#d7d7d7] opacity-60 cursor-not-allowed"
          }
        `}
      >
        {verifyOtp.isPending ? "Verifying OTP..." : "Verify OTP"}
      </button>

      {verifyOtp.isError && (
        <div className="text-center text-red-500 text-xs font-semibold tracking-wide">
          <p>{verifyOtp.error.message}</p>
        </div>
      )}
    </form>
  );
};

const EmailForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({ email: z.string().trim().email("Invalid email address") }),
    ),
    defaultValues: {
      email: "",
    },
  });

  const getOtp = useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/auth/requestor-otp", data);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    getOtp.mutate(data);
  };

  return (
    <div
      className="login-page w-full"
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
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
              <div className="form-group">
                <input placeholder="Email " {...register("email")} />
                <p className="py-2 px-3 text-red-500 text-xs font-semibold tracking-wide">
                  {errors.email?.message}
                </p>
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
                <p>
                  {getOtp.error.response?.data.message ?? "Error sending OTP"}
                </p>
              </div>
            )}
          </div>
        )}
        {getOtp.isSuccess && (
          <div className="login-card">
            <OTPInput email={getOtp.variables.email} />
          </div>
        )}
      </div>
    </div>
  );
};
