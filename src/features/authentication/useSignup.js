import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const {
    mutate: signUp,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: signUpApi,

    onSuccess: () => {
      toast.success("Account has been successfully created");
    },

    onError: () => {
      toast.error("Account could not be created");
    },
  });

  return { signUp, isLoading, error };
}
