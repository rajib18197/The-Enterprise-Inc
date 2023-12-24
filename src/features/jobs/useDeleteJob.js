import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJob as deleteJobApi } from "../../services/apiJobs";
import toast from "react-hot-toast";

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
      toast.success("Job successfully Deleted");
    },
    onError: (err) => {
      console.error(err);
      toast.error("Job could not be deleted");
    },
  });

  return { deleteJob, isDeleting, isError };
}
