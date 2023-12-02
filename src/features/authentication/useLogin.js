import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess({ user }) {
      queryClient.setQueryData("user", user);
      navigate("/dashboard");
    },
    onError(err) {
      console.error(err);
    },
  });

  return { login, isLoading, error };
}
