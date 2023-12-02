import { useMutation } from "@tanstack/react-query";
import { createApplication as createApplicationApi } from "../../services/apiApplications";

export function useCreateApplication() {
  const {
    mutate: createApplication,
    isLoading: isCreating,
    isError,
  } = useMutation({
    mutationFn: createApplicationApi,
  });

  return { createApplication, isCreating, isError };
}
