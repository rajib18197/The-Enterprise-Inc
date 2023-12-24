import { useMutation } from "@tanstack/react-query";
import { deleteApplication as deleteApplicationApi } from "../../services/apiApplications";

export function useDeleteApplication() {
  const {
    mutate: deleteApplication,
    isLoading: isDeleting,
    isError,
  } = useMutation({
    mutationFn: deleteApplicationApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application has been deleted successfully");
    },

    onError(err) {
      console.log(err);
      toast.error("Application could not be deleted. Try again!");
    },
  });

  return { deleteApplication, isDeleting, isError };
}
