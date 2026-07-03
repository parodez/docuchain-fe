import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const res = await api.post(`/api/auth/login`, data);
      return res;
    },
    onSuccess: ({ data }) => {
      const token = data.token;

      localStorage.setItem("token", token);

      navigate("/home");
    },
  });
};

export const useRequestorLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/auth/requestor-otp", data);
      return res.data;
    },
  });
};

export const useVerifyRequestorOtp = () => {
  const navigate = useNavigate();

  return useMutation({
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
};
