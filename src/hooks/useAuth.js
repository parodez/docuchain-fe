import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post(`/api/auth/login`, data);
      return res;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      navigate("/home");
    },
  });
};

export const useRequestorLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/requestor/login", data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};

export const useVerifyRequestorOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/requestor/verify-otp", data);
      return res.data;
    },

    onSuccess: (res) => {
      navigate("/requestor/dashboard");
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/api/auth/me");
        return data;
      } catch (err) {
        if (err.status === 401) {
          return null;
        }
        throw err;
      }
    },
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => api.post("/api/auth/logout"),

    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.clear();

      navigate("/login");
    },
  });
};
