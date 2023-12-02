import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob as deleteJobApi } from "../../services/apiJobs";

export function useDeleteJob() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteJob,
    isPending: isDeleting,
    isError,
  } = useMutation({
    mutationFn: deleteJobApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { deleteJob, isDeleting, isError };
}
