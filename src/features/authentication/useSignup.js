import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignup() {
  const {
    mutate: signUp,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: signUpApi,
  });

  return { signUp, isLoading, error };
}
