import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
      toast.success("Login successful!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
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
      toast.success("Registration successful!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
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
      localStorage.removeItem("token");
      queryClient.setQueryData(["authUser"], null);
      toast.success("Logged out successfully!");
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
  });

  return { logout: mutate, isPending };
};
