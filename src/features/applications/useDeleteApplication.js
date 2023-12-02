import { useMutation } from "@tanstack/react-query";
import { deleteApplication as deleteApplicationApi } from "../../services/apiApplications";

export function useDeleteApplication() {
  const {
    mutate: deleteApplication,
    isLoading: isDeleting,
    isError,
  } = useMutation({
    mutationFn: deleteApplicationApi,
  });

  return { deleteApplication, isDeleting, isError };
}
