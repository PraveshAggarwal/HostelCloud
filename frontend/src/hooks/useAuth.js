import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { login, register, getAuthUser, logout } from "../lib/api";

// Get logged-in user
export const useAuthUser = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    staleTime: 1000 * 60 * 5,
  });
};

// Login hook
export const useLogin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { login: mutate, isPending, error };
};

// Register hook
export const useRegister = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { register: mutate, isPending, error };
};

// Logout hook
export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["authUser"] });
    },
  });

  return { logout: mutate, isPending };
};
