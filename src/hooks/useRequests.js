import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";

const requestKey = "requests";

export const useRequests = () => {
  return useQuery({
    queryKey: [requestKey],
    queryFn: async () => {
      const res = await api.get("/api/requests");
      return res.data;
    },
  });
};

export const useRequest = (id) => {
  return useQuery({
    queryKey: [requestKey, id],
    queryFn: async () => {
      const res = await api.get(`/api/requests${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/requests", data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [requestKey],
      });
    },
  });
};

export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await api.patch(`/api/requests/${id}/status`, {
        status: status,
      });

      return res.data;
    },
    onSuccess: (_, newValue) => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
    },
  });
};
